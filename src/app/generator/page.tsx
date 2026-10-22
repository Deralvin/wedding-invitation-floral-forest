"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Copy, Check, Send, ArrowLeft, Plane, MessageCircle } from "lucide-react";
import { VintageStampSeal } from "@/components/common/BotanicalDecor";

const emptySubscribe = () => () => {};

export default function GeneratorPage() {
  const [guestName, setGuestName] = useState("");
  const [category, setCategory] = useState("Sahabat");
  const [language, setLanguage] = useState<"id" | "en">("id");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const originUrl = useSyncExternalStore(
    emptySubscribe,
    () => (typeof window !== "undefined" ? window.location.origin : ""),
    () => ""
  );

  const baseOrigin = originUrl || "";
  const generatedLink = `${baseOrigin}?to=${encodeURIComponent(guestName.trim())}&lang=${language}`;

  const messageTemplateId = `*PANGGILAN PENERBANGAN // BOTANICAL AIRWAYS* ✈️🌿
Nomor Penerbangan: BA-2026
Rute: Two Hearts ➔ Eternity

Kepada Yth.
*${guestName.trim() || "Bapak/Ibu/Saudara/i"}*
di Tempat

_Assalamu'alaikum Warahmatullahi Wabarakatuh_

Dengan penuh rasa syukur dan sukacita, kami mengundang Anda untuk hadir dan memberikan doa restu pada hari bahagia pernikahan kami:

👰 *Aruna Larasati, M.Ds.*
🤵 *Fabian Danendra, S.T.*

🗓 *Sabtu, 24 Oktober 2026*
📍 *Pine Hill Botanical Forest & Pavilion, Lembang*

Boarding Pass dan lembar undangan resmi Anda dapat diakses dan dirobek melalui tautan di bawah ini:
👉 ${generatedLink}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dalam penerbangan cinta kami.

Salam hangat dan hormat,
*Aruna & Danendra*`;

  const messageTemplateEn = `*FLIGHT DISPATCH // BOTANICAL AIRWAYS* ✈️🌿
Flight: BA-2026
Route: Two Hearts ➔ Eternity

Dear *${guestName.trim() || "Honored Guest"}*,

We joyfully invite you to embark with us on our new adventure together as we celebrate our holy matrimony:

👰 *Aruna Larasati, M.Ds.*
🤵 *Fabian Danendra, S.T.*

🗓 *Saturday, October 24, 2026*
📍 *Pine Hill Botanical Forest & Pavilion, Lembang, Indonesia*

Your official boarding pass and wedding details can be revealed here:
👉 ${generatedLink}

We would be deeply honored by your presence and prayers.

Warmest regards,
*Aruna & Danendra*`;

  const currentMessage = language === "id" ? messageTemplateId : messageTemplateEn;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(currentMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const handleSendWhatsapp = () => {
    let cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "62" + cleanPhone.slice(1);
    }
    const waUrl = cleanPhone
      ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(currentMessage)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(currentMessage)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <main className="min-h-screen bg-kraft-bg kraft-texture py-12 px-4 sm:px-6 text-botanical-deep">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-botanical-forest hover:text-earth-terracotta transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Halaman Undangan</span>
          </Link>
        </div>

        {/* Header */}
        <div className="bg-kraft-card kraft-card-texture border-2 border-kraft-border rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-botanical-forest text-white text-[10px] font-mono font-bold uppercase">
              <Plane className="w-3.5 h-3.5" />
              <span>Airlines Dispatcher Console</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-botanical-deep">
              Generator Link Boarding Pass
            </h1>
            <p className="text-xs font-mono text-botanical-deep/70">
              Buat link personal & pesan siaran WhatsApp bernuansa tiket penerbangan untuk tamu Anda.
            </p>
          </div>

          <VintageStampSeal className="w-20 h-20 shrink-0 text-earth-terracotta" />
        </div>

        {/* Input Form */}
        <div className="bg-kraft-card kraft-card-texture border-2 border-kraft-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-botanical-deep uppercase mb-1.5">
                Nama Tamu Undangan *
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Contoh: Dimas & Citra / Bpk. Hendra"
                className="w-full px-4 py-3 rounded-xl bg-kraft-bg border border-kraft-border focus:border-earth-terracotta focus:outline-hidden text-sm text-botanical-deep"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-botanical-deep uppercase mb-1.5">
                Nomor WhatsApp Tamu (Opsional)
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Contoh: 08123456789 atau 628123456789"
                className="w-full px-4 py-3 rounded-xl bg-kraft-bg border border-kraft-border focus:border-earth-terracotta focus:outline-hidden text-sm text-botanical-deep"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-botanical-deep uppercase mb-1.5">
                Kategori Tamu
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-kraft-bg border border-kraft-border focus:border-earth-terracotta focus:outline-hidden text-sm text-botanical-deep"
              >
                <option value="Keluarga">Keluarga</option>
                <option value="Sahabat">Sahabat</option>
                <option value="Rekan Kerja">Rekan Kerja</option>
                <option value="VIP">Tamu VIP</option>
                <option value="Teman Kuliah">Teman Kuliah</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-botanical-deep uppercase mb-1.5">
                Bahasa Undangan
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLanguage("id")}
                  className={`py-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                    language === "id"
                      ? "bg-botanical-forest text-white border-botanical-forest"
                      : "bg-kraft-bg text-botanical-deep border-kraft-border"
                  }`}
                >
                  Bahasa Indonesia
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`py-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                    language === "en"
                      ? "bg-botanical-forest text-white border-botanical-forest"
                      : "bg-kraft-bg text-botanical-deep border-kraft-border"
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>

          {/* Generated Link Display */}
          <div className="p-4 rounded-xl bg-kraft-bg border border-kraft-border space-y-2">
            <span className="text-[10px] font-mono uppercase text-botanical-deep/60 block">
              LINK PERSONAL BOARDING PASS
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={generatedLink}
                suppressHydrationWarning
                className="w-full px-3 py-2 rounded-lg bg-kraft-card/50 border border-kraft-border text-xs font-mono text-botanical-forest select-all"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-lg bg-botanical-forest hover:bg-botanical-deep text-white text-xs font-mono font-semibold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-earth-warm" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Tersalin!" : "Salin Link"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Message Preview & WhatsApp Action */}
        <div className="bg-kraft-card kraft-card-texture border-2 border-kraft-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-kraft-border pb-3">
            <div className="flex items-center gap-2 text-botanical-forest">
              <MessageCircle className="w-5 h-5 text-earth-terracotta" />
              <h2 className="font-serif font-bold text-lg text-botanical-deep">
                Preview Pesan WhatsApp
              </h2>
            </div>
            <span className="text-[10px] font-mono text-botanical-deep/50">
              BOARDING PASS THEME
            </span>
          </div>

          {/* WhatsApp formatted message card */}
          <div
            suppressHydrationWarning
            className="bg-[#E7F3E8] p-4 sm:p-5 rounded-xl border border-botanical-sage/40 text-xs font-sans whitespace-pre-wrap leading-relaxed text-botanical-deep"
          >
            {currentMessage}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleCopyMessage}
              className="py-3 px-4 rounded-xl bg-kraft-bg hover:bg-kraft-border border border-kraft-border text-xs font-mono font-semibold text-botanical-deep flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              {copiedMessage ? <Check className="w-4 h-4 text-botanical-forest" /> : <Copy className="w-4 h-4 text-earth-terracotta" />}
              <span>{copiedMessage ? "Pesan Tersalin!" : "Salin Pesan WA"}</span>
            </button>

            <button
              type="button"
              onClick={handleSendWhatsapp}
              className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>Buka WhatsApp Sekarang</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
