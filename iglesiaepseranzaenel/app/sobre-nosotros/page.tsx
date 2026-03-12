import HeroSlider from "@/components/HeroSlider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/lib/api";
import { getSlidesByPage } from "@/utils/slides";
import Image from "next/image";

export default async function SobreNosotros() {
  const data = await getData('inicios?populate[Imagenes][populate]=src');
  const slides = getSlidesByPage(data, "Sobre Nosotros");

  return (
    <>
      {/* Hero reutilizado */}
      <HeroSlider slides={slides} autoPlay interval={5000} />

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Historia */}
        <div id="historia">
          <h2 className="text-3xl font-semibold mb-8 text-center">Nuestra Historia</h2>
          <Card>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                La Iglesia Esperanza en Él nació con el deseo de ser un lugar de encuentro
                para familias y personas que buscan crecer en la fe. Desde nuestros inicios,
                hemos trabajado para ser una comunidad que refleja el amor de Cristo.
              </p>
              <Image
                src="/multimedia/historia.jpg"
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
          <h2 className="text-3xl font-semibold mb-8 text-center">Nuestra Misión</h2>
          <Card>
            <CardContent className="text-gray-700 text-center">
              <p>
               Nuestra misión es proclamar el evangelio de Jesucristo, formar
                discípulos y servir a nuestra comunidad con amor y esperanza.
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
                Ser una iglesia que impacte la sociedad, transformando vidas y
                familias a través del poder de la fe y la unidad en Cristo.
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        {/* Equipo Pastoral */}
        <div id="equipo">
          <h2 className="text-3xl font-semibold mb-8 text-center">Equipo Pastoral</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Pastor Principal</CardTitle>
                <p className="mt-2 font-semibold">José Antonio Pacheco</p>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <Image
                  src="/multimedia/pastor.jpg"
                  alt=""
                  width={300}
                  height={300}
                  className="rounded-full mx-auto shadow-md"
                />
                <p className="text-gray-700">
                  Lidera la iglesia con visión y pasión por el evangelio.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pastora de Niños</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <Image
                  src="/multimedia/pastora-ninos.jpg"
                  alt="Pastora de Niños"
                  width={300}
                  height={300}
                  className="rounded-full mx-auto shadow-md"
                />
                <p className="text-gray-700">
                  Guía a los más pequeños en el camino de la fe con amor y dedicación.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}