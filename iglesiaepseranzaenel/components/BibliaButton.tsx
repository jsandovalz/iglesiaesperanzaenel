"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function BibliaButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

 // Cuando se abre el tooltip: limpiar y enfocar
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() !== "") {
      window.location.href = `/biblia?query=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className="fixed bottom-6 right-6">
      <button
        onClick={() => setOpen(!open)}
        className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition"
      >
        📖 Biblia
      </button>

      {open && (
        <div className="absolute bottom-16 right-0 bg-white border rounded-lg shadow-lg p-3 w-72">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Ej: "Juan 3, Juan 3:16" o "amor"'
            className="w-full border rounded px-3 py-2 mb-2"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              ✖
            </button>
            <Link
              href={`/biblia?query=${encodeURIComponent(query)}`}
              className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              onClick={() => setOpen(false)}
            >
              Buscar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}