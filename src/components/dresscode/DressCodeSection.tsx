"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";

export function DressCodeSection() {
  const { t } = useLanguage();

  const swatches = [
    { name: t.dressCode.sage, hex: "#364E3D", textClass: "text-white" },
    { name: t.dressCode.terracotta, hex: "#C86D51", textClass: "text-white" },
    { name: t.dressCode.kraft, hex: "#DDD4C4", textClass: "text-botanical-deep" },
    { name: t.dressCode.olive, hex: "#1F2E22", textClass: "text-white" },
  ];

  return (
    <section className="relative py-16 px-4 sm:px-6 bg-kraft-bg kraft-texture">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <RevealOnScroll variant="up" className="space-y-2">
          <span className="text-[11px] font-mono tracking-widest text-earth-terracotta uppercase font-bold block">
            {t.dressCode.sectionTag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-botanical-deep">
            {t.dressCode.sectionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-botanical-deep/70 max-w-lg mx-auto leading-relaxed">
            {t.dressCode.desc}
          </p>
        </RevealOnScroll>

        {/* Color Swatch Circles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
          {swatches.map((swatch, idx) => (
            <RevealOnScroll key={idx} variant="scale" delay={idx * 100}>
              <div className="bg-kraft-card p-4 rounded-xl border border-kraft-border flex flex-col items-center gap-2.5 shadow-xs hover:shadow-md transition-shadow">
                <div
                  className="w-14 h-14 rounded-full shadow-inner border-2 border-white/60 transition-transform hover:scale-110"
                  style={{ backgroundColor: swatch.hex }}
                />
                <span className="text-xs font-serif font-bold text-botanical-deep">
                  {swatch.name}
                </span>
                <span className="text-[10px] font-mono text-botanical-deep/50 uppercase">
                  {swatch.hex}
                </span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
