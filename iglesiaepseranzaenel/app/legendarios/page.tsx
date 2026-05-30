import HeroSlider from "@/components/HeroSlider";
import Carousel from "@/components/Carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/lib/api";
import EventsList from "@/components/EventsList";
import { getSlidesByPage } from "@/utils/slides";

export const dynamic = "force-dynamic";

export default async function Legendarios() {
  const data = await getData('inicios?populate[Imagenes][populate]=src');
  const slides = getSlidesByPage(data, "Legendarios");

  const dataLegendario = await getData(
    "legendario?populate[actividades][populate]=*"
  );

  const videos = dataLegendario?.video ?? [];
  const imagenes = dataLegendario?.foto ?? [];
  const info = dataLegendario?.rpm?.content ?? "";

  return (
    <>
      {/* Hero */}
      <HeroSlider slides={slides} autoPlay interval={5000} />

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        
        {/* Videos */}
        {videos.length > 0 && (
          <div>
            <h2 className="text-3xl font-semibold mb-8 text-center">Videos</h2>
            <Carousel items={videos.map(v => v.src)} />
          </div>
        )}

        <Separator />

        {/* Imágenes */}
        {imagenes.length > 0 && (
          <div>
            <h2 className="text-3xl font-semibold mb-8 text-center">Galería</h2>
            <Carousel items={imagenes.map(img => img.src)} />
          </div>
        )}

        <Separator />

        {/* Información */}
        {info && (
          <div>
            <h2 className="text-3xl font-semibold mb-8 text-center">Información</h2>
            <Card>
              <CardContent className="prose max-w-none p-6">
                <div dangerouslySetInnerHTML={{ __html: info }} />
              </CardContent>
            </Card>
          </div>
        )}

        <Separator />

        {/* Eventos */}
        <div>
          <h2 className="text-3xl font-semibold mb-8 text-center">Eventos</h2>
          <EventsList/>
        </div>
      </section>
    </>
  );
}
