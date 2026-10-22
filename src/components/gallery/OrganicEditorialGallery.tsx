"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useParallax } from "@/hooks/useParallax";
import { Maximize2, X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";

interface GalleryPhoto {
  id: string;
  url: string;
  alt: string;
  aspect: "portrait" | "landscape" | "arch" | "square";
  title: string;
  location: string;
  rotation: string;
  parallaxSpeed: number;
}

const PHOTOS: GalleryPhoto[] = [
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    alt: "Pine forest stroll",
    aspect: "arch",
    title: "Under The Canopy",
    location: "Lembang Pine Wood",
    rotation: "-rotate-2",
    parallaxSpeed: 0.05,
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
    alt: "Gentle laughter in autumn breeze",
    aspect: "portrait",
    title: "Warm Embrace",
    location: "Botanical Meadow",
    rotation: "rotate-3",
    parallaxSpeed: -0.06,
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85",
    alt: "Sunlight through the leaves",
    aspect: "landscape",
    title: "Golden Hour Serenade",
    location: "Hillside Vista",
    rotation: "-rotate-1",
    parallaxSpeed: 0.04,
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85",
    alt: "Hands intertwined with botanical rings",
    aspect: "portrait",
    title: "The Quiet Promise",
    location: "Old Tea Plantation",
    rotation: "rotate-2",
    parallaxSpeed: -0.04,
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=85",
    alt: "Botanical bouquet and vintage dress",
    aspect: "arch",
    title: "Flora in Harmony",
    location: "Greenhouse Pavilion",
    rotation: "-rotate-2",
    parallaxSpeed: 0.07,
  },
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85",
    alt: "Sharing joy and quiet moments",
    aspect: "landscape",
    title: "Eternity Begins",
    location: "Lake Patenggang",
    rotation: "rotate-1",
    parallaxSpeed: -0.05,
  },
];

export function OrganicEditorialGallery() {
  const { t } = useLanguage();
  const scrollY = useParallax();
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePhotoIdx(null);
      if (e.key === "ArrowRight" && activePhotoIdx !== null) {
        setActivePhotoIdx((prev) => ((prev! + 1) % PHOTOS.length));
      }
      if (e.key === "ArrowLeft" && activePhotoIdx !== null) {
        setActivePhotoIdx((prev) => (prev! === 0 ? PHOTOS.length - 1 : prev! - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIdx]);

  return (
    <section className="relative py-20 px-4 sm:px-6 bg-kraft-card/40 kraft-card-texture overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <RevealOnScroll variant="up" className="text-center space-y-2">
          <span className="text-[11px] font-mono tracking-widest text-earth-terracotta uppercase font-bold block">
            {t.gallery.sectionTag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-botanical-deep">
            {t.gallery.sectionTitle}
          </h2>
          <div className="w-16 h-0.5 bg-earth-terracotta/40 mx-auto mt-3 rounded-full" />
        </RevealOnScroll>

        {/* Asymmetrical Editorial Collage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-center">
          {PHOTOS.map((photo, idx) => {
            const parallaxOffset = (scrollY - 1800) * photo.parallaxSpeed;

            return (
              <RevealOnScroll
                key={photo.id}
                variant="scale"
                delay={idx * 80}
              >
                <div
                  className={`group relative transition-transform duration-300 ${photo.rotation} hover:rotate-0 hover:scale-[1.02] hover:z-20`}
                  style={{
                    transform: `translate3d(0, ${Math.max(-40, Math.min(40, parallaxOffset))}px, 0)`,
                  }}
                >
                  {/* Polaroid / Editorial Canvas Wrapper */}
                  <div
                    onClick={() => setActivePhotoIdx(idx)}
                    className="bg-kraft-card p-3 sm:p-4 rounded-xl shadow-md border border-kraft-border cursor-pointer transition-shadow hover:shadow-xl"
                  >
                    {/* Photo Container with varied Aspect Ratio */}
                    <div
                      className={`relative overflow-hidden w-full ${
                        photo.aspect === "arch"
                          ? "arch-frame h-80"
                          : photo.aspect === "portrait"
                          ? "rounded-lg h-96"
                          : "rounded-lg h-64"
                      } bg-kraft-bg`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.alt}
                        className="w-full h-full object-cover grayscale-15 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />

                      {/* Hover expand indicator */}
                      <div className="absolute inset-0 bg-botanical-deep/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <span className="p-2.5 rounded-full bg-kraft-bg/90 text-botanical-deep shadow-md flex items-center gap-1.5 text-xs font-mono">
                          <Maximize2 className="w-4 h-4 text-earth-terracotta" />
                          <span>{t.gallery.viewDetail}</span>
                        </span>
                      </div>
                    </div>

                    {/* Polaroid handwritten caption caption */}
                    <div className="pt-3 pb-1 px-1 flex items-center justify-between">
                      <div>
                        <h4 className="font-serif italic text-base text-botanical-deep font-semibold">
                          {photo.title}
                        </h4>
                        <p className="text-[10px] font-mono text-botanical-deep/60">
                          {photo.location}
                        </p>
                      </div>
                      <span className="text-[9px] font-mono text-earth-terracotta border border-earth-terracotta/30 px-2 py-0.5 rounded-sm uppercase">
                        2026 // EXP
                      </span>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Prewedding Cinematic Video Box */}
        <RevealOnScroll variant="up" delay={200} className="pt-10 max-w-4xl mx-auto">
          <div className="bg-kraft-card kraft-card-texture border-2 border-kraft-border rounded-2xl p-5 sm:p-7 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-kraft-border pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-full bg-earth-terracotta text-white">
                  <Play className="w-4 h-4 fill-current" />
                </span>
                <div>
                  <h3 className="font-serif font-bold text-lg text-botanical-deep">
                    {t.gallery.videoTitle}
                  </h3>
                  <p className="text-[10px] font-mono text-botanical-deep/60">
                    A JOURNEY THROUGH PINE CANOPIES
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-botanical-forest/10 text-botanical-forest text-xs font-mono font-bold">
                4K CINEMATIC
              </span>
            </div>

            {/* Responsive Video Embed */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-kraft-border bg-botanical-deep">
              <iframe
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?controls=1&rel=0"
                title="Prewedding Video Highlights"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* LIGHTBOX MODAL */}
      {activePhotoIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-botanical-deep/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setActivePhotoIdx(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActivePhotoIdx(null)}
            type="button"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIdx((prev) => (prev! === 0 ? PHOTOS.length - 1 : prev! - 1));
            }}
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIdx((prev) => (prev! + 1) % PHOTOS.length);
            }}
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Photo Content Card */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center p-3 bg-kraft-card rounded-2xl border border-kraft-border shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={PHOTOS[activePhotoIdx].url}
              alt={PHOTOS[activePhotoIdx].alt}
              className="max-h-[70vh] w-auto object-contain rounded-xl"
            />
            <div className="pt-3 pb-1 text-center">
              <h4 className="font-serif font-bold text-lg text-botanical-deep">
                {PHOTOS[activePhotoIdx].title}
              </h4>
              <p className="text-xs font-mono text-botanical-deep/60">
                {PHOTOS[activePhotoIdx].location} • {activePhotoIdx + 1} / {PHOTOS.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
