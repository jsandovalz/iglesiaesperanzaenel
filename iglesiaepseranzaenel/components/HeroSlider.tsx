"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Slide {
  src: string;
  alt: string;
  caption: string;
  buttonText?: string;
  buttonLink?: string;
}

interface HeroSliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number; // tiempo en ms (ej. 5000 = 5s)
}

export default function HeroSlider({
  slides,
  autoPlay = true,
  interval = 5000
}: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const isDev = process.env.NODE_ENV === "development";
  // console.log("Slide:",slides);
  
  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      nextSlide();
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval]);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === current ? "opacity-100" : "opacity-0"
          )}
        >
          {/* {!isDev? ( */}
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover brightness-75"
              priority={index === 0}
            />
           {/* ) : (
            <img
              src={slide.src}
              alt={slide.alt}
              className="absolute inset-0 w-full h-full object-cover"
            ></img>
           )}
           */}
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-up">
              {slide.caption}
            </h1>
            {slide.buttonText && slide.buttonLink && (
              <a
                href={slide.buttonLink}
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition animate-fade-up delay-200"
              >
                {slide.buttonText}
              </a>
            )}
          </div>
        </div>
      ))}

      {/* Controles manuales */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
      >
        ›
      </button>

      {/* Dots indicadores */}
      <div className="absolute bottom-6 w-full flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              "w-3 h-3 rounded-full transition",
              index === current
                ? "bg-indigo-600 scale-110"
                : "bg-white/70 hover:bg-white"
            )}
          />
        ))}
      </div>
    </section>
  );
}