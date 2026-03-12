import HeroSlider from "@/components/HeroSlider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/lib/api";
import { getSlidesByPage } from "@/utils/slides";
import Image from "next/image";

export default async function VidaDeIglesia() {
  const data = await getData('inicios?populate[Imagenes][populate]=src');
  
  const slides = getSlidesByPage(data, "Vida de Iglesia");
  
  return (
    <>
      {/* Hero reutilizado */}
      <HeroSlider slides={slides} autoPlay interval={5000} />

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Ministerios */}
        <div>
          <h2 className="text-3xl font-semibold mb-8 text-center">Ministerios</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Ministerio de Jóvenes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Image
                  src="/multimedia/ministerio-jovenes.jpg"
                  alt="Ministerio de Jóvenes"
                  width={400}
                  height={250}
                  className="rounded-lg shadow-md"
                />
                <p>
                  Un espacio para que los jóvenes crezcan en la fe, compartan experiencias y se apoyen mutuamente.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ministerio de Niños</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Image
                  src="/multimedia/ministerio-ninos.jpg"
                  alt="Ministerio de Niños"
                  width={400}
                  height={250}
                  className="rounded-lg shadow-md"
                />
                <p>
                  Enseñamos a los más pequeños el amor de Dios a través de juegos, historias y actividades creativas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ministerio de Alabanza</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Image
                  src="/multimedia/ministerio-alabanza.jpg"
                  alt="Ministerio de Alabanza"
                  width={400}
                  height={250}
                  className="rounded-lg shadow-md"
                />
                <p>
                  Servimos a la iglesia guiando la adoración con música y cánticos que elevan nuestro espíritu.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Grupos de Vida */}
        <div>
          <h2 className="text-3xl font-semibold mb-8 text-center">Grupos de Vida</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Grupos en hogares</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Image
                  src="/multimedia/grupo-hogar.jpg"
                  alt="Grupo en hogar"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-md"
                />
                <p>
                  Pequeños grupos que se reúnen semanalmente en hogares para estudiar la Biblia y compartir vida juntos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grupos temáticos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Image
                  src="/multimedia/grupo-tematico.jpg"
                  alt="Grupo temático"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-md"
                />
                <p>
                  Grupos enfocados en temas específicos como matrimonios, liderazgo o discipulado, para crecer en áreas concretas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}