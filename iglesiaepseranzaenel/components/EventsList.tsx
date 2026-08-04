"use client";
import { useState, useEffect } from 'react';
import InfoCard from "@/components/InfoCard";
import { formatDate, parseRichText, sortByDateOnly } from "@/lib/utils";
import { getDataWithPagination, getURL } from "@/lib/api";

interface EventsListProps {
  categoria?: string; // puede ser "Legendarios" o "Legendarios, Juvenil"
}

export default function EventsList({ categoria = "" }: EventsListProps) {
  const [eventos, setEventos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const url = getURL();

  async function fetchEventos(p: number) {
    let query = `events?populate=Imagen&sort=Fecha_Inicio:asc&pagination[page]=${p}&pagination[pageSize]=5`;

    // Si viene categoría(s)
    if (categoria.trim() !== "") {
      const categoriasArray = categoria
        .split(",")
        .map(c => c.trim())
        .filter(c => c.length > 0);

      // Convertir array → Legendarios,Juvenil
      const categoriasQuery = categoriasArray.join(",");

      query += `&filters[categoria][nombre][$in]=${categoriasQuery}`;
    }

    const res = await getDataWithPagination(query);

    const eventosSort = sortByDateOnly(res.data, "Fecha_Inicio", "asc");
    setEventos(eventosSort);
    setPageCount(res.meta.pagination.pageCount);
  }

  useEffect(() => {
    fetchEventos(page);
  }, [page, categoria]);

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8">
        {eventos.map((t, i) => (
          <InfoCard
            key={i}
            fechaInicio={formatDate(t.Fecha_Inicio)}
            fechaFinal={formatDate(t.Fecha_Final)}
            subtitle={t.Ubicacion}
            content={parseRichText(t.Descripcion)}
            title={t.Title}
            imageUrl={t.Imagen?.url? url + t.Imagen?.url:""}
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
