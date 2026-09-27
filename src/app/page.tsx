"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import ScrollCanvas from "./components/ScrollCanvas";

export default function Home() {
  const heroContainerRef = useRef<HTMLDivElement | null>(null);
  const [activePrompt, setActivePrompt] = useState(
    "Cyberpunk neon jaguar stalking through bioluminescent Amazon jungle, 8k octane render"
  );
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // 3D Model Creator State
  const [meshDensity, setMeshDensity] = useState(65);
  const [activeShading, setActiveShading] = useState<"pbr" | "wire" | "clay">("pbr");
  const [isRotating, setIsRotating] = useState(true);
  const [selectedFormat, setSelectedFormat] = useState<"GLTF" | "USDZ" | "OBJ" | "FBX">("GLTF");

  const samplePrompts = [
    "Cyber Amazon Jaguar 8K",
    "Bioluminescent Rainforest Shrine",
    "Solarpunk Canopy Biosphere",
  ];

  const handleCopyPrompt = () => {
    navigator.clipboard?.writeText(activePrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // Marquee Logos
  const topLogos = [
    "MIDJOURNEY", "SYNTHESIS", "RUNWAY AI", "LATENT LABS", "APEX NEURAL", "CHROMA", "DREAMFRAME", "ELEVEN LABS",
    "MIDJOURNEY", "SYNTHESIS", "RUNWAY AI", "LATENT LABS", "APEX NEURAL", "CHROMA", "DREAMFRAME", "ELEVEN LABS",
  ];

  const bottomLogos = [
    "NVIDIA INCEPTION", "STABILITY AI", "BLACK FOREST", "OPENAI", "ANTHROPIC", "OCTANE 8K", "FAL.AI", "HUGGING FACE",
    "NVIDIA INCEPTION", "STABILITY AI", "BLACK FOREST", "OPENAI", "ANTHROPIC", "OCTANE 8K", "FAL.AI", "HUGGING FACE",
  ];

  return (
    <div className="bg-black text-zinc-100 min-h-screen selection:bg-purple-600 selection:text-white overflow-x-hidden">
      
      {/* =========================================================================
          HERO SECTION WITH SCROLL-LINKED CANVAS (Seamless, zero empty space)
          ========================================================================= */}
      <section
        ref={heroContainerRef}
        className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-2"
      >
          
          {/* Scroll-Linked Image Sequence Canvas (Behind the hero, frames 1 to 300) */}
          <ScrollCanvas
            containerRef={heroContainerRef}
            startFrame={1}
            endFrame={300}
          />

          {/* Main Hero Card Container - Transparent Glass to showcase river camera frames */}
          <div className="relative w-full max-w-[1240px] mx-auto bg-black/25 backdrop-blur-md border border-white/15 rounded-[28px] sm:rounded-[36px] p-4 sm:p-7 lg:p-8 z-10 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            
            {/* Navigation Bar */}
            <header className="flex items-center justify-between pb-4 sm:pb-6 border-b border-zinc-800/60">
              <nav className="hidden md:flex items-center gap-8 text-[13px] font-normal tracking-wide text-zinc-400">
                <a href="#models" className="hover:text-zinc-100 transition-colors">Models</a>
                <a href="#showcase" className="hover:text-zinc-100 transition-colors">Showcase</a>
                <a href="#styles" className="hover:text-zinc-100 transition-colors">Styles</a>
                <a href="#pricing" className="hover:text-zinc-100 transition-colors">Pricing</a>
                <a href="#docs" className="hover:text-zinc-100 transition-colors">Docs</a>
              </nav>

              <div className="flex md:hidden items-center gap-2 text-zinc-400 text-xs font-medium uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                AI Generator
              </div>

              {/* Center Brand Name / Logo */}
              <div className="flex items-center gap-2.5 cursor-pointer group">
                <div className="w-6 h-6 rounded-md bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 group-hover:border-purple-400 transition-colors">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-zinc-100 font-sans">
                  Amazon Jungle
                </span>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-3 sm:gap-4">
                <button 
                  aria-label="Search models"
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-800 hover:border-purple-500/50 transition-colors cursor-pointer">
                  <Image 
                    src="/images/creator-avatar.jpg" 
                    alt="Creator Profile" 
                    fill 
                    className="object-cover"
                    sizes="32px"
                  />
                </div>

                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-medium text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>120 Credits</span>
                </div>
              </div>
            </header>

            {/* Upper Editorial Typography Layer - Bolder with clean white -> lavender gradient & soft glow */}
            <div className="pt-6 sm:pt-7 pb-4 sm:pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-baseline">
                
                {/* Left Headline: Tour Now AMAZON */}
                <div className="flex flex-col relative z-10">
                  <span className="font-editorial text-xl sm:text-2xl text-purple-200/80 tracking-tight font-normal pl-0.5 mb-1 select-none drop-shadow-md">
                    Tour Now
                  </span>
                  <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-bold tracking-tight uppercase leading-[0.9] select-none bg-gradient-to-r from-white via-zinc-100 to-purple-200 bg-clip-text text-transparent drop-shadow-[0_4px_28px_rgba(192,132,252,0.3)]">
                    Amazon
                  </h1>
                </div>

                {/* Right Headline: Into The JUNGLE ✦ */}
                <div className="flex flex-col md:items-end relative z-10">
                  <span className="font-editorial text-xl sm:text-2xl text-zinc-400 tracking-tight font-normal md:pr-2 mb-1 select-none">
                    Into The
                  </span>
                  <div className="flex items-center gap-3">
                    <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-bold tracking-tight uppercase leading-[0.9] text-purple-400 select-none drop-shadow-[0_4px_24px_rgba(168,85,247,0.4)]">
                      Jungle
                    </h2>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400/90 flex items-center justify-center animate-spin-slow">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_0_15px_rgba(192,132,252,0.6)]">
                        <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
                      </svg>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Lower Main Content Card: Transparent Glass with Subtle Violet Accents */}
            <div className="rounded-[20px] sm:rounded-[26px] bg-black/35 backdrop-blur-md border border-purple-500/30 p-5 sm:p-7 lg:p-8 transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                
                {/* Left Content Column */}
                <div className="lg:col-span-7 flex flex-col items-start">
                  
                  {/* Availability Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-[11px] font-medium tracking-wider uppercase text-purple-300 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <svg className="w-3 h-3 text-purple-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
                    </svg>
                    <span>AI IMAGE GENERATOR</span>
                  </div>

                  {/* Short Headline */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-zinc-100 tracking-tight leading-[1.2] mb-2.5">
                    Where Vision Meets Pure Reality
                  </h3>

                  {/* Supporting Description */}
                  <p className="text-zinc-400 text-xs sm:text-sm font-normal leading-relaxed max-w-lg mb-5">
                    Turn thoughts into ultra-detailed 8K renders, cinematic concept art, and high-fidelity visuals in seconds.
                  </p>

                  {/* Orange/Purple CTA Button */}
                  <button 
                    onClick={() => setActivePrompt("Ultra-realistic bioluminescent rainforest panther, 8k")}
                    className="group inline-flex items-center gap-3 pl-5 pr-2 py-1.5 rounded-full bg-gradient-to-r from-orange-500 via-purple-600 to-violet-600 text-white font-medium text-xs sm:text-sm shadow-[0_4px_20px_rgba(249,115,22,0.3)] hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <span>Start Creating</span>
                    <span className="w-7 h-7 rounded-full bg-black/40 border border-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>

                  {/* Social Proof Pill */}
                  <div className="mt-6 inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-400">
                    <div className="flex -space-x-1.5">
                      <div className="w-5 h-5 rounded-full border border-zinc-800 overflow-hidden relative">
                        <Image src="/images/creator-avatar.jpg" alt="Creator" fill className="object-cover" sizes="20px" />
                      </div>
                      <div className="w-5 h-5 rounded-full border border-zinc-800 bg-purple-900/80 flex items-center justify-center text-[8px] font-medium text-purple-200">
                        JD
                      </div>
                      <div className="w-5 h-5 rounded-full border border-zinc-800 bg-zinc-800 flex items-center justify-center text-[8px] font-medium text-zinc-300">
                        AK
                      </div>
                    </div>
                    <span className="font-normal text-zinc-300">Loved by 40,000+ creators</span>
                    <span className="text-purple-400 text-[10px]">✦</span>
                  </div>

                </div>

                {/* Right Column: Features & Featured Creation Card */}
                <div className="lg:col-span-5 flex flex-col lg:items-end gap-4">
                  
                  {/* Feature Badges */}
                  <div className="grid grid-cols-3 gap-2 w-full max-w-sm">
                    <div className="flex flex-col items-center text-center p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                      <div className="w-5 h-5 rounded-md bg-purple-500/10 flex items-center justify-center mb-1 text-purple-300">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-medium text-zinc-200 leading-tight">Instant Gen</span>
                      <span className="text-[8px] text-zinc-500">0.8s Neural</span>
                    </div>

                    <div className="flex flex-col items-center text-center p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                      <div className="w-5 h-5 rounded-md bg-purple-500/10 flex items-center justify-center mb-1 text-purple-300">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-medium text-zinc-200 leading-tight">8K Fidelity</span>
                      <span className="text-[8px] text-zinc-500">Ultra Crisp</span>
                    </div>

                    <div className="flex flex-col items-center text-center p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                      <div className="w-5 h-5 rounded-md bg-purple-500/10 flex items-center justify-center mb-1 text-purple-300">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-medium text-zinc-200 leading-tight">Full Rights</span>
                      <span className="text-[8px] text-zinc-500">Commercial</span>
                    </div>
                  </div>

                  {/* Featured Creation Card */}
                  <div className="w-full max-w-[250px] self-center lg:self-end">
                    <div className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest mb-1.5 text-center lg:text-left">
                      Featured Creation
                    </div>
                    
                    <div className="bg-[#0f0d1a] border border-zinc-800 rounded-xl p-2 transition-all">
                      <div className="relative w-full h-28 rounded-lg overflow-hidden bg-black">
                        <Image
                          src="/images/featured-art.jpg"
                          alt="Featured Neon Cyber Jaguar Art"
                          fill
                          className="object-cover"
                          sizes="230px"
                        />
                        <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[8px] font-medium text-purple-300 border border-purple-500/30">
                          8K RENDER
                        </div>
                      </div>

                      <div className="pt-2 pb-0.5 px-1 flex items-center justify-between">
                        <div>
                          <h4 className="text-[11px] font-semibold text-zinc-100 leading-snug">
                            Neon Cyber Jaguar
                          </h4>
                          <p className="text-[9px] text-zinc-400">
                            Amazon Rainforest Prompt
                          </p>
                        </div>

                        <button
                          onClick={handleCopyPrompt}
                          aria-label="Copy Prompt"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/30 text-[10px] font-medium transition-colors cursor-pointer"
                        >
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span>{copiedPrompt ? "Copied" : "Remix"}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Prompt Quick Try Footer */}
            <div className="mt-4 pt-3 border-t border-zinc-800/60 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                <span className="text-zinc-500 font-normal whitespace-nowrap text-[11px]">Try Prompts:</span>
                {samplePrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => setActivePrompt(p)}
                    className={`text-[10px] px-2.5 py-0.5 rounded-full border transition-all whitespace-nowrap cursor-pointer ${
                      activePrompt.includes(p)
                        ? "bg-purple-500/15 border-purple-500/40 text-purple-300"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    ✦ {p}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-zinc-500 w-full md:w-auto justify-end text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-zinc-400 font-normal">Model v4.8 Active</span>
                <span className="text-zinc-600">•</span>
                <span>Scroll to scrub timeline</span>
              </div>
            </div>

          </div>

          {/* DREAMFRAME Main Visual at the Bottom - Flush with section bottom */}
          <div className="w-[90vw] mx-auto text-center pt-2 pb-2 select-none pointer-events-none z-10">
            <span className="block text-[8.5vw] font-black tracking-[0.24em] uppercase leading-none bg-gradient-to-b from-white via-[#f5edff] to-[#e4ceff] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(244,114,182,0.35)] drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]">
              DREAMFRAME
            </span>
          </div>

      </section>


      {/* =========================================================================
          SECTION 1: INFINITE LOGO CAROUSELS (Two seamless marquees)
          ========================================================================= */}
      <section className="relative pt-6 pb-16 bg-gradient-to-b from-black via-[#0a0715] to-black border-y border-zinc-900 overflow-hidden">
        
        {/* Soft background cosmic glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-semibold tracking-widest uppercase text-purple-300 mb-3">
            ✦ Powering Modern Neural Pipelines
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-zinc-300 tracking-tight">
            Trusted by top visual studios, creative directors, and indie artists
          </h3>
        </div>

        {/* Carousel Container with Edge Masking */}
        <div className="relative w-full overflow-hidden mask-edge-fade space-y-4">
          
          {/* Row 1: Right to Left */}
          <div className="animate-marquee-left flex items-center gap-6 sm:gap-10">
            {topLogos.map((logo, idx) => (
              <div
                key={`top-${idx}`}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-md hover:border-purple-500/40 hover:bg-zinc-900/60 transition-colors cursor-pointer group"
              >
                <span className="w-2 h-2 rounded-full bg-purple-400 group-hover:scale-125 transition-transform" />
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-zinc-300 group-hover:text-white transition-colors whitespace-nowrap">
                  {logo}
                </span>
              </div>
            ))}
          </div>

          {/* Row 2: Left to Right */}
          <div className="animate-marquee-right flex items-center gap-6 sm:gap-10">
            {bottomLogos.map((logo, idx) => (
              <div
                key={`bottom-${idx}`}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-md hover:border-violet-500/40 hover:bg-zinc-900/60 transition-colors cursor-pointer group"
              >
                <span className="w-2 h-2 rounded-full bg-pink-400 group-hover:scale-125 transition-transform" />
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-zinc-400 group-hover:text-white transition-colors whitespace-nowrap">
                  {logo}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 2: BENTO GRID (Dark cosmic background, glassy gradient, purple/pink glow)
          ========================================================================= */}
      <section className="relative py-28 px-4 sm:px-8 lg:px-12 bg-black overflow-hidden">
        
        {/* Soft cosmic glow ambient orbs */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-pink-600/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-[1240px] mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-[11px] font-semibold tracking-widest uppercase text-purple-300 mb-4">
              <span>✦</span> ARCHITECTURE & CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-2xl leading-[1.1]">
              Engineered for Hyper-Realistic Neural Artistry
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-4 font-normal leading-relaxed">
              Unifying latent diffusion, real-time procedural volumetrics, and 8K cinematic rendering into a seamless platform.
            </p>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
            
            {/* Bento Card 1: Dominant Asymmetric Hero Feature (Span 8) */}
            <div className="md:col-span-8 rounded-[28px] bg-gradient-to-br from-[#130f24] via-[#0d0a17] to-zinc-950 border border-purple-500/25 p-7 sm:p-9 relative overflow-hidden group hover:border-purple-400/40 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-500/15 blur-3xl rounded-full pointer-events-none" />
              
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-purple-300 px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30">
                      Primary Engine
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">0.72s Latency</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                    Dynamic Latent Synthesis
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm max-w-md leading-relaxed mb-6">
                    Our custom Amazon Jungle tensor model generates photorealistic 8K visuals with volumetric mist, subsurface scattering, and cinematic camera physics.
                  </p>
                </div>

                {/* Interactive Artwork Preview Canvas */}
                <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-purple-400/20 shadow-2xl">
                  <Image 
                    src="/images/featured-art.jpg" 
                    alt="Neural Canvas Preview" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="text-xs font-mono text-zinc-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                      Seed: #849204 • Steps: 40 • Guidance: 7.5
                    </div>
                    <span className="text-xs font-semibold text-purple-300 bg-purple-950/80 px-3 py-1.5 rounded-lg border border-purple-500/40">
                      8K Octane
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Real-Time Performance Metric (Span 4) */}
            <div className="md:col-span-4 rounded-[28px] bg-gradient-to-br from-[#15102a] to-zinc-950 border border-purple-500/20 p-7 flex flex-col justify-between hover:border-purple-400/40 transition-all shadow-lg">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-pink-300 px-2.5 py-1 rounded-full bg-pink-500/15 border border-pink-500/30">
                  Performance
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight mt-4 mb-1">
                  Sub-Second Render
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Real-time visual inference running on custom high-bandwidth tensor clusters.
                </p>
              </div>

              <div className="my-8 text-center">
                <span className="block text-6xl sm:text-7xl font-black tracking-tighter text-transparent bg-gradient-to-b from-white via-purple-200 to-purple-400 bg-clip-text">
                  0.8s
                </span>
                <span className="text-xs text-zinc-400 font-medium">Average 8K generation time</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
                  <span>GPU Tensor Utilization</span>
                  <span className="text-emerald-400">98.4%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="w-[98%] h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                </div>
              </div>
            </div>

            {/* Bento Card 3: Style Fusion Matrix (Span 4) */}
            <div className="md:col-span-4 rounded-[28px] bg-[#0c0a15] border border-zinc-800/80 p-7 hover:border-purple-500/30 transition-all">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-300 px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30">
                Multi-Modal
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight mt-4 mb-2">
                Style Fusion Matrix
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                Blend cinematic cybernetics with biological rainforest textures without loss of photorealistic detail.
              </p>
              <div className="space-y-2.5">
                {[
                  { name: "Bioluminescent Flora", weight: "96%" },
                  { name: "Cyber Techwear", weight: "88%" },
                  { name: "Volumetric Mist", weight: "92%" },
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-xs text-zinc-300 font-medium">{s.name}</span>
                    <span className="text-xs text-purple-400 font-mono font-semibold">{s.weight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bento Card 4: Volumetric Camera Physics (Span 4) */}
            <div className="md:col-span-4 rounded-[28px] bg-[#0c0a15] border border-zinc-800/80 p-7 hover:border-purple-500/30 transition-all">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-300 px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30">
                Lighting Engine
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight mt-4 mb-2">
                Cinematic Volumetrics
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                Atmospheric perspective, dynamic depth of field, and optical bloom powered by physical raymarching.
              </p>
              <div className="relative h-28 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.3)_0%,_transparent_70%)] animate-pulse" />
                <span className="relative text-xs text-zinc-300 font-mono">Raymarched Caustic Shaders Active</span>
              </div>
            </div>

            {/* Bento Card 5: Full Commercial Rights (Span 4) */}
            <div className="md:col-span-4 rounded-[28px] bg-[#0c0a15] border border-zinc-800/80 p-7 hover:border-purple-500/30 transition-all">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                Enterprise
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight mt-4 mb-2">
                Commercial Ownership
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                100% intellectual property rights. Every render is cryptographically signed and free for commercial distribution.
              </p>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Full IP Freedom</div>
                  <div className="text-[10px] text-zinc-400">Zero royalty licensing</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 3: 3D MODEL CREATOR (Clean light-gray background, modern creative studio)
          ========================================================================= */}
      <section className="relative py-28 px-4 sm:px-8 lg:px-12 bg-[#f4f4f6] text-zinc-900 border-t border-zinc-300/80 transition-colors">
        
        <div className="max-w-[1240px] mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200 border border-zinc-300 text-[11px] font-semibold tracking-widest uppercase text-zinc-700 mb-3">
                <span className="w-2 h-2 rounded-full bg-purple-600" />
                NEURAL MESH WORKSPACE
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 leading-tight">
                3D Model Creator Studio
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base mt-2 max-w-lg font-normal">
                Synthesize production-ready 3D polygonal geometry and PBR materials directly from prompt descriptions or 2D image renders.
              </p>
            </div>

            {/* Export Format Selector */}
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-zinc-300/80 shadow-sm">
              {(["GLTF", "USDZ", "OBJ", "FBX"] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedFormat === fmt
                      ? "bg-zinc-900 text-white shadow-sm"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                  }`}
                >
                  .{fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Studio Workspace Card */}
          <div className="bg-white rounded-[28px] border border-zinc-300/80 shadow-xl overflow-hidden p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Dock: Generation Controls & Prompt */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                      Prompt Description
                    </label>
                    <textarea 
                      rows={3}
                      value={activePrompt}
                      onChange={(e) => setActivePrompt(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:border-purple-600 focus:outline-none transition-all resize-none text-zinc-800"
                    />
                  </div>

                  {/* Mesh Density Slider */}
                  <div>
                    <div className="flex justify-between text-xs font-medium text-zinc-700 mb-1.5">
                      <span>Mesh Polygon Density</span>
                      <span className="font-mono text-purple-700 font-semibold">{meshDensity * 2000} Polys</span>
                    </div>
                    <input 
                      type="range"
                      min={20}
                      max={100}
                      value={meshDensity}
                      onChange={(e) => setMeshDensity(Number(e.target.value))}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                  </div>

                  {/* Topology Preset Pills */}
                  <div>
                    <span className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                      Topology Mode
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {["Quad Remesh", "Triangulate", "Voxel Grid"].map((mode, i) => (
                        <button
                          key={mode}
                          className={`text-[11px] py-1.5 rounded-lg border font-medium text-center transition-colors cursor-pointer ${
                            i === 0
                              ? "bg-purple-50 border-purple-400 text-purple-700 font-semibold"
                              : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100"
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="pt-4 border-t border-zinc-200">
                  <button className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-black text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer">
                    <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span>Generate 3D Asset</span>
                  </button>
                </div>

              </div>

              {/* Center Dock: Interactive 3D Turntable Viewport */}
              <div className="lg:col-span-5 bg-zinc-900 rounded-2xl relative min-h-[360px] flex items-center justify-center overflow-hidden border border-zinc-800 shadow-inner">
                
                {/* 3D Coordinate Grid Plane simulation */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: "linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(90deg, #7c3aed 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />

                {/* Top Viewport Tool Strip */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-400 z-10">
                  <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[10px]">Viewport: Active</span>
                  </div>

                  {/* Shading mode selector */}
                  <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md p-1 rounded-lg border border-white/10">
                    {(["pbr", "wire", "clay"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setActiveShading(s)}
                        className={`px-2 py-0.5 text-[10px] font-semibold uppercase rounded transition-colors ${
                          activeShading === s
                            ? "bg-purple-600 text-white"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated 3D Model Render / Turntable */}
                <div className="relative w-56 h-56 flex items-center justify-center">
                  <div className={`relative w-48 h-48 transition-transform duration-700 ${isRotating ? "animate-spin-slow" : ""}`}>
                    {/* Glowing holographic cyber entity representation */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/30 via-violet-500/20 to-transparent blur-xl" />
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-2xl bg-zinc-950">
                      <Image
                        src="/images/featured-art.jpg"
                        alt="3D Mesh Subject"
                        fill
                        className={`object-cover ${activeShading === "wire" ? "grayscale invert opacity-80" : ""}`}
                      />
                      {activeShading === "wire" && (
                        <div 
                          className="absolute inset-0 opacity-60 pointer-events-none"
                          style={{
                            backgroundImage: "linear-gradient(rgba(147, 51, 234, 0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.7) 1px, transparent 1px)",
                            backgroundSize: "12px 12px",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Viewport Status Controls */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-zinc-400">
                  <button 
                    onClick={() => setIsRotating(!isRotating)}
                    className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>{isRotating ? "Pause Orbit" : "Resume Orbit"}</span>
                  </button>

                  <span className="font-mono text-[10px] bg-black/70 px-2 py-1 rounded-lg border border-white/10">
                    Focal: 50mm • ISO: 100
                  </span>
                </div>

              </div>

              {/* Right Dock: Material Inspector & Geometry Stats */}
              <div className="lg:col-span-3 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  <span className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                    PBR Material Stack
                  </span>

                  <div className="space-y-2 text-xs">
                    {[
                      { map: "Albedo / Diffuse", status: "8K RGB", color: "text-purple-600" },
                      { map: "Normal DX", status: "16-bit Tangent", color: "text-blue-600" },
                      { map: "Roughness Map", status: "Linear Greyscale", color: "text-zinc-600" },
                      { map: "Bioluminescent Emission", status: "HDR Float", color: "text-pink-600" },
                    ].map((m) => (
                      <div key={m.map} className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 border border-zinc-200">
                        <span className="font-medium text-zinc-800">{m.map}</span>
                        <span className={`font-mono text-[10px] font-semibold ${m.color}`}>{m.status}</span>
                      </div>
                    ))}
                  </div>

                  {/* Polycount summary */}
                  <div className="p-3 rounded-xl bg-zinc-100 border border-zinc-200 text-xs space-y-1">
                    <div className="flex justify-between text-zinc-600">
                      <span>Vertices:</span>
                      <span className="font-mono font-semibold text-zinc-900">62,400</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                      <span>Triangles:</span>
                      <span className="font-mono font-semibold text-zinc-900">{meshDensity * 2000}</span>
                    </div>
                  </div>
                </div>

                {/* Export CTA */}
                <div className="pt-4 border-t border-zinc-200">
                  <button className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer">
                    Export .{selectedFormat} Package
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Global Minimalist Footer */}
      <footer className="py-12 bg-black border-t border-zinc-900 text-center text-xs text-zinc-600">
        <p>© 2026 Tour Now Amazon Jungle. All neural models and 8K visual frames reserved.</p>
      </footer>

    </div>
  );
}
