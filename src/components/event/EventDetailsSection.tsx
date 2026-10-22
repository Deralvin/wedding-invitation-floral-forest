"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, Clock, MapPin, ExternalLink, Download, Check } from "lucide-react";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";

export function EventDetailsSection() {
  const { t } = useLanguage();
  const [downloadedIcs, setDownloadedIcs] = useState(false);

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "The Wedding of Aruna & Bian"
  )}&dates=20261024T010000Z/20261024T070000Z&details=${encodeURIComponent(
    "Pernikahan Aruna Larasati & Fabian Danendra di Pine Hill Botanical Forest Lembang"
  )}&location=${encodeURIComponent(
    "Pine Hill Botanical Forest & Pavilion, Jl. Maribaya Timur No. 1, Lembang, Bandung Barat"
  )}`;

  const handleDownloadIcs = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Botanical Airways//Wedding Invitation//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:The Wedding of Aruna & Bian
UID:wedding-aruna-bian-20261024@botanical.airways
DTSTART:20261024T010000Z
DTEND:20261024T070000Z
DESCRIPTION:Pernikahan Aruna Larasati & Fabian Danendra (Botanical Forest Edition)
LOCATION:Pine Hill Botanical Forest & Pavilion, Jl. Maribaya Timur No. 1, Lembang, Bandung Barat
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Aruna-Bian-Wedding.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadedIcs(true);
    setTimeout(() => setDownloadedIcs(false), 3000);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 bg-kraft-bg kraft-texture overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <RevealOnScroll variant="up" className="text-center space-y-2">
          <span className="text-[11px] font-mono tracking-widest text-earth-terracotta uppercase font-bold block">
            {t.event.sectionTag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-botanical-deep">
            {t.event.sectionTitle}
          </h2>
          <div className="w-16 h-0.5 bg-earth-terracotta/40 mx-auto mt-3 rounded-full" />
        </RevealOnScroll>

        {/* Schedule Cards: Akad & Resepsi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* AKAD NIKAH CARD */}
          <RevealOnScroll variant="left" delay={100}>
            <div className="relative bg-kraft-card kraft-card-texture rounded-2xl border-2 border-kraft-border p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-kraft-border pb-3">
                  <span className="text-xs font-mono font-bold text-botanical-forest tracking-wider uppercase">
                    DEPARTURE 01
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-botanical-sage/20 text-botanical-forest text-[10px] font-mono font-bold">
                    AKAD
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-botanical-deep">
                    {t.event.akadTitle}
                  </h3>
                  <p className="text-xs text-botanical-deep/70 mt-1">
                    {t.event.akadDesc}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-kraft-border/60">
                  <div className="flex items-center gap-2.5 text-xs font-mono text-botanical-deep">
                    <Calendar className="w-4 h-4 text-earth-terracotta" />
                    <span>Sabtu, 24 Oktober 2026</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-mono text-botanical-deep">
                    <Clock className="w-4 h-4 text-earth-terracotta" />
                    <span>{t.event.akadTime}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-dashed border-kraft-border">
                <span className="text-[10px] font-mono text-botanical-deep/60 block uppercase">
                  LOCATION
                </span>
                <p className="text-sm font-semibold text-botanical-forest font-serif mt-0.5">
                  Pine Pavilion Sanctuary
                </p>
              </div>
            </div>
          </RevealOnScroll>

          {/* RESEPSI CARD */}
          <RevealOnScroll variant="right" delay={200}>
            <div className="relative bg-kraft-card kraft-card-texture rounded-2xl border-2 border-kraft-border p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-kraft-border pb-3">
                  <span className="text-xs font-mono font-bold text-earth-terracotta tracking-wider uppercase">
                    DEPARTURE 02
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-earth-terracotta/20 text-earth-terracotta text-[10px] font-mono font-bold">
                    RECEPTION
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-botanical-deep">
                    {t.event.resepsiTitle}
                  </h3>
                  <p className="text-xs text-botanical-deep/70 mt-1">
                    {t.event.resepsiDesc}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-kraft-border/60">
                  <div className="flex items-center gap-2.5 text-xs font-mono text-botanical-deep">
                    <Calendar className="w-4 h-4 text-earth-terracotta" />
                    <span>Sabtu, 24 Oktober 2026</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-mono text-botanical-deep">
                    <Clock className="w-4 h-4 text-earth-terracotta" />
                    <span>{t.event.resepsiTime}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-dashed border-kraft-border">
                <span className="text-[10px] font-mono text-botanical-deep/60 block uppercase">
                  LOCATION
                </span>
                <p className="text-sm font-semibold text-botanical-forest font-serif mt-0.5">
                  Main Botanical Lawn & Hall
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Location & Navigation Card */}
        <RevealOnScroll variant="up" delay={250}>
          <div className="bg-kraft-card/80 kraft-card-texture border border-kraft-border rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="p-2.5 rounded-xl bg-botanical-forest text-white shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-lg font-serif font-bold text-botanical-deep">
                    {t.event.locationName}
                  </h4>
                  <p className="text-xs sm:text-sm text-botanical-deep/75 mt-0.5 max-w-md">
                    {t.event.locationAddress}
                  </p>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <a
                  href="https://maps.google.com/?q=Pine+Hill+Cibodas+Lembang"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-botanical-forest hover:bg-botanical-deep text-white text-xs font-mono font-semibold transition-all shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{t.event.openMap}</span>
                </a>

                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-earth-terracotta hover:bg-earth-warm text-white text-xs font-mono font-semibold transition-all shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Google Cal</span>
                </a>

                <button
                  onClick={handleDownloadIcs}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-kraft-bg hover:bg-kraft-card border border-kraft-border text-xs font-mono text-botanical-deep transition-all cursor-pointer"
                >
                  {downloadedIcs ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-botanical-forest" />
                      <span>iCal Saved</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>.ICS</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Google Maps Embed iframe with botanical frame */}
            <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-kraft-border relative">
              <iframe
                title="Pine Hill Lembang Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15846.54145781358!2d107.6586071!3d-6.8141444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68ddc03ebef559%3A0xe54e135cecf2aebc!2sPine%20Hill%20Cibodas!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-90 contrast-105"
              />
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
