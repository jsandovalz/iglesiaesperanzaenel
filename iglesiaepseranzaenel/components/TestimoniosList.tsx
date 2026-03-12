"use client";
import { useState, useEffect } from "react";
import InfoCard from "@/components/InfoCard";
import { parseRichText } from "@/lib/utils";
import { getDataWithPagination } from "@/lib/api";

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
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>Página {page} de {pageCount}</span>
        <button
          disabled={page === pageCount}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}