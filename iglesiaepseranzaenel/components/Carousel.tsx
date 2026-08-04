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
      </div>

      {/* Modal fullscreen mejorado */}
      {showModal && selectedItem && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={() => setShowModal(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full p-4">
            {/* Botón de cierre */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
            >
              ✕
            </button>

            {/* Navegación dentro del modal */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60"
            >
              ›
            </button>

            {/* Contenido */}
            <div className="w-full h-full flex items-center justify-center">
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
        </div>
      )}
    </>
  );
}
