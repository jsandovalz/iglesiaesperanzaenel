import HeroLive from "@/components/HeroLive";
import Live from "@/components/Live";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/lib/api";


export default async function Multimedia() {
  const strapiData = await getData('multimedias?populate=*&sort=Fecha:asc');
  
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
        <h2 className="text-3xl font-semibold mb-8 text-center">Archivo de Prédicas</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Live multi={strapiData} />
        </div>
      </div>

      <Separator className="my-12" />

      {/* Transmisiones en Vivo */}
      <HeroLive/>
    </section>
  );
}