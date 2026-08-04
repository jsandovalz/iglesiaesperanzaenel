"use client";
import { useState } from "react";
import Image from "next/image";

interface MediaItem {
  url: string;
  alternativeText?: string;
}

export default function Carousel({ items }: { items: MediaItem[] }) {
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const next = () => setCurrent((c) => (c + 1) % items.length);
  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);

  const isVideo = (url: string) => url.endsWith(".mp4") || url.includes("video");

  return (
    <>
      {/* Carrusel */}
      <div className="relative w-full h-[350px] overflow-hidden rounded-xl shadow-lg">
        {items.map((item, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 cursor-pointer ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => {
              setSelectedItem(item);
              setShowModal(true);
            }}
          >
            {isVideo(item.url) ? (
              <video
                src={item.url}
                autoPlay
                loop
                muted
                playsInline
                className="object-contain w-full h-full bg-black"
              />
            ) : (
              <Image
                src={item.url}
                alt={item.alternativeText || ""}
                fill
                className="object-contain bg-black"
                sizes="100vw"
              />
            )}
          </div>
        ))}

        {/* Botones navegación */}
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

      {/* Modal fullscreen */}
      {showModal && selectedItem && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div className="relative w-[90vw] h-[90vh]">
            {isVideo(selectedItem.url) ? (
              <video
                src={selectedItem.url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              <Image
                src={selectedItem.url}
                alt={selectedItem.alternativeText || ""}
                fill
                className="object-contain"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
