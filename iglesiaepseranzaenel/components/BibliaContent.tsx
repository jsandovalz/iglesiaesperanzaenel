"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Verso {
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

function resaltar(texto: string, keyword: string) {
  if (!keyword) return texto;
  const regex = new RegExp(`(${keyword})`, "gi");
  return texto.replace(regex, "<strong>$1</strong>");
}

export default function BibliaContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Verso[]>([]);
  const [keyword, setKeyword] = useState("");

  const [biblia, setBiblia] = useState<{ verses: Verso[] } | null>(null);

  // Cargar JSON local SOLO para búsqueda por palabra clave
  useEffect(() => {
    fetch("/rv_1858.json")
      .then(res => res.json())
      .then(data => setBiblia(data));
  }, []);

  // ---------------------------
  // function to call internal API
  // ---------------------------
  const buscarReferencia = async (q: string) => {
    const res = await fetch(`/api/biblia?query=${encodeURIComponent(q)}`);
    const data = await res.json();

    if (!data.verses) return [];

    return data.verses.map((v: any) => ({
      book_name: v.book_name,
      chapter: v.chapter,
      verse: v.verse,
      text: v.text
    }));
  };

  // ---------------------------
  // principal function to search
  // ---------------------------
  const runSearch = async (q: string) => {
    if (!q || q.trim() === "") return [];

    // Caso 1: referencia tipo "Juan 3:16" o "Juan 3:16-20"
    const refRegex = /^([\wáéíóúñ]+)\s+(\d+):(\d+)(?:-(\d+))?$/i;
    if (refRegex.test(q)) {
      return await buscarReferencia(q);
    }

    // Caso 2: capítulo "Juan 3"
    const chapterRegex = /^([\wáéíóúñ]+)\s+(\d+)$/i;
    if (chapterRegex.test(q)) {
      return await buscarReferencia(q);
    }

    // Caso 3: palabra clave (usa JSON local)
    if (!biblia) return [];

    const keywordLower = q.toLowerCase();
    setKeyword(keywordLower);

    return biblia.verses.filter((v: Verso) =>
      v.text.toLowerCase().includes(keywordLower)
    );
  };

  // Ejecutar búsqueda cuando cambia la URL
  useEffect(() => {
    const q = searchParams.get("query");

    if (q) {
      setQuery(q);
      runSearch(q).then(setResults);
    }
  }, [searchParams, biblia]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const resp = await runSearch(query);
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
          placeholder='Ejemplo: "Juan 3:16", "Juan 3", o "amor"'
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
            <div
              key={`${v.book_name}-${v.chapter}-${v.verse}`}
              className="p-4 bg-gray-100 rounded shadow"
            >
              <p className="text-gray-700 font-bold">
                {v.book_name} {v.chapter}:{v.verse}
              </p>
              <p
                dangerouslySetInnerHTML={{ __html: resaltar(v.text, keyword) }}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No se encontraron resultados</p>
        )}
      </div>
    </section>
  );
}
