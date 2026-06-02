import HeroSlider from "@/components/HeroSlider";
import Carousel from "@/components/Carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getData, getURL } from "@/lib/api";
import EventsList from "@/components/EventsList";
import { getSlidesByPage } from "@/utils/slides";
import { marked } from "marked";

export const dynamic = "force-dynamic";

type VideoType = {
  url: string;
  alternativeText?: string;
};

interface MediaItem {
  url: string;
  alternativeText?: string;
}


export default async function Legendarios() {
  const data = await getData('inicios?populate[Imagenes][populate]=src');
  const slides = getSlidesByPage(data, "Legendarios");

  const dataLegendario = await getData(
    "legendario?populate[actividades][populate]=*"
  );
  console.log("dataLegendario=",dataLegendario);
  const actividades = dataLegendario?.actividades ?? [];
  const actividad = actividades[0]; 
  const url = getURL();
  const videos = actividad?.video ?? [];
  const imagenes = actividad?.foto ?? [];
  const info = actividad?.rpm ?? "";
  const rpmHTML = marked(info);

  return (
    <>
      {/* Hero */}
      <HeroSlider slides={slides} autoPlay interval={5000} />

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        
        {/* Información */}
        {info && (
          <div>
            <h2 className="text-3xl font-semibold mb-8 text-center">Información</h2>
            <Card>
              <CardContent className="prose prose-indigo max-w-none p-6">
                <div dangerouslySetInnerHTML={{ __html: rpmHTML }} />
              </CardContent>
            </Card>
          </div>
        )}

        <Separator />

        {/* Eventos */}
        <div>
          <h2 className="text-3xl font-semibold mb-8 text-center">Eventos</h2>
          <EventsList categoria="Legendarios" />
        </div>

        <Separator />

         {/* Videos */}
        {videos.length > 0 && (
          <div>
            <h2 className="text-3xl font-semibold mb-8 text-center">Videos</h2>
            <Carousel items={videos.map((v: VideoType) => ({
              url: url + v.url,
              alternativeText: v.alternativeText
            }))} />

          </div>
        )}

        <Separator />

        {/* Imágenes */}
        {imagenes.length > 0 && (
          <div>
            <h2 className="text-3xl font-semibold mb-8 text-center">Galería</h2>
            <Carousel items={imagenes.map((img: MediaItem) => ({
              url: url + img.url,
              alternativeText: img.alternativeText
            }))} />
          </div>
        )}

        <Separator />
      </section>
    </>
  );
}
