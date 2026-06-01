"use client";
import { useState } from "react";
import Image from "next/image";

interface MediaItem {
  url: string;
  alternativeText?: string;
}

export default function Carousel({ items }: { items: MediaItem[] }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % items.length);
  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);

  const isVideo = (url: string) => url.endsWith(".mp4") || url.includes("video");

  return (
    <div className="relative w-full h-[350px] overflow-hidden rounded-xl shadow-lg">
      {items.map((item, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {isVideo(item.url) ? (
            <video
              src={item.url}
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
            />
          ) : (
            <Image
              src={item.url}
              alt={item.alternativeText || ""}
              fill
              className="object-cover"
            />
          )}
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
      >
        ›
      </button>
    </div>
  );
}
