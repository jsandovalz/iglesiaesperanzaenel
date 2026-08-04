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
      {/* Carrusel principal más grande */}
      <div className="relative w-full h-[60vh] overflow-hidden rounded-xl shadow-lg">
        {items.map((item, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 cursor-pointer ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => {
<<<<<<< HEAD
              setSelectedIndex(i); // guarda índice correcto
=======
              setSelectedItem(item);
              setCurrent(i); // importante: actualiza índice
>>>>>>> 5dc9f33e6762b3c90bb7bf7e668c5abe8d6eef0d
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
<<<<<<< HEAD
      {showModal && selectedIndex !== null && (
=======
      {showModal && selectedItem && (
>>>>>>> 5dc9f33e6762b3c90bb7bf7e668c5abe8d6eef0d
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
<<<<<<< HEAD
              onClick={() =>
                setSelectedIndex(
                  (selectedIndex - 1 + items.length) % items.length
                )
              }
=======
              onClick={prev}
>>>>>>> 5dc9f33e6762b3c90bb7bf7e668c5abe8d6eef0d
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/40 text-white p-4 rounded-full hover:bg-black/60 z-50"
            >
              ‹
            </button>
            <button
<<<<<<< HEAD
              onClick={() =>
                setSelectedIndex((selectedIndex + 1) % items.length)
              }
=======
              onClick={next}
>>>>>>> 5dc9f33e6762b3c90bb7bf7e668c5abe8d6eef0d
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/40 text-white p-4 rounded-full hover:bg-black/60 z-50"
            >
              ›
            </button>

            {/* Contenido */}
            <div className="w-full h-full flex items-center justify-center p-4">
<<<<<<< HEAD
              {isVideo(items[selectedIndex].url) ? (
=======
              {isVideo(selectedItem.url) ? (
>>>>>>> 5dc9f33e6762b3c90bb7bf7e668c5abe8d6eef0d
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
 