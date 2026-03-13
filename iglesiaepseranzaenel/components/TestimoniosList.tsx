"use client";
import { useState, useEffect } from "react";
import InfoCard from "@/components/InfoCard";
import { parseRichText } from "@/lib/utils";
import { getDataWithPagination } from "@/lib/api";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function TestimoniosList() {
  const [testimonios, setTestimonios] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  async function fetchTestimonios(p: number) {
    const res = await getDataWithPagination(`interaccions?filters[Estado][$eq]=Aprobado&filters[Tipo][$eq]=Testimonio&sort=publishedAt:desc&pagination[page]=${p}&pagination[pageSize]=5`);
    setTestimonios(res.data);
    setPageCount(res.meta.pagination.pageCount);
  }

  useEffect(() => {
    fetchTestimonios(page);
  }, [page]);

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonios.map((t, i) => (
          <InfoCard
            key={i}
            title={t.Nombre}
            content={parseRichText(t.Descripcion)}
          />
        ))}
      </div>

      {/* Controles de paginación */}
      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronLeftIcon className="w-5 h-5" />
            <span>Anterior</span>
          </button>

          <span className="text-gray-700 font-medium">
            Página {page} de {pageCount}
          </span>

          <button
            disabled={page === pageCount}
            onClick={() => setPage(page + 1)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <span>Siguiente</span>
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      )}

    </div>
  );
}