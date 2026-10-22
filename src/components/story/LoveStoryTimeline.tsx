"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Heart } from "lucide-react";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";

interface StoryItem {
  year: string;
  titleKey: "chapter1Title" | "chapter2Title" | "chapter3Title" | "chapter4Title";
  dateKey: "chapter1Date" | "chapter2Date" | "chapter3Date" | "chapter4Date";
  descKey: "chapter1Desc" | "chapter2Desc" | "chapter3Desc" | "chapter4Desc";
  image: string;
  tag: string;
}

export function LoveStoryTimeline() {
  const { t } = useLanguage();

  const chapters: StoryItem[] = [
    {
      year: "2020",
      titleKey: "chapter1Title",
      dateKey: "chapter1Date",
      descKey: "chapter1Desc",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80",
      tag: "BANDUNG // FIRST ENCOUNTER",
    },
    {
      year: "2022",
      titleKey: "chapter2Title",
      dateKey: "chapter2Date",
      descKey: "chapter2Desc",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=700&q=80",
      tag: "JOURNEY // GROWING TOGETHER",
    },
    {
      year: "2026",
      titleKey: "chapter3Title",
      dateKey: "chapter3Date",
      descKey: "chapter3Desc",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=700&q=80",
      tag: "LEMBANG // THE PROPOSAL",
    },
    {
      year: "FOREVER",
      titleKey: "chapter4Title",
      dateKey: "chapter4Date",
      descKey: "chapter4Desc",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80",
      tag: "THE WEDDING // DESTINATION",
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 bg-kraft-card/60 kraft-card-texture overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <RevealOnScroll variant="up" className="text-center space-y-2 mb-16">
          <span className="text-[11px] font-mono tracking-widest text-earth-terracotta uppercase font-bold block">
            {t.story.sectionTag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-botanical-deep">
            {t.story.sectionTitle}
          </h2>
          <div className="w-16 h-0.5 bg-earth-terracotta/40 mx-auto mt-3 rounded-full" />
        </RevealOnScroll>

        {/* Timeline Stem Container */}
        <div className="relative">
          {/* Central Stem Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-botanical-sage via-earth-terracotta to-botanical-forest" />

          {/* Chapters */}
          <div className="space-y-12 sm:space-y-16">
            {chapters.map((chap, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Stem Node Marker */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-kraft-bg border-2 border-earth-terracotta text-earth-terracotta shadow-xs">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </div>

                  {/* Content Card (Left or Right on desktop) */}
                  <div
                    className={`ml-14 md:ml-0 md:w-1/2 ${
                      isEven ? "md:pl-10" : "md:pr-10 md:text-right"
                    }`}
                  >
                    <RevealOnScroll
                      variant={isEven ? "right" : "left"}
                      delay={100}
                    >
                      <div className="bg-kraft-card p-5 sm:p-6 rounded-2xl border border-kraft-border shadow-xs hover:shadow-md transition-all group">
                        {/* Photo Thumbnail */}
                        <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden mb-4 border border-kraft-border/60">
                          <img
                            src={chap.image}
                            alt={t.story[chap.titleKey]}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-botanical-deep/80 text-[9px] font-mono tracking-widest text-kraft-bg">
                            {chap.tag}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className={`flex items-center gap-2 ${!isEven && "md:justify-end"}`}>
                            <span className="px-2 py-0.5 rounded-full bg-earth-terracotta/15 text-earth-terracotta font-mono font-bold text-xs">
                              {chap.year}
                            </span>
                            <span className="text-xs font-mono text-botanical-deep/60">
                              {t.story[chap.dateKey]}
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-serif font-bold text-botanical-deep">
                            {t.story[chap.titleKey]}
                          </h3>

                          <p className="text-xs sm:text-sm text-botanical-deep/75 leading-relaxed font-sans">
                            {t.story[chap.descKey]}
                          </p>
                        </div>
                      </div>
                    </RevealOnScroll>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
