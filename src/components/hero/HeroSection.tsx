"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useParallax } from "@/hooks/useParallax";
import { FernLeaf, EucalyptusBranch } from "@/components/common/BotanicalDecor";
import { ChevronDown, Sparkles } from "lucide-react";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";

export function HeroSection() {
  const { t } = useLanguage();
  const scrollY = useParallax();

  // Target Wedding Date: October 24, 2026 08:00:00 WIB
  const targetDate = new Date("2026-10-24T08:00:00+07:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, targetDate - now);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const scrollToContent = () => {
    const coupleEl = document.getElementById("the-couple");
    if (coupleEl) {
      coupleEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between pt-16 pb-12 px-4 sm:px-6 overflow-hidden kraft-texture">
      {/* Floating Parallax Botanical Leaves */}
      <div
        className="parallax-layer absolute -top-8 -left-8 pointer-events-none opacity-35 text-botanical-sage"
        style={{
          transform: `translate3d(0, ${scrollY * 0.18}px, 0) rotate(15deg)`,
        }}
      >
        <FernLeaf className="w-48 h-48 sm:w-64 sm:h-64" />
      </div>

      <div
        className="parallax-layer absolute top-24 -right-10 pointer-events-none opacity-30 text-botanical-forest"
        style={{
          transform: `translate3d(0, ${scrollY * 0.28}px, 0) rotate(-20deg)`,
        }}
      >
        <EucalyptusBranch className="w-44 h-44 sm:w-56 sm:h-56" />
      </div>

      <div
        className="parallax-layer absolute bottom-20 left-4 pointer-events-none opacity-20 text-earth-terracotta"
        style={{
          transform: `translate3d(0, ${scrollY * -0.12}px, 0) rotate(40deg)`,
        }}
      >
        <FernLeaf className="w-32 h-32 sm:w-40 sm:h-40" />
      </div>

      {/* Top Greeting & Monogram */}
      <RevealOnScroll variant="up" delay={100} className="text-center z-10 max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-botanical-sage/15 border border-botanical-sage/30 text-botanical-forest text-xs font-mono tracking-widest uppercase">
          <Sparkles className="w-3 h-3 text-earth-terracotta" />
          <span>WEDDING CELEBRATION</span>
          <Sparkles className="w-3 h-3 text-earth-terracotta" />
        </div>

        <p className="font-serif italic text-sm sm:text-base text-botanical-deep/75 pt-2">
          {t.hero.bismillah}
        </p>

        <p className="text-xs sm:text-sm text-botanical-deep/70 max-w-md mx-auto leading-relaxed">
          {t.hero.greeting}
        </p>
      </RevealOnScroll>

      {/* Couple Grand Typography */}
      <RevealOnScroll variant="scale" delay={200} className="text-center z-10 my-auto py-6 space-y-2">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-normal text-botanical-deep tracking-tight">
          <span className="block hover:text-botanical-forest transition-colors">Aruna</span>
          <span className="inline-flex items-center justify-center my-1">
            <span className="h-px w-10 sm:w-16 bg-kraft-border inline-block mr-3" />
            <span className="font-serif italic text-2xl sm:text-4xl text-earth-terracotta font-normal">
              &
            </span>
            <span className="h-px w-10 sm:w-16 bg-kraft-border inline-block ml-3" />
          </span>
          <span className="block hover:text-botanical-forest transition-colors">Danendra</span>
        </h1>

        <div className="pt-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-earth-terracotta/40" />
          <span className="text-xs sm:text-sm font-mono tracking-widest text-botanical-forest uppercase font-medium">
            {t.hero.date}
          </span>
          <span className="h-px w-8 bg-earth-terracotta/40" />
        </div>

        <p className="text-xs font-mono text-botanical-deep/60">
          Pine Hill Botanical Forest — Lembang, Bandung
        </p>
      </RevealOnScroll>

      {/* Countdown Clock & Scroll Trigger */}
      <RevealOnScroll variant="up" delay={300} className="z-10 w-full max-w-lg space-y-6">
        {/* Countdown Box */}
        <div suppressHydrationWarning className="bg-kraft-card/90 backdrop-blur-xs kraft-card-texture border border-kraft-border rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2 sm:p-3 rounded-xl bg-kraft-bg/80 border border-kraft-border/60">
              <span className="block text-2xl sm:text-3xl font-mono font-bold text-botanical-deep">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-mono uppercase text-botanical-deep/60">
                {t.hero.countdownDays}
              </span>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-kraft-bg/80 border border-kraft-border/60">
              <span className="block text-2xl sm:text-3xl font-mono font-bold text-botanical-deep">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-mono uppercase text-botanical-deep/60">
                {t.hero.countdownHours}
              </span>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-kraft-bg/80 border border-kraft-border/60">
              <span className="block text-2xl sm:text-3xl font-mono font-bold text-botanical-deep">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-mono uppercase text-botanical-deep/60">
                {t.hero.countdownMins}
              </span>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-kraft-bg/80 border border-kraft-border/60">
              <span className="block text-2xl sm:text-3xl font-mono font-bold text-earth-terracotta">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-mono uppercase text-botanical-deep/60">
                {t.hero.countdownSecs}
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator button */}
        <div className="flex flex-col items-center justify-center pt-2">
          <button
            onClick={scrollToContent}
            type="button"
            className="group flex flex-col items-center gap-1.5 text-botanical-deep/60 hover:text-botanical-forest transition-colors cursor-pointer"
          >
            <span className="text-[11px] font-mono tracking-widest uppercase">
              {t.cover.scrollHint}
            </span>
            <span className="p-2 rounded-full border border-kraft-border group-hover:border-botanical-sage transition-all animate-bounce">
              <ChevronDown className="w-4 h-4" />
            </span>
          </button>
        </div>
      </RevealOnScroll>
    </section>
  );
}
