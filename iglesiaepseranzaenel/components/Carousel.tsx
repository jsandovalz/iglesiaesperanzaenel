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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const next = () => setCurrent((c) => (c + 1) % items.length);
  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);

  const isVideo = (url: string) => url.endsWith(".mp4") || url.includes("video");

  return (
    <>
      {/* Carrusel principal */}
      <div className="relative w-full h-[60vh] overflow-hidden rounded-xl shadow-lg">
        {/* Renderiza solo el slide actual */}
        <div
          key={current}
          className="absolute inset-0 transition-opacity duration-700 cursor-pointer"
          onClick={() => {
            setSelectedIndex(current);
            setShowModal(true);
          }}
        >
          {isVideo(items[current].url) ? (
            <video
              src={items[current].url}
              autoPlay
              loop
              muted
              playsInline
              className="object-contain w-full h-full bg-black"
            />
          ) : (
            <Image
              src={items[current].url}
              alt={items[current].alternativeText || ""}
              fill
              className="object-contain bg-black"
              sizes="100vw"
            />
          )}
        </div>

        {/* Botones navegación */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
        >
          ›
        </button>

        {/* Dots indicadores */}
        <div className="absolute bottom-4 w-full flex justify-center space-x-3">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === current
                  ? "bg-indigo-600 scale-110"
                  : "bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal fullscreen */}
      {showModal && selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div className="relative w-screen h-screen flex items-center justify-center">
            {/* Botón de cierre */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 z-50"
            >
              ✕
            </button>

            {/* Navegación dentro del modal */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/40 text-white p-4 rounded-full hover:bg-black/60 z-50"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((selectedIndex + 1) % items.length);
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/40 text-white p-4 rounded-full hover:bg-black/60 z-50"
            >
              ›
            </button>

            {/* Contenido */}
            <div className="w-full h-full flex items-center justify-center p-4">
              {isVideo(items[selectedIndex].url) ? (
                <video
                  src={items[selectedIndex].url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={items[selectedIndex].url}
                  alt={items[selectedIndex].alternativeText || ""}
                  fill
                  className="object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}