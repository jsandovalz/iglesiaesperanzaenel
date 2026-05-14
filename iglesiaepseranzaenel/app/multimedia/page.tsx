import HeroLive from "@/components/HeroLive";
import Live from "@/components/Live";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/lib/api";
import { groupByTipo } from "@/lib/utils";

export const dynamic = "force-dynamic";
export default async function Multimedia() {
  const strapiData = await getData('multimedias?populate=*&sort=Fecha:asc');
  const grupos = groupByTipo(strapiData);
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      {/* Encabezado */}
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Multimedia
        </h1>
        <p className="text-lg text-gray-600">
          Accede a nuestras prédicas pasadas y acompáñanos en las transmisiones en vivo cada semana.
        </p>
      </header>

      {/* Archivo de Prédicas */}
      <div>
        {Object.entries(grupos).map(([tipo, items]) => (
        <div key={tipo} className="space-y-6">
          <h3 className="text-2xl font-semibold mb-4">{tipo}</h3>

          <div className="overflow-x-auto whitespace-nowrap py-4">
            <div className="flex gap-6">
              <Live multi={items} />
            </div>
          </div>
        </div>
      ))}
      </div>

      <Separator className="my-12" />

      {/* Transmisiones en Vivo */}
      <HeroLive/>
    </section>
  );
}