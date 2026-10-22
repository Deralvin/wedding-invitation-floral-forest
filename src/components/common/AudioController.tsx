"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Disc } from "lucide-react";

interface AudioControllerProps {
  autoPlayTrigger: boolean;
}

export function AudioController({ autoPlayTrigger }: AudioControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay notice, user can click disc button to play:", err);
        });
    }
  }, [autoPlayTrigger, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio play error:", err);
        });
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/audio/wedding-song.mp3" type="audio/mpeg" />
        <source src="/audio/wedding-song.m4a" type="audio/mp4" />
        <source src="/audio/wedding-song.ogg" type="audio/ogg" />
      </audio>

      {/* Floating Audio Button */}
      <button
        onClick={togglePlay}
        type="button"
        className="fixed bottom-5 right-5 z-40 p-3 rounded-full bg-kraft-card/90 backdrop-blur-md border border-kraft-border text-botanical-deep shadow-lg hover:bg-kraft-card hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
        aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
        title={isPlaying ? "Jeda Musik" : "Putar Musik"}
      >
        <Disc className={`w-4 h-4 text-earth-terracotta ${isPlaying ? "animate-spin" : ""}`} />
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-botanical-forest" />
        ) : (
          <VolumeX className="w-4 h-4 text-botanical-deep/50" />
        )}
      </button>
    </>
  );
}
