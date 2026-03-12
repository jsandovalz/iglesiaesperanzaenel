import EventsList from "@/components/EventsList";
import HeroSlider from "@/components/HeroSlider";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/lib/api";
import { getSlidesByPage } from "@/utils/slides";

export default async function Eventos() {
  const data = await getData('inicios?populate[Imagenes][populate]=src');
  const slides = getSlidesByPage(data, "Eventos");

  return (
    <>
      {/* Hero reutilizado */}
      <HeroSlider slides={slides ?? []} autoPlay interval={5000} />

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Encabezado */}
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Eventos
          </h1>
          <p className="text-lg text-gray-600">
            Descubre nuestros próximos encuentros y actividades especiales.
          </p>
        </header>

        <Separator className="my-12" />

        {/* Próximos eventos */}
        <div id="proximos">
          <h2 className="text-3xl font-semibold mb-8 text-center">Próximos eventos</h2>
          <EventsList/>
        </div>
      </section>
    </>
  );
}