import HeroSlider from "@/components/HeroSlider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/lib/api";
import { getSlidesByPage } from "@/utils/slides";
import Image from "next/image";

export default async function SomosFamilia() {

  const data = await getData('inicios?populate[Imagenes][populate]=src');
  const slides = getSlidesByPage(data, "Somos Familia");

  return (
    <>
      {/* Hero reutilizado */}
      <HeroSlider slides={slides} autoPlay interval={5000} />

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Bienvenida */}
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Somos familia
          </h1>
          <p className="text-lg text-gray-600">
            Más que una iglesia, somos una familia que comparte fe, esperanza y amor.
          </p>
        </header>

        <Separator className="my-12" />

        {/* Testimonios */}
        <div>
          <h2 className="text-3xl font-semibold mb-8 text-center">Testimonios</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Andrea</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  “Aquí encontré una familia espiritual que me apoya en cada etapa de mi vida.”
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>José</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  “La comunidad me ayudó a crecer en la fe y a descubrir mi propósito.”
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Galería de actividades */}
        <div>
          <h2 className="text-3xl font-semibold mb-8 text-center">Nuestra vida en comunidad</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Image
              src="/multimedia/actividad1.jpg"
              alt="Actividad comunitaria"
              width={400}
              height={250}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/multimedia/actividad2.jpg"
              alt="Grupo de alabanza"
              width={400}
              height={250}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/multimedia/actividad3.jpg"
              alt="Reunión en hogares"
              width={400}
              height={250}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
    </>
  );
}