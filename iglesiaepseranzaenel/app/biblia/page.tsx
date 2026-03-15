"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
//import biblia from "../data/rv_1858.json"; // archivo local

function resaltar(texto: string, keyword: string) {
  if (!keyword) return texto;
  const regex = new RegExp(`(${keyword})`, "gi");
  return texto.replace(regex, "<strong>$1</strong>");
}

interface Verso {
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}


export default function Biblia() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Verso[]>([]);
  const [keyword, setKeyword] = useState("");
  const [biblia, setBiblia] = useState<{ verses: Verso[] } | null>(null);

  useEffect(() => {
    fetch("/rv_1858.json")
      .then(res => res.json())
      .then(data => setBiblia(data));
  }, []);

  const runSearch = (query: string) => {
    if (!biblia) return [];

    let encontrados: any[] = [];

    // Caso 1: búsqueda por referencia (ej. "Juan 3:16-20")
    const refRegex = /^(\w+)\s+(\d+):(\d+)(?:-(\d+))?$/;
    const match = query.match(refRegex);

    if (match) {
      const [, libro, capitulo, inicio, fin] = match;
      const cap = Number(capitulo);
      const start = Number(inicio);
      const end = fin ? Number(fin) : start;

      encontrados = biblia!.verses.filter(
        (v: Verso) =>
          v.book_name.toLowerCase() === libro.toLowerCase() &&
          v.chapter === cap &&
          v.verse >= start &&
          v.verse <= end
      );
    } else {
      // Caso 3: búsqueda por capítulo (ej. "Juan 3" o "Juan 3:")
      const chapterRegex = /^(\w+)\s+(\d+):?$/;
      const matchChapter = query.match(chapterRegex);

      if (matchChapter) {
        const [, libro, capitulo] = matchChapter;
        const cap = Number(capitulo);

        encontrados = biblia!.verses.filter(
          (v: Verso) =>
            v.book_name.toLowerCase() === libro.toLowerCase() &&
            v.chapter === cap);
      } else {
        // Caso 2: búsqueda por palabra clave
        const keyword = query.toLowerCase();
        setKeyword(keyword);
        encontrados = biblia.verses.filter(v =>
          v.text.toLowerCase().includes(keyword)
        );
      }
    }

    return encontrados;
  };

  useEffect(() => {
    const q = searchParams.get("query");
    if (q && biblia) {
      setQuery(q);
      // aquí llamas a tu función de búsqueda
      const resp=runSearch(q);
      setResults(resp);

    }
  }, [searchParams, biblia]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const resp = runSearch(query);
    setResults(resp);
  };

  
  return (
    <section className="max-w-6xl mx-auto px-6 py-44 space-y-10">
      <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Biblia
          </h1>
      </header>

      <form onSubmit={handleSearch} className="flex gap-4 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Ejemplo: "Juan 3:16 o Juan 3:16-20" o "amor"'
          className="flex-1 p-3 rounded border"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Buscar
        </button>
      </form>

      <div className="space-y-6">
        {results.length > 0 ? (
          results.map((v) => (
            <div key={`${v.book_name}-${v.chapter}-${v.verse}`} className="p-4 bg-gray-100 rounded shadow">
              <p className="text-gray-700 font-bold">
                {v.book_name} {v.chapter}:{v.verse}
              </p>
              <p dangerouslySetInnerHTML={{ __html: resaltar(v.text, keyword) }} />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No se encontraron resultados</p>
        )}
      </div>
    </section>
  );
}
