"use client";
import { useState } from "react";
import Image from "next/image";
import { getURL } from "@/lib/api";

export default function Carousel({ items }: { items: any[] }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % items.length);
  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const url = getURL();
  items.map((item,i)=>console.log("URLIMAGe=",url+item.url));

  return (
    <div className="relative w-full h-[350px] overflow-hidden rounded-xl shadow-lg">
      {items.map((item, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={url+item.url}
            alt={item.alternativeText || ""}
            fill
            className="object-cover"
          />
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
