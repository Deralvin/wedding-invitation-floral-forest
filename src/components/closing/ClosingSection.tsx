"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FernLeaf, VintageStampSeal } from "@/components/common/BotanicalDecor";
import { Heart, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";

export function ClosingSection() {
  const { t } = useLanguage();

  return (
    <footer className="relative py-20 px-4 sm:px-6 bg-kraft-bg kraft-texture border-t border-kraft-border overflow-hidden">
      <FernLeaf className="absolute -bottom-10 right-4 w-40 h-40 text-botanical-sage/20 pointer-events-none rotate-12" />

      <div className="max-w-2xl mx-auto text-center space-y-8 relative z-10">
        <RevealOnScroll variant="scale">
          <div className="w-12 h-12 rounded-full bg-botanical-sage/15 text-earth-terracotta flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6 fill-current" />
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="up" delay={150} className="space-y-3">
          <p className="text-xs sm:text-sm text-botanical-deep/75 leading-relaxed font-sans max-w-lg mx-auto">
            {t.closing.text}
          </p>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-botanical-deep pt-2">
            {t.closing.thankYou}
          </h3>

          <p className="text-xs sm:text-sm font-mono text-botanical-forest font-semibold">
            {t.closing.families}
          </p>
        </RevealOnScroll>

        {/* Vintage Seal Stamp */}
        <RevealOnScroll variant="scale" delay={250} className="pt-4 flex justify-center">
          <VintageStampSeal className="w-20 h-20 text-earth-terracotta" />
        </RevealOnScroll>

        {/* Couple Signature Monogram */}
        <RevealOnScroll variant="up" delay={350} className="pt-2 text-center">
          <span className="font-serif italic text-3xl sm:text-4xl text-botanical-deep font-normal">
            Aruna & Danendra
          </span>
          <p className="text-[10px] font-mono text-botanical-deep/50 tracking-widest mt-1">
            24 OKTOBER 2026 // PINE HILL LEMBANG
          </p>
        </RevealOnScroll>

        {/* Internal Link to Host Generator */}
        <div className="pt-8 border-t border-kraft-border/60">
          <Link
            href="/generator"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-kraft-card hover:bg-kraft-border text-botanical-deep/70 hover:text-botanical-deep text-[11px] font-mono transition-colors"
          >
            <LinkIcon className="w-3.5 h-3.5 text-earth-terracotta" />
            <span>Airlines Dispatcher: Buat Link Tamu (/generator)</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
