import HeroSlider from "@/components/HeroSlider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/lib/api";
import { getSlidesByPage } from "@/utils/slides";
import Image from "next/image";

export const dynamic = "force-dynamic";
export default async function SobreNosotros() {
  const data = await getData('inicios?populate[Imagenes][populate]=src');
  const slides = getSlidesByPage(data, "Sobre Nosotros");

  return (
    <>
      {/* Hero reutilizado */}
      <HeroSlider slides={slides ?? []} autoPlay interval={5000} />

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Historia */}
        <div id="historia">
          <h2 className="text-3xl font-semibold mb-8 text-center">Nuestra Historia</h2>
          <Card>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                Entendemos que, históricamente, las distintas y variadas denominaciones surgieron por fraccionamientos provocadas por el ser humano. 
                Es por eso que, abocados a la Palabra de Dios, encontramos que no existe una denominación más adecuada para todo el Cuerpo de Cristo (la Iglesia) 
                como la de cristianos. (Hch. 11:26) Y se congregaron allí todo un año con la iglesia, y enseñaron a mucha gente; 
                y a los discípulos se les llamó cristianos por primera vez en Antioquía.
              </p>
              <Image
                src="/multimedia/frontis.jpeg"
                alt="Historia de la iglesia"
                width={600}
                height={400}
                className="rounded-lg shadow-md mx-auto"
              />
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        {/* Misión */}
        <div id="mision">
          <h2 className="text-3xl font-semibold mb-8 text-center">Nuestra Misión (Estrategia para cumplir el propósito)</h2>
          <Card>
            <CardContent className="text-gray-700 text-center">
              <p>
               La manera o estrategia a través de la cual cumpliremos nuestra visión, está plasmada en la misión encomendada por Dios 
               a esta parte del cuerpo de Cristo: Construir una comunidad de creyentes mediante la predicación del evangelio, 
               la enseñanza de la Biblia y la preparación para el servicio
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Visión */}
        <div id="vision">
          <h2 className="text-3xl font-semibold mb-8 text-center">Nuestra Visión</h2>
          <Card>
            <CardContent className="text-gray-700 text-center">
              <p>
                Nuestra visión o propósito, proviene del sueño de una vida nueva para todos los que aún no conocen a Jesús como Señor y Salvador:
                Existimos para mostrar que las vidas, familias y comunidades pueden ser transformadas por el amor de Cristo.
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        {/* Equipo Pastoral */}
        <div id="equipo">
          <h2 className="text-3xl font-semibold mb-8 text-center">Equipo Pastoral</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Pastor Principal */}
            <Card className="text-center shadow-lg p-6">
              <CardHeader>
                <CardTitle>Pastor Principal</CardTitle>
                <p className="mt-2 font-semibold">José Antonio Pacheco</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <Image
                  src="/multimedia/pastorJose.jpeg"
                  alt="Pastor Principal"
                  width={260}
                  height={260}
                  className="rounded-full mx-auto shadow-md object-cover"
                />
                <p className="text-gray-600">
                  Lidera la iglesia con visión y pasión por el evangelio.
                </p>
              </CardContent>
            </Card>

            {/* Pastor */}
            <Card className="text-center shadow-lg p-6">
              <CardHeader>
                <CardTitle>Pastor</CardTitle>
                <p className="mt-2 font-semibold">Javier Pelaez</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <Image
                  src="/multimedia/PastorJavier.jpeg"
                  alt="Pastor"
                  width={260}
                  height={260}
                  className="rounded-full mx-auto shadow-md object-cover"
                />
                <p className="text-gray-600">
                  Guía en el camino de la fe con amor y dedicación.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

      </section>
    </>
  );
}