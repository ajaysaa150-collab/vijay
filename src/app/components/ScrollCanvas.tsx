"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface ScrollCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  startFrame?: number;
  endFrame?: number;
  onFrameChange?: (frame: number) => void;
}

export default function ScrollCanvas({
  containerRef,
  startFrame = 1,
  endFrame = 300,
  onFrameChange,
}: ScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const targetFrameRef = useRef<number>(startFrame);
  const currentFrameRef = useRef<number>(startFrame);
  const lastDrawnFrameRef = useRef<number>(-1);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState<number>(startFrame);
  const [loadedCount, setLoadedCount] = useState<number>(0);

  const formatFrameName = (index: number) => {
    return `/frames/frame_${String(index).padStart(6, "0")}.jpg`;
  };

  // Draw frame with absolute canvas coordinate mapping (bulletproof cover scaling)
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Find requested frame or nearest loaded frame
    let img = imageCache.current.get(frameIndex);
    if (!img || !img.complete || img.naturalWidth === 0) {
      let closestFrame = -1;
      let minDiff = Infinity;
      for (const [key, cachedImg] of imageCache.current.entries()) {
        if (cachedImg.complete && cachedImg.naturalWidth > 0) {
          const diff = Math.abs(key - frameIndex);
          if (diff < minDiff) {
            minDiff = diff;
            closestFrame = key;
          }
        }
      }
      if (closestFrame !== -1) {
        img = imageCache.current.get(closestFrame);
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const displayW = canvas.clientWidth || window.innerWidth;
    const displayH = canvas.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const targetW = Math.floor(displayW * dpr);
    const targetH = Math.floor(displayH * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    // Reset transform completely
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Calculate aspect ratio cover fit in canvas pixel dimensions
    const hRatio = targetW / img.naturalWidth;
    const vRatio = targetH / img.naturalHeight;
    const ratio = Math.max(hRatio, vRatio);

    const drawW = img.naturalWidth * ratio;
    const drawH = img.naturalHeight * ratio;
    const shiftX = (targetW - drawW) / 2;
    const shiftY = (targetH - drawH) / 2;

    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, shiftX, shiftY, drawW, drawH);
  }, []);

  // Preloading all 300 frames progressively
  useEffect(() => {
    let isCancelled = false;
    let count = 0;

    const onImageLoaded = (idx: number, img: HTMLImageElement) => {
      if (isCancelled) return;
      imageCache.current.set(idx, img);
      count++;
      setLoadedCount(count);
      // If this is initial frame or target frame, draw immediately
      if (idx === targetFrameRef.current || lastDrawnFrameRef.current === -1) {
        drawFrame(idx);
        lastDrawnFrameRef.current = idx;
      }
    };

    // 1. Immediately load initial frame
    const firstImg = new Image();
    firstImg.onload = () => onImageLoaded(startFrame, firstImg);
    firstImg.src = formatFrameName(startFrame);
    if (firstImg.complete && firstImg.naturalWidth > 0) {
      onImageLoaded(startFrame, firstImg);
    }

    // 2. Load all frames in parallel chunks
    const indices: number[] = [];
    for (let i = startFrame; i <= endFrame; i++) {
      if (i !== startFrame) indices.push(i);
    }

    // Chunked concurrent loader
    const concurrency = 8;
    let queueIdx = 0;

    const loadNext = () => {
      if (isCancelled || queueIdx >= indices.length) return;
      const idx = indices[queueIdx++];
      const img = new Image();
      img.onload = () => {
        onImageLoaded(idx, img);
        loadNext();
      };
      img.onerror = () => {
        loadNext();
      };
      img.src = formatFrameName(idx);
    };

    for (let c = 0; c < concurrency; c++) {
      loadNext();
    }

    return () => {
      isCancelled = true;
    };
  }, [startFrame, endFrame, drawFrame]);

  // Scroll listener & smooth lerp animation loop
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const scrubDistance = Math.max(window.innerHeight * 1.2, 500);
      const progress = Math.min(1, Math.max(0, scrollY / scrubDistance));
      const target = Math.round(startFrame + progress * (endFrame - startFrame));
      targetFrameRef.current = target;
    };

    const handleResize = () => {
      drawFrame(Math.round(currentFrameRef.current));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    handleScroll();

    // Persistent animation loop for buttery smooth lerp interpolation
    const renderLoop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const delta = target - current;

      if (Math.abs(delta) > 0.04) {
        currentFrameRef.current += delta * 0.15;
      } else {
        currentFrameRef.current = target;
      }

      const frameToDraw = Math.round(currentFrameRef.current);
      if (frameToDraw !== lastDrawnFrameRef.current) {
        drawFrame(frameToDraw);
        lastDrawnFrameRef.current = frameToDraw;
        setCurrentFrameDisplay(frameToDraw);
        onFrameChange?.(frameToDraw);
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [containerRef, startFrame, endFrame, drawFrame, onFrameChange]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0">
      {/* HTML5 Canvas - Full visibility, edge to edge */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
      />

      {/* Live Frame Indicator Badge */}
      <div className="absolute bottom-6 right-6 z-30 pointer-events-auto flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-zinc-200 shadow-xl">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Frame {String(currentFrameDisplay).padStart(3, "0")} / {endFrame}</span>
        <span className="text-zinc-500">•</span>
        <span className="text-[10px] text-zinc-400">{loadedCount}/300 loaded</span>
      </div>
    </div>
  );
}
