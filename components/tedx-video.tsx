"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export function TedxVideo() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="video-frame">
        <iframe
          src="https://www.youtube-nocookie.com/embed/6ffnZ5jkCOM?autoplay=1&rel=0"
          title="Balancing ambition and skepticism in AI: Marc Paul at TEDxValletta"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      className="video-poster"
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Play Marc Paul's TEDxValletta talk"
    >
      <Image
        src="/images/marc-paul-tedx-wide.jpg"
        alt="Marc Paul standing at a distance on the TEDxValletta stage"
        fill
        sizes="(max-width: 920px) 100vw, 58vw"
      />
      <span className="video-scrim" />
      <span className="play-button" aria-hidden="true">
        <Play fill="currentColor" size={22} />
      </span>
      <span className="video-label">Watch the talk · 12 min</span>
    </button>
  );
}
