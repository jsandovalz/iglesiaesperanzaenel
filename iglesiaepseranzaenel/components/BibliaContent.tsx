"Génesiuse client";

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
  const [suggestions, setSuggestions] = useState<string[]>([]);


  const [biblia, setBiblia] = useState<{ verses: Verso[] } | null>(null);

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

  // Abreviaturas
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


  useEffect(() => {
    fetch("/rv_1909.json")
      .then(res => res.json())
      .then(data => setBiblia(data));
  }, []);

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

    // 1. Coincidencia exacta
    const exact = BOOKS.find(b => normalize(b) === n);
    if (exact) return exact;

    // 2. Coincidencia parcial
    const partial = BOOKS.find(b => normalize(b).startsWith(n));
    if (partial) return partial;

    return input;
  }

  const runSearch = (q: string) => {
    if (!biblia) return [];
    let encontrados: Verso[] = [];

    // Regex mejorado para libros con números
    const refRegex = /^([\wáéíóúñ\s]+)\s+(\d+):(\d+)(?:-(\d+))?$/i;
    const match = q.match(refRegex);

    if (match) {
      const [, libroRaw, capitulo, inicio, fin] = match;
      const libro = resolveBookName(libroRaw);
      const cap = Number(capitulo);
      const start = Number(inicio);
      const end = fin ? Number(fin) : start;

      encontrados = biblia.verses.filter(
        (v: Verso) =>
          normalize(v.book_name) === normalize(libro) &&
          v.chapter === cap &&
          v.verse >= start &&
          v.verse <= end
      );
    } else {
      const chapterRegex = /^([\wáéíóúñ\s]+)\s+(\d+):?$/i;
      const matchChapter = q.match(chapterRegex);

      if (matchChapter) {
        const [, libroRaw, capitulo] = matchChapter;
        const libro = resolveBookName(libroRaw);
        const cap = Number(capitulo);

        encontrados = biblia.verses.filter(
          (v: Verso) =>
            normalize(v.book_name) === normalize(libro) &&
            v.chapter === cap
        );
      } else {
        const keyword = normalize(q);
        setKeyword(keyword);

        encontrados = biblia.verses.filter((v: Verso) =>
          normalize(v.text).includes(keyword)
        );
      }
    }

    return encontrados;
  };



  useEffect(() => {
    const q = searchParams.get("query");
    if (q && biblia) {
      setQuery(q);
      const resp = runSearch(q);
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
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);

            const n = normalize(value);

            if (n.length === 0) {
              setSuggestions([]);
              return;
            }

            // sugerencias por coincidencia parcial
            const filtered = BOOKS.filter(b =>
              normalize(b).startsWith(n)
            );

            setSuggestions(filtered.slice(0, 5)); // máximo 5 sugerencias
          }}
          placeholder='Ejemplo: "Juan 3:16 o Juan 3:16-20" o "amor"'
          className="flex-1 p-3 rounded border"
        />
        {suggestions.length > 0 && (
          <div className="bg-white border rounded shadow p-2 max-w-md mx-auto">
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