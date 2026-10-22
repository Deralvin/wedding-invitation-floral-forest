"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  variant?: "up" | "left" | "right" | "scale";
  delay?: number; // milliseconds
  threshold?: number;
}

export function RevealOnScroll({
  children,
  className = "",
  variant = "up",
  delay = 0,
  threshold = 0.12,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const variantClass =
    variant === "left"
      ? "reveal-init-left"
      : variant === "right"
      ? "reveal-init-right"
      : variant === "scale"
      ? "reveal-init-scale"
      : "reveal-init";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
      className={`${variantClass} ${isVisible ? "reveal-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
