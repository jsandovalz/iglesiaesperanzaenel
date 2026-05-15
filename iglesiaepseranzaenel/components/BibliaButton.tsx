"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const BOOKS = [
  "Genesis", "Exodo", "Levitico", "Numeros", "Deuteronomio",
  "Josue", "Jueces", "Rut", "1 Samuel", "2 Samuel",
  "1 Reyes", "2 Reyes", "1 Cronicas", "2 Cronicas",
  "Esdras", "Nehemias", "Ester", "Job", "Salmos",
  "Proverbios", "Eclesiastes", "Cantares", "Isaias",
  "Jeremias", "Lamentaciones", "Ezequiel", "Daniel",
  "Oseas", "Joel", "Amos", "Abdias", "Jonas",
  "Miqueas", "Nahum", "Habacuc", "Sofonias",
  "Hageo", "Zacarias", "Malaquias",
  "Mateo", "Marcos", "Lucas", "Juan",
  "Hechos", "Romanos", "1 Corintios", "2 Corintios",
  "Galatas", "Efesios", "Filipenses", "Colosenses",
  "1 Tesalonicenses", "2 Tesalonicenses",
  "1 Timoteo", "2 Timoteo", "Tito", "Filemon",
  "Hebreos", "Santiago", "1 Pedro", "2 Pedro",
  "1 Juan", "2 Juan", "3 Juan", "Judas",
  "Apocalipsis"
];

const BOOK_ALIASES: Record<string, string> = {
  gn: "Genesis",
  ex: "Exodo",
  lv: "Levitico",
  nm: "Numeros",
  dt: "Deuteronomio",
  sal: "Salmos",
  pr: "Proverbios",
  ec: "Eclesiastes",
  cnt: "Cantares",
  is: "Isaias",
  jr: "Jeremias",
  mt: "Mateo",
  mr: "Marcos",
  lc: "Lucas",
  jn: "Juan",
  hch: "Hechos",
  rom: "Romanos",
  ap: "Apocalipsis"
};

function normalize(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/gi, "n")
    .toLowerCase()
    .trim();
}

function resolveBookName(input: string) {
  const n = normalize(input);

  if (BOOK_ALIASES[n]) return BOOK_ALIASES[n];

  const exact = BOOKS.find(b => normalize(b) === n);
  if (exact) return exact;

  const partial = BOOKS.find(b => normalize(b).startsWith(n));
  if (partial) return partial;

  return input;
}

export default function BibliaButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() !== "") {
      const libro = resolveBookName(query);
      window.location.href = `/biblia?query=${encodeURIComponent(libro)}`;
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
            onChange={(e) => {
              const value = e.target.value;
              setQuery(value);

              const n = normalize(value);

              if (n.length === 0) {
                setSuggestions([]);
                return;
              }

              const filtered = BOOKS.filter(b =>
                normalize(b).startsWith(n)
              );

              setSuggestions(filtered.slice(0, 6));
            }}
            onKeyDown={handleKeyDown}
            placeholder='Ej: "Juan 3:16", "Genesis 1", "amor"'
            className="w-full border rounded px-3 py-2 mb-2"
          />

          {/* SUGERENCIAS */}
          {suggestions.length > 0 && (
            <div className="border rounded bg-white shadow mb-2">
              {suggestions.map((s) => (
                <div
                  key={s}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setQuery(s);
                    setSuggestions([]);
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              ✖
            </button>

            <Link
              href={`/biblia?query=${encodeURIComponent(resolveBookName(query))}`}
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
