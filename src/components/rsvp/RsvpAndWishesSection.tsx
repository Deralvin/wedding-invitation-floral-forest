"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { submitRSVP, submitWish, subscribeWishes, WishRecord } from "@/lib/firebase";
import { CheckCircle2, Send, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";

interface RsvpAndWishesSectionProps {
  initialGuestName?: string;
}

export function RsvpAndWishesSection({ initialGuestName = "" }: RsvpAndWishesSectionProps) {
  const { t } = useLanguage();

  // RSVP Form State
  const [guestName, setGuestName] = useState(initialGuestName);
  const [attendance, setAttendance] = useState<"ATTENDING" | "DECLINED">("ATTENDING");
  const [guestCount, setGuestCount] = useState(1);
  const [dietary, setDietary] = useState("");
  const [isSubmittingRSVP, setIsSubmittingRSVP] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Wishes Form State
  const [wishName, setWishName] = useState(initialGuestName);
  const [wishRel, setWishRel] = useState("Sahabat");
  const [wishMsg, setWishMsg] = useState("");
  const [isSubmittingWish, setIsSubmittingWish] = useState(false);
  const [wishSubmitted, setWishSubmitted] = useState(false);

  // Wishes List
  const [wishes, setWishes] = useState<WishRecord[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeWishes((items) => {
      setWishes(items);
    });
    return () => unsubscribe();
  }, []);

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    setIsSubmittingRSVP(true);

    try {
      await submitRSVP({
        guestName: guestName.trim(),
        attendance,
        guestCount: attendance === "ATTENDING" ? guestCount : 0,
        dietaryRestrictions: dietary.trim() || undefined,
      });
      setRsvpSubmitted(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#7A9A83", "#C86D51", "#DDD4C4"],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingRSVP(false);
    }
  };

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishMsg.trim()) return;
    setIsSubmittingWish(true);

    try {
      await submitWish({
        guestName: wishName.trim(),
        relationshipTag: wishRel,
        message: wishMsg.trim(),
      });
      setWishMsg("");
      setWishSubmitted(true);
      setTimeout(() => setWishSubmitted(false), 4000);
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.8 },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingWish(false);
    }
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return (name[0] || "G").toUpperCase();
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 bg-kraft-bg kraft-texture overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* RSVP SECTION */}
        <div className="space-y-8">
          <RevealOnScroll variant="up" className="text-center space-y-2">
            <span className="text-[11px] font-mono tracking-widest text-earth-terracotta uppercase font-bold block">
              {t.rsvp.sectionTag}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-botanical-deep">
              {t.rsvp.sectionTitle}
            </h2>
            <div className="w-16 h-0.5 bg-earth-terracotta/40 mx-auto mt-3 rounded-full" />
          </RevealOnScroll>

          <RevealOnScroll variant="scale" delay={150}>
            <div className="bg-kraft-card kraft-card-texture border-2 border-kraft-border rounded-2xl p-6 sm:p-8 shadow-sm">
              {rsvpSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-botanical-forest/15 text-botanical-forest mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-botanical-deep">
                    {t.rsvp.successMsg}
                  </h3>
                  <p className="text-xs font-mono text-botanical-deep/60">
                    {guestName} • {attendance === "ATTENDING" ? `${guestCount} Tamu` : "Tidak Hadir"}
                  </p>
                  <button
                    onClick={() => setRsvpSubmitted(false)}
                    type="button"
                    className="mt-4 text-xs font-mono text-earth-terracotta hover:underline cursor-pointer"
                  >
                    Ubah Konfirmasi
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRSVPSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-botanical-deep uppercase mb-1.5">
                      {t.rsvp.nameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder={t.rsvp.namePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-kraft-bg border border-kraft-border focus:border-earth-terracotta focus:outline-hidden text-sm text-botanical-deep transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-botanical-deep uppercase mb-2">
                      {t.rsvp.attendanceLabel} *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAttendance("ATTENDING")}
                        className={`p-3.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          attendance === "ATTENDING"
                            ? "bg-botanical-forest text-white border-botanical-forest shadow-xs"
                            : "bg-kraft-bg text-botanical-deep border-kraft-border hover:bg-kraft-card"
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{t.rsvp.attending}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAttendance("DECLINED")}
                        className={`p-3.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          attendance === "DECLINED"
                            ? "bg-earth-terracotta text-white border-earth-terracotta shadow-xs"
                            : "bg-kraft-bg text-botanical-deep border-kraft-border hover:bg-kraft-card"
                        }`}
                      >
                        <span>{t.rsvp.declined}</span>
                      </button>
                    </div>
                  </div>

                  {attendance === "ATTENDING" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div>
                        <label className="block text-xs font-mono font-semibold text-botanical-deep uppercase mb-1.5">
                          {t.rsvp.guestCountLabel}
                        </label>
                        <select
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-kraft-bg border border-kraft-border focus:border-earth-terracotta focus:outline-hidden text-sm text-botanical-deep"
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                              {num} Orang
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-semibold text-botanical-deep uppercase mb-1.5">
                          {t.rsvp.dietaryLabel}
                        </label>
                        <input
                          type="text"
                          value={dietary}
                          onChange={(e) => setDietary(e.target.value)}
                          placeholder="Misal: Halal / Vegetarian"
                          className="w-full px-4 py-3 rounded-xl bg-kraft-bg border border-kraft-border focus:border-earth-terracotta focus:outline-hidden text-sm text-botanical-deep"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmittingRSVP}
                    className="w-full py-3.5 rounded-xl bg-botanical-forest hover:bg-botanical-deep text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmittingRSVP ? t.rsvp.submitting : t.rsvp.submit}</span>
                  </button>
                </form>
              )}
            </div>
          </RevealOnScroll>
        </div>

        {/* WISHES & GUESTBOOK SECTION */}
        <div className="space-y-8">
          <RevealOnScroll variant="up" className="text-center space-y-2">
            <span className="text-[11px] font-mono tracking-widest text-earth-terracotta uppercase font-bold block">
              {t.wishes.sectionTag}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-botanical-deep">
              {t.wishes.sectionTitle}
            </h2>
            <div className="w-16 h-0.5 bg-earth-terracotta/40 mx-auto mt-3 rounded-full" />
          </RevealOnScroll>

          {/* Form Write Wish */}
          <RevealOnScroll variant="scale" delay={150}>
            <div className="bg-kraft-card kraft-card-texture border-2 border-kraft-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <form onSubmit={handleWishSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-botanical-deep uppercase mb-1.5">
                      {t.wishes.nameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={wishName}
                      onChange={(e) => setWishName(e.target.value)}
                      placeholder="Nama Anda"
                      className="w-full px-4 py-3 rounded-xl bg-kraft-bg border border-kraft-border focus:border-earth-terracotta focus:outline-hidden text-sm text-botanical-deep"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-botanical-deep uppercase mb-1.5">
                      {t.wishes.relationshipLabel}
                    </label>
                    <select
                      value={wishRel}
                      onChange={(e) => setWishRel(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-kraft-bg border border-kraft-border focus:border-earth-terracotta focus:outline-hidden text-sm text-botanical-deep"
                    >
                      {t.wishes.relationshipOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-botanical-deep uppercase mb-1.5">
                    {t.wishes.messageLabel} *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={wishMsg}
                    onChange={(e) => setWishMsg(e.target.value)}
                    placeholder={t.wishes.messagePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-kraft-bg border border-kraft-border focus:border-earth-terracotta focus:outline-hidden text-sm text-botanical-deep resize-none"
                  />
                </div>

                {wishSubmitted && (
                  <div className="p-3 rounded-xl bg-botanical-sage/20 border border-botanical-sage text-botanical-deep text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-botanical-forest" />
                    <span>{t.wishes.successMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmittingWish}
                  className="w-full py-3.5 rounded-xl bg-earth-terracotta hover:bg-earth-warm text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>{isSubmittingWish ? t.wishes.sending : t.wishes.sendWish}</span>
                </button>
              </form>
            </div>
          </RevealOnScroll>

          {/* Live Stream of Wishes (Scrollable Feed) */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {wishes.length === 0 ? (
              <p className="text-center text-xs font-mono text-botanical-deep/60 py-8">
                {t.wishes.empty}
              </p>
            ) : (
              wishes.map((item, idx) => (
                <RevealOnScroll key={item.id} variant="up" delay={Math.min(idx * 60, 300)}>
                  <div className="bg-kraft-card/90 kraft-card-texture border border-kraft-border rounded-xl p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs hover:shadow-xs transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-botanical-forest text-kraft-bg flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-inner">
                      {getInitials(item.guestName)}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-sm text-botanical-deep">
                            {item.guestName}
                          </h4>
                          {item.relationshipTag && (
                            <span className="px-2 py-0.5 rounded-full bg-botanical-sage/20 text-botanical-deep text-[9px] font-mono">
                              {item.relationshipTag}
                            </span>
                          )}
                        </div>
                        <span suppressHydrationWarning className="text-[10px] font-mono text-botanical-deep/50">
                          {item.createdAt instanceof Date
                            ? item.createdAt.toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                              })
                            : "Baru saja"}
                        </span>
                      </div>

                      <p className="text-xs text-botanical-deep/80 leading-relaxed font-sans">
                        {item.message}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
