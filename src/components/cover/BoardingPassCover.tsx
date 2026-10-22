"use client";

import React, { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FernLeaf, EucalyptusBranch, VintageStampSeal, BarcodeVisual } from "@/components/common/BotanicalDecor";
import { Plane, Scissors, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface BoardingPassCoverProps {
  guestName: string;
  onOpen: () => void;
  onStartTear?: () => void;
  isOpen: boolean;
}

export function BoardingPassCover({ guestName, onOpen, onStartTear, isOpen }: BoardingPassCoverProps) {
  const { t, language, setLanguage } = useLanguage();
  const [isPeeled, setIsPeeled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const dragStartRef = useRef<number | null>(null);

  // Play realistic paper tear sound via Web Audio API synthesizer
  const playTearSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") ctx.resume();

      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // White noise with envelopes simulating paper ripping
      for (let i = 0; i < bufferSize; i++) {
        const decay = Math.exp(-i / (ctx.sampleRate * 0.12));
        data[i] = (Math.random() * 2 - 1) * decay * (Math.sin(i * 0.05) > 0 ? 0.8 : 0.4);
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.Q.setValueAtTime(2.5, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // AudioContext fallback
    }
  };

  const handleTear = () => {
    if (isPeeled) return;
    onStartTear?.();
    playTearSound();
    setIsPeeled(true);

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#7A9A83", "#C86D51", "#DDD4C4", "#364E3D"],
      });
    } catch {
      // ignore
    }

    // Trigger parent callback after stub animation completes
    setTimeout(() => {
      onOpen();
    }, 850);
  };

  // Drag handlers for mobile / mouse swipe
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || dragStartRef.current === null) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - dragStartRef.current;
    if (diff > 0) {
      const progress = Math.min(100, (diff / 160) * 100);
      setDragProgress(progress);
      if (progress >= 85) {
        setIsDragging(false);
        handleTear();
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    dragStartRef.current = null;
    if (dragProgress < 85) {
      setDragProgress(0);
    }
  };

  // If already open, keep hidden
  if (isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-botanical-deep/90 backdrop-blur-md transition-all duration-700 ${
        isPeeled ? "opacity-0 pointer-events-none scale-95" : "opacity-100"
      }`}
    >
      {/* Background floating leaves decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <FernLeaf className="absolute -top-10 -left-10 w-48 h-48 text-botanical-sage rotate-45" />
        <EucalyptusBranch className="absolute -bottom-16 -right-10 w-56 h-56 text-earth-warm rotate-12" />
        <FernLeaf className="absolute bottom-10 left-4 w-32 h-32 text-botanical-forest -rotate-12" />
      </div>

      {/* Language Switcher Top Corner */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-1 bg-kraft-card/90 px-3 py-1.5 rounded-full border border-kraft-border shadow-xs text-xs font-mono">
        <button
          onClick={() => setLanguage("id")}
          className={`px-2 py-0.5 rounded-full transition-colors ${
            language === "id"
              ? "bg-botanical-forest text-white font-bold"
              : "text-botanical-deep/60 hover:text-botanical-deep"
          }`}
        >
          ID
        </button>
        <span className="text-kraft-border">|</span>
        <button
          onClick={() => setLanguage("en")}
          className={`px-2 py-0.5 rounded-full transition-colors ${
            language === "en"
              ? "bg-botanical-forest text-white font-bold"
              : "text-botanical-deep/60 hover:text-botanical-deep"
          }`}
        >
          EN
        </button>
      </div>

      {/* The Boarding Pass Ticket Container */}
      <div className="relative w-full max-w-3xl flex flex-col md:flex-row shadow-2xl rounded-2xl overflow-hidden transition-transform duration-500">
        {/* MAIN PASS SECTION */}
        <div className="relative flex-1 bg-kraft-card kraft-card-texture p-5 sm:p-7 border-t border-l border-b border-kraft-border flex flex-col justify-between">
          {/* Header strip */}
          <div className="flex items-center justify-between border-b border-kraft-border/80 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-full bg-botanical-forest text-kraft-bg">
                <Plane className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] tracking-widest font-mono text-botanical-sage block uppercase font-bold">
                  {t.boardingPass.airline}
                </span>
                <span className="text-xs font-mono font-semibold text-botanical-deep">
                  {t.boardingPass.class}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-botanical-deep/60 block">FLIGHT</span>
              <span className="text-sm font-mono font-bold text-earth-terracotta">
                {t.boardingPass.flightNo}
              </span>
            </div>
          </div>

          {/* Passenger & Flight Details */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono tracking-wider text-botanical-deep/60 block uppercase">
                {t.boardingPass.passengerName}
              </span>
              <p className="text-xl sm:text-2xl font-serif font-bold text-botanical-deep tracking-tight capitalize mt-0.5">
                {guestName || "Tamu Terhormat"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-kraft-border/60">
              <div>
                <span className="text-[9px] font-mono tracking-wider text-botanical-deep/60 block">
                  ORIGIN
                </span>
                <p className="text-xs font-semibold text-botanical-forest font-mono">
                  TWO HEARTS
                </p>
              </div>
              <div>
                <span className="text-[9px] font-mono tracking-wider text-botanical-deep/60 block">
                  DESTINATION
                </span>
                <p className="text-xs font-semibold text-earth-terracotta font-mono">
                  ETERNITY (FOREVER)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-kraft-border/60 text-center">
              <div className="bg-kraft-bg/80 p-2 rounded-lg border border-kraft-border/50">
                <span className="text-[9px] font-mono text-botanical-deep/60 block">GATE</span>
                <span className="text-xs sm:text-sm font-mono font-bold text-botanical-deep">
                  07
                </span>
              </div>
              <div className="bg-kraft-bg/80 p-2 rounded-lg border border-kraft-border/50">
                <span className="text-[9px] font-mono text-botanical-deep/60 block">SEAT</span>
                <span className="text-xs sm:text-sm font-mono font-bold text-earth-terracotta">
                  1A
                </span>
              </div>
              <div className="bg-kraft-bg/80 p-2 rounded-lg border border-kraft-border/50">
                <span className="text-[9px] font-mono text-botanical-deep/60 block">BOARDING</span>
                <span className="text-xs sm:text-sm font-mono font-bold text-botanical-deep">
                  08:30 WIB
                </span>
              </div>
            </div>
          </div>

          {/* Barcode & Vintage Seal */}
          <div className="mt-5 pt-4 border-t border-kraft-border/80 flex items-center justify-between">
            <div>
              <BarcodeVisual className="h-9 w-36 sm:w-44 text-botanical-deep/80" />
              <span className="text-[8px] font-mono tracking-widest text-botanical-deep/60 block mt-1">
                {t.boardingPass.barcodeSub}
              </span>
            </div>
            <VintageStampSeal className="w-16 h-16 sm:w-20 sm:h-20 shrink-0" />
          </div>

          {/* Half-circle cutout notches for perforation line on desktop */}
          <div className="hidden md:block absolute -right-3.5 top-0 w-7 h-7 bg-botanical-deep/90 rounded-full z-10" />
          <div className="hidden md:block absolute -right-3.5 bottom-0 w-7 h-7 bg-botanical-deep/90 rounded-full z-10" />
        </div>

        {/* PERFORATION SEPARATOR & TEAR STUB */}
        <div
          className={`relative bg-kraft-card/95 kraft-card-texture border-r border-t border-b border-kraft-border md:w-64 p-5 sm:p-6 flex flex-col justify-between items-center text-center transition-all duration-700 ease-out ${
            isPeeled
              ? "transform -rotate-12 -translate-y-24 translate-x-12 opacity-0 pointer-events-none"
              : ""
          }`}
          style={{
            transform:
              dragProgress > 0 && !isPeeled
                ? `translateX(${dragProgress * 0.4}px) rotate(${dragProgress * 0.05}deg)`
                : undefined,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
        >
          {/* Top notch */}
          <div className="md:hidden absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 bg-botanical-deep/90 rounded-full z-10" />

          {/* Stub header */}
          <div className="w-full pb-3 border-b border-dashed border-kraft-border">
            <span className="text-[9px] font-mono text-botanical-sage block tracking-widest uppercase">
              {t.boardingPass.airline}
            </span>
            <span className="text-xs font-mono font-bold text-botanical-deep block">
              BOARDING PASS STUB
            </span>
            <span className="text-[10px] font-mono text-earth-terracotta">
              BA-2026 // PASS
            </span>
          </div>

          {/* Guest Stub info */}
          <div className="my-4 space-y-2 w-full">
            <div className="bg-kraft-bg p-2.5 rounded-lg border border-kraft-border/60">
              <span className="text-[9px] font-mono text-botanical-deep/60 block uppercase">
                GUEST
              </span>
              <p className="text-xs font-bold text-botanical-deep truncate font-serif">
                {guestName || "Honored Guest"}
              </p>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono px-2 py-1 bg-botanical-sage/10 rounded-md text-botanical-deep">
              <span>DATE</span>
              <span className="font-bold text-botanical-forest">24 OCT 2026</span>
            </div>
          </div>

          {/* Peel action button */}
          <div className="w-full space-y-2">
            <button
              onClick={handleTear}
              type="button"
              className="w-full group relative flex items-center justify-center gap-2 px-4 py-3 bg-earth-terracotta hover:bg-earth-warm text-white font-sans font-semibold text-xs tracking-wider uppercase rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Scissors className="w-4 h-4 transition-transform group-hover:rotate-45" />
              <span>{t.boardingPass.tearStubPrompt}</span>
              <Sparkles className="w-3.5 h-3.5 opacity-80" />
            </button>

            <p className="text-[9px] font-mono text-botanical-deep/60 leading-tight">
              {t.boardingPass.tearStubHelper}
            </p>
          </div>

          {/* Drag progress bar */}
          {dragProgress > 0 && (
            <div className="w-full bg-kraft-border h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-earth-terracotta h-full transition-all duration-75"
                style={{ width: `${dragProgress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
