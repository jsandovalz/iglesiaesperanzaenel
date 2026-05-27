import { getActividades } from "@/lib/api";


export default async function ActividadesSemana() {
  const data = await getActividades();

  if (!data || !data.actividades?.length) {
    return (
      <section className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">
          Actividades de la Semana
        </h2>
        <p className="text-gray-500 text-center">No hay actividades registradas.</p>
      </section>
    );
  }
  
  const actividadesOrdenadas = data.actividades.sort((a: any, b: any) => {
    const fechaA = new Date(a.fecha + " " + a.hora);
    const fechaB = new Date(b.fecha + " " + b.hora);
    return fechaA.getTime() - fechaB.getTime();
  });

  return (
    <section className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">
        {data.titulo || "Actividades de la Semana"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actividadesOrdenadas.map((act: any, i: number) => {
          const fecha = new Date(act.fecha);
          const dia = fecha.getDate();
          const mes = fecha.toLocaleString("es-ES", { month: "long" }).toUpperCase();

          const icon = act.icono?.data?.attributes;

          return (
            <div
              key={i}
              className="bg-indigo-50 border border-indigo-200 rounded-xl shadow-md p-5 flex flex-col items-center text-center"
            >
              {/* Ícono por actividad */}
              {icon && (
                <img
                  src={icon.url}
                  alt={icon.alternativeText || act.titulo}
                  className="w-16 h-16 object-contain mb-4"
                />
              )}

              {/* Fecha estilo afiche */}
              <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg mb-4">
                <p className="text-2xl font-extrabold leading-none">{dia}</p>
                <p className="text-sm font-semibold -mt-1">{mes}</p>
              </div>

              {/* Título */}
              <p className="text-lg font-bold text-gray-900 mb-2">{act.titulo}</p>

              {/* Hora */}
              <p className="text-gray-700 font-medium flex items-center gap-2">
                <span className="text-indigo-600 text-xl">🕒</span>
                {act.hora}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
