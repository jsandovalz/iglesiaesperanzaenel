import { getActividades } from "@/lib/api";

export default async function ActividadesSemana() {
  const data = await getActividades();

  if (!data || !data.actividades?.length) {
    return (
      <section className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Actividades de la Semana</h2>
        <p className="text-gray-500">No hay actividades registradas.</p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">
        {data.titulo || "Actividades de la Semana"}
      </h2>

      <div className="space-y-4">
        {data.actividades.map((act: any, i: number) => {
          const icon = act.icono?.data?.attributes;

          return (
            <div
              key={i}
              className="flex items-center gap-4 p-4 bg-gray-100 rounded shadow-sm border border-gray-200"
            >
              {icon && (
                <img
                  src={icon.url}
                  alt={icon.alternativeText || act.titulo}
                  className="w-12 h-12 object-contain"
                />
              )}

              <div>
                <p className="text-indigo-700 font-bold text-lg">{act.fecha}</p>
                <p className="text-gray-900 font-semibold">{act.titulo}</p>
                <p className="text-gray-600">{act.hora}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
