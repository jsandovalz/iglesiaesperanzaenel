import React from "react";

async function getActividades() {
const API_URL = process.env.API_URL || "https://steadfast-triumph-c0193f1fb8.strapiapp.com";
  try {

    const res = await fetch(
      `${API_URL}/api/actividades-semana?populate=*`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data?.data?.attributes || null;
  } catch (error) {
    console.error("Error cargando actividades:", error);
    return null;
  }
}

export default async function ActividadesSemana() {
  const data = await getActividades();

  if (!data) {
    return (
      <section className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Actividades de la Semana</h2>
        <p className="text-gray-500">No hay actividades registradas.</p>
      </section>
    );
  }

  const actividades = data.actividades || [];

  return (
    <section className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">
        {data.titulo || "Actividades de la Semana"}
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
