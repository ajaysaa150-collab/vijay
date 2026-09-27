import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Tour Now Amazon Jungle | Next-Gen AI Image Generator",
  description: "Create hyper-realistic 8K AI artwork, concept designs, and neural visuals in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-black text-white selection:bg-[#8b5cf6] selection:text-white">
        {children}
      </body>
    </html>
  );
}
