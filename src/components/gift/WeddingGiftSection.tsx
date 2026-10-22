"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Copy, Check, QrCode, Gift, CreditCard, MapPin, X } from "lucide-react";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";

export function WeddingGiftSection() {
  const { t } = useLanguage();
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [showQrisModal, setShowQrisModal] = useState(false);

  const bankAccounts = [
    {
      id: "mandiri",
      bankName: "BANK MANDIRI",
      accountNumber: "1310019283741",
      holder: "Fabian Danendra",
    },
    {
      id: "bca",
      bankName: "BANK BCA",
      accountNumber: "8475291038",
      holder: "Aruna Larasati",
    },
  ];

  const postalAddress = "Jl. Maribaya Timur No. 1, RT 02 / RW 04, Desa Cibodas, Kec. Lembang, Kabupaten Bandung Barat, Jawa Barat 40391 (Up: Aruna & Danendra)";

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    if (id === "address") {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    } else {
      setCopiedBank(id);
      setTimeout(() => setCopiedBank(null), 2500);
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 bg-kraft-card/50 kraft-card-texture overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <RevealOnScroll variant="up" className="text-center space-y-2">
          <span className="text-[11px] font-mono tracking-widest text-earth-terracotta uppercase font-bold block">
            {t.gift.sectionTag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-botanical-deep">
            {t.gift.sectionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-botanical-deep/70 max-w-lg mx-auto leading-relaxed pt-1">
            {t.gift.desc}
          </p>
          <div className="w-16 h-0.5 bg-earth-terracotta/40 mx-auto mt-3 rounded-full" />
        </RevealOnScroll>

        {/* Bank Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {bankAccounts.map((acc, idx) => (
            <RevealOnScroll key={acc.id} variant={idx === 0 ? "left" : "right"} delay={100 * (idx + 1)}>
              <div className="bg-kraft-card kraft-card-texture border-2 border-kraft-border rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-5 hover:border-botanical-sage transition-all h-full">
                <div className="flex items-center justify-between border-b border-kraft-border pb-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-botanical-forest" />
                    <span className="text-xs font-mono font-bold text-botanical-deep tracking-wider">
                      {acc.bankName}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-earth-terracotta bg-earth-terracotta/10 px-2 py-0.5 rounded-sm">
                    DIGITAL ENVELOPE
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-botanical-deep/60 block uppercase">
                    ACCOUNT NUMBER
                  </span>
                  <p className="text-2xl font-mono font-bold text-botanical-deep tracking-wider">
                    {acc.accountNumber}
                  </p>
                  <p className="text-xs font-serif text-botanical-deep/80">
                    {t.gift.recipient} <span className="font-semibold">{acc.holder}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(acc.accountNumber, acc.id)}
                  className="w-full py-2.5 rounded-xl bg-botanical-forest hover:bg-botanical-deep text-white text-xs font-mono font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedBank === acc.id ? (
                    <>
                      <Check className="w-4 h-4 text-earth-warm" />
                      <span>{t.gift.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{t.gift.copyNumber}</span>
                    </>
                  )}
                </button>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* QRIS & Physical Gift Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* QRIS Option */}
          <RevealOnScroll variant="left" delay={200}>
            <div className="bg-kraft-card/90 kraft-card-texture border border-kraft-border rounded-2xl p-6 flex flex-col items-center text-center justify-between space-y-4 h-full">
              <div className="space-y-1">
                <div className="w-10 h-10 rounded-full bg-earth-terracotta/15 text-earth-terracotta flex items-center justify-center mx-auto mb-2">
                  <QrCode className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif font-bold text-botanical-deep">
                  {t.gift.qrisTitle}
                </h3>
                <p className="text-xs text-botanical-deep/65">
                  Scan via GoPay, OVO, Dana, ShopeePay, atau Mobile Banking
                </p>
              </div>

              <button
                onClick={() => setShowQrisModal(true)}
                type="button"
                className="px-5 py-2.5 rounded-xl bg-earth-terracotta hover:bg-earth-warm text-white text-xs font-mono font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Tampilkan QRIS</span>
              </button>
            </div>
          </RevealOnScroll>

          {/* Physical Gift Option */}
          <RevealOnScroll variant="right" delay={300}>
            <div className="bg-kraft-card/90 kraft-card-texture border border-kraft-border rounded-2xl p-6 flex flex-col justify-between space-y-4 h-full">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-botanical-forest">
                  <Gift className="w-5 h-5 text-earth-terracotta" />
                  <h3 className="text-lg font-serif font-bold text-botanical-deep">
                    {t.gift.physicalGift}
                  </h3>
                </div>
                <p className="text-xs text-botanical-deep/75 leading-relaxed bg-kraft-bg p-3 rounded-xl border border-kraft-border/60">
                  {postalAddress}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(postalAddress, "address")}
                className="w-full py-2.5 rounded-xl bg-kraft-bg hover:bg-kraft-card border border-kraft-border text-botanical-deep text-xs font-mono font-semibold transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-4 h-4 text-botanical-forest" />
                    <span>{t.gift.copied}</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 text-earth-terracotta" />
                    <span>{t.gift.copyAddress}</span>
                  </>
                )}
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* QRIS MODAL */}
      {showQrisModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-botanical-deep/90 backdrop-blur-xs p-4 animate-in fade-in"
          onClick={() => setShowQrisModal(false)}
        >
          <div
            className="relative bg-kraft-card rounded-2xl border-2 border-kraft-border p-6 max-w-sm w-full text-center space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQrisModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-kraft-bg text-botanical-deep hover:bg-kraft-border cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[10px] font-mono tracking-widest text-earth-terracotta uppercase font-bold block">
                QRIS CODE
              </span>
              <h4 className="font-serif font-bold text-xl text-botanical-deep">
                Aruna & Danendra
              </h4>
              <p className="text-xs font-mono text-botanical-deep/60">
                NMID: ID1020261024001
              </p>
            </div>

            {/* Generated clean SVG QRIS representation */}
            <div className="bg-white p-4 rounded-xl border border-kraft-border inline-block shadow-inner">
              <svg viewBox="0 0 100 100" className="w-48 h-48 mx-auto">
                <rect x="5" y="5" width="26" height="26" fill="#1F2E22" rx="3" />
                <rect x="9" y="9" width="18" height="18" fill="#FFFFFF" rx="2" />
                <rect x="13" y="13" width="10" height="10" fill="#1F2E22" rx="1" />

                <rect x="69" y="5" width="26" height="26" fill="#1F2E22" rx="3" />
                <rect x="73" y="9" width="18" height="18" fill="#FFFFFF" rx="2" />
                <rect x="77" y="13" width="10" height="10" fill="#1F2E22" rx="1" />

                <rect x="5" y="69" width="26" height="26" fill="#1F2E22" rx="3" />
                <rect x="9" y="73" width="18" height="18" fill="#FFFFFF" rx="2" />
                <rect x="13" y="77" width="10" height="10" fill="#1F2E22" rx="1" />

                <rect x="36" y="8" width="8" height="6" fill="#364E3D" />
                <rect x="48" y="12" width="6" height="8" fill="#C86D51" />
                <rect x="36" y="22" width="12" height="6" fill="#1F2E22" />
                <rect x="12" y="38" width="10" height="8" fill="#1F2E22" />
                <rect x="28" y="38" width="14" height="14" fill="#364E3D" />
                <rect x="46" y="36" width="10" height="10" fill="#C86D51" />
                <rect x="60" y="38" width="8" height="12" fill="#1F2E22" />
                <rect x="74" y="38" width="16" height="6" fill="#364E3D" />
                <rect x="38" y="54" width="8" height="14" fill="#1F2E22" />
                <rect x="52" y="52" width="16" height="8" fill="#C86D51" />
                <rect x="72" y="50" width="12" height="16" fill="#364E3D" />
                <rect x="38" y="74" width="14" height="8" fill="#1F2E22" />
                <rect x="56" y="72" width="8" height="16" fill="#C86D51" />
                <rect x="70" y="74" width="18" height="14" fill="#1F2E22" />
              </svg>
            </div>

            <p className="text-[10px] font-mono text-botanical-deep/60">
              Pindai kode QRIS menggunakan aplikasi e-wallet atau mobile banking favorit Anda.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
