"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FernLeaf, EucalyptusBranch } from "@/components/common/BotanicalDecor";
import { Heart } from "lucide-react";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function CoupleSection() {
  const { t } = useLanguage();

  return (
    <section id="the-couple" className="relative py-20 px-4 sm:px-6 bg-kraft-bg kraft-texture overflow-hidden">
      {/* Decorative leaf motifs */}
      <FernLeaf className="absolute -top-10 right-4 w-40 h-40 text-botanical-sage/25 pointer-events-none rotate-45" />
      <EucalyptusBranch className="absolute bottom-8 -left-8 w-44 h-44 text-botanical-forest/20 pointer-events-none -rotate-12" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <RevealOnScroll variant="up" className="text-center space-y-2 mb-16">
          <span className="text-[11px] font-mono tracking-widest text-earth-terracotta uppercase font-bold block">
            {t.couple.sectionTag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-botanical-deep">
            {t.couple.sectionTitle}
          </h2>
          <div className="w-16 h-0.5 bg-earth-terracotta/40 mx-auto mt-3 rounded-full" />
        </RevealOnScroll>

        {/* Couple Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* THE GROOM */}
          <RevealOnScroll variant="left" delay={150}>
            <div className="flex flex-col items-center text-center space-y-4 group">
              {/* Arch Mask Portrait Frame */}
              <div className="relative w-56 sm:w-64 h-72 sm:h-80 arch-frame bg-kraft-card border-2 border-kraft-border shadow-md overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-kraft-bg/85 backdrop-blur-xs text-earth-terracotta">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                </div>

                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                  alt="Fabian Danendra"
                  className="w-full h-full object-cover grayscale-20 contrast-105 group-hover:grayscale-0 transition-all duration-700"
                />

                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-botanical-deep/60 to-transparent" />
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-mono tracking-wider text-earth-terracotta uppercase font-semibold">
                  {t.couple.groomRole}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-botanical-deep">
                  Fabian Danendra, S.T.
                </h3>
                <p className="text-xs sm:text-sm text-botanical-deep/75 max-w-xs leading-relaxed font-sans">
                  {t.couple.sonOf} <br />
                  <span className="font-semibold text-botanical-forest">{t.couple.father} Hendra Danendra</span> &{" "}
                  <span className="font-semibold text-botanical-forest">{t.couple.mother} Sulastri Handayani</span>
                </p>

                <div className="pt-2">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-kraft-card hover:bg-botanical-forest hover:text-white border border-kraft-border text-xs font-mono text-botanical-deep transition-all"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>@danendra.f</span>
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* THE BRIDE */}
          <RevealOnScroll variant="right" delay={250}>
            <div className="flex flex-col items-center text-center space-y-4 group">
              {/* Arch Mask Portrait Frame */}
              <div className="relative w-56 sm:w-64 h-72 sm:h-80 arch-frame bg-kraft-card border-2 border-kraft-border shadow-md overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-kraft-bg/85 backdrop-blur-xs text-earth-terracotta">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                </div>

                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                  alt="Aruna Larasati"
                  className="w-full h-full object-cover grayscale-20 contrast-105 group-hover:grayscale-0 transition-all duration-700"
                />

                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-botanical-deep/60 to-transparent" />
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-mono tracking-wider text-earth-terracotta uppercase font-semibold">
                  {t.couple.brideRole}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-botanical-deep">
                  Aruna Larasati, M.Ds.
                </h3>
                <p className="text-xs sm:text-sm text-botanical-deep/75 max-w-xs leading-relaxed font-sans">
                  {t.couple.daughterOf} <br />
                  <span className="font-semibold text-botanical-forest">{t.couple.father} Dr. Bambang Wijaya</span> &{" "}
                  <span className="font-semibold text-botanical-forest">{t.couple.mother} Ratna Kartika</span>
                </p>

                <div className="pt-2">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-kraft-card hover:bg-botanical-forest hover:text-white border border-kraft-border text-xs font-mono text-botanical-deep transition-all"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>@arunalarasati</span>
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
