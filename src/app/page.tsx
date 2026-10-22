"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { BoardingPassCover } from "@/components/cover/BoardingPassCover";
import { HeroSection } from "@/components/hero/HeroSection";
import { CoupleSection } from "@/components/couple/CoupleSection";
import { LoveStoryTimeline } from "@/components/story/LoveStoryTimeline";
import { EventDetailsSection } from "@/components/event/EventDetailsSection";
import { DressCodeSection } from "@/components/dresscode/DressCodeSection";
import { OrganicEditorialGallery } from "@/components/gallery/OrganicEditorialGallery";
import { RsvpAndWishesSection } from "@/components/rsvp/RsvpAndWishesSection";
import { WeddingGiftSection } from "@/components/gift/WeddingGiftSection";
import { ClosingSection } from "@/components/closing/ClosingSection";
import { AudioController } from "@/components/common/AudioController";
import { Globe } from "lucide-react";

function InvitationContent() {
  const searchParams = useSearchParams();
  const guestNameParam = searchParams.get("to") || "";
  const { language, setLanguage } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [audioTrigger, setAudioTrigger] = useState(false);

  const handleStartTear = () => {
    setAudioTrigger(true);
  };

  const handleOpenCover = () => {
    setIsOpen(true);
    setAudioTrigger(true);
  };

  // Lock body scroll while cover is closed
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <main className="relative min-h-screen bg-kraft-bg text-botanical-deep selection:bg-earth-terracotta selection:text-white">
      {/* Floating Language Switcher Bar on Top */}
      <div className="fixed top-4 right-4 z-30 flex items-center gap-1.5 bg-kraft-card/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-kraft-border shadow-xs text-xs font-mono">
        <Globe className="w-3.5 h-3.5 text-botanical-forest" />
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

      {/* Boarding Pass Tear-Off Cover */}
      <BoardingPassCover
        guestName={guestNameParam}
        onOpen={handleOpenCover}
        onStartTear={handleStartTear}
        isOpen={isOpen}
      />

      {/* Main Wedding Content */}
      <HeroSection />
      <CoupleSection />
      <LoveStoryTimeline />
      <EventDetailsSection />
      <DressCodeSection />
      <OrganicEditorialGallery />
      <RsvpAndWishesSection key={guestNameParam} initialGuestName={guestNameParam} />
      <WeddingGiftSection />
      <ClosingSection />

      {/* Floating Audio Soundtrack */}
      <AudioController autoPlayTrigger={audioTrigger} />
    </main>
  );
}

export default function Page() {
  return (
    <LanguageProvider>
      <Suspense fallback={<div className="min-h-screen bg-kraft-bg" />}>
        <InvitationContent />
      </Suspense>
    </LanguageProvider>
  );
}
