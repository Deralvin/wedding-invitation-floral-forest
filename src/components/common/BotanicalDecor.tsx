import React from "react";

export function FernLeaf({ className = "w-12 h-12 text-botanical-sage" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M50 110 C50 70, 50 30, 50 10" strokeWidth="3" />
      <path d="M50 90 Q30 85 20 75 Q35 70 50 80" fill="currentColor" fillOpacity="0.25" />
      <path d="M50 90 Q70 85 80 75 Q65 70 50 80" fill="currentColor" fillOpacity="0.25" />
      <path d="M50 70 Q25 65 15 52 Q32 50 50 60" fill="currentColor" fillOpacity="0.3" />
      <path d="M50 70 Q75 65 85 52 Q68 50 50 60" fill="currentColor" fillOpacity="0.3" />
      <path d="M50 50 Q28 42 22 30 Q38 32 50 40" fill="currentColor" fillOpacity="0.35" />
      <path d="M50 50 Q72 42 78 30 Q62 32 50 40" fill="currentColor" fillOpacity="0.35" />
      <path d="M50 30 Q35 22 30 14 Q42 16 50 22" fill="currentColor" fillOpacity="0.4" />
      <path d="M50 30 Q65 22 70 14 Q58 16 50 22" fill="currentColor" fillOpacity="0.4" />
      <path d="M50 15 Q46 6 50 2 Q54 6 50 15" fill="currentColor" fillOpacity="0.45" />
    </svg>
  );
}

export function EucalyptusBranch({ className = "w-10 h-10 text-botanical-forest" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 140"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
    >
      <path d="M40 135 C38 90, 42 50, 40 10" strokeWidth="2.5" />
      {/* Pairs of round eucalyptus leaves */}
      <ellipse cx="24" cy="115" rx="14" ry="10" transform="rotate(-20 24 115)" fill="currentColor" fillOpacity="0.22" />
      <ellipse cx="56" cy="108" rx="14" ry="10" transform="rotate(20 56 108)" fill="currentColor" fillOpacity="0.22" />
      <ellipse cx="22" cy="85" rx="13" ry="9" transform="rotate(-15 22 85)" fill="currentColor" fillOpacity="0.25" />
      <ellipse cx="58" cy="78" rx="13" ry="9" transform="rotate(18 58 78)" fill="currentColor" fillOpacity="0.25" />
      <ellipse cx="26" cy="55" rx="11" ry="8" transform="rotate(-10 26 55)" fill="currentColor" fillOpacity="0.3" />
      <ellipse cx="54" cy="50" rx="11" ry="8" transform="rotate(15 54 50)" fill="currentColor" fillOpacity="0.3" />
      <ellipse cx="30" cy="28" rx="9" ry="6.5" transform="rotate(-8 30 28)" fill="currentColor" fillOpacity="0.35" />
      <ellipse cx="50" cy="24" rx="9" ry="6.5" transform="rotate(10 50 24)" fill="currentColor" fillOpacity="0.35" />
      <circle cx="40" cy="10" r="5" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}

export function VintageStampSeal({ className = "w-20 h-20 text-earth-terracotta" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center font-mono font-bold text-center select-none ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-current">
        <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" fill="none" opacity="0.8" />
        <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
        <path
          id="seal-curve"
          d="M 20,50 A 30,30 0 1,1 80,50"
          fill="none"
        />
        <text fontSize="7.5" fill="currentColor" letterSpacing="0.18em" fontWeight="bold">
          <textPath href="#seal-curve" startOffset="50%" textAnchor="middle">
            BOTANICAL AIRWAYS
          </textPath>
        </text>
        <path
          id="seal-curve-bot"
          d="M 80,50 A 30,30 0 1,1 20,50"
          fill="none"
        />
        <text fontSize="7" fill="currentColor" letterSpacing="0.18em" fontWeight="bold">
          <textPath href="#seal-curve-bot" startOffset="50%" textAnchor="middle">
            ADMIT ONE // 2026
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[10px] tracking-widest uppercase font-serif text-current opacity-90">PASSED</span>
        <span className="text-[9px] font-mono tracking-tighter opacity-75">24.10.26</span>
      </div>
    </div>
  );
}

export function BarcodeVisual({ className = "h-12 w-48 text-botanical-deep" }: { className?: string }) {
  return (
    <div className={`flex items-stretch justify-between gap-[2px] opacity-75 ${className}`}>
      {[3, 1, 4, 1, 2, 5, 2, 1, 3, 4, 1, 2, 4, 1, 3, 2, 5, 1, 2, 3, 1, 4, 2, 1, 3, 2, 4].map((width, idx) => (
        <span
          key={idx}
          className="bg-current rounded-xs h-full"
          style={{ width: `${width * 2}px` }}
        />
      ))}
    </div>
  );
}
