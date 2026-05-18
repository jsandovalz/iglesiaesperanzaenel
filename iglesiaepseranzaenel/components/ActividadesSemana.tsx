import React from "react";
import { getActividades } from "@/lib/api";


export default async function ActividadesSemana() {
  console.log("calling actividades...");
  const data = await getActividades();
  console.log("actividades...",data);

  if (!data) {
    return (
      <section className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Actividades la Semana</h2>
        <p className="text-gray-500">No hay actividades registradas.</p>
      </section>
    );
  }

  const actividades = data.actividades || [];

  return (
    <section className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">
        {data.titulo || "Actividades de Semana"}
      </h2>

      <div className="space-y-4">
        {actividades.map((act: any, i: number) => (
          <div
            key={i}
            className="p-4 bg-gray-100 rounded shadow-sm border border-gray-200"
          >
            <p className="text-indigo-700 font-bold text-lg">{act.fecha}</p>
            <p className="text-gray-900 font-semibold">{act.titulo}</p>
            <p className="text-gray-600">{act.hora}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
