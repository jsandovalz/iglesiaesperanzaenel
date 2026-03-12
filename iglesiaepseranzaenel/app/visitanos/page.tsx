import HeroSlider from "@/components/HeroSlider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/lib/api";
import { getSlidesByPage } from "@/utils/slides";

export default async function Visitanos() {
  
  const data = await getData('inicios?populate[Imagenes][populate]=src');
  const slides = getSlidesByPage(data, "Visitanos");

  return (
    <>
      {/* Hero reutilizado */}
      <HeroSlider slides={slides ?? []} autoPlay interval={5000} />

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Ubicación */}
        <div id="ubicacion">
          <h2 className="text-3xl font-semibold mb-8 text-center">Ubicación</h2>
          <Card>
            <CardHeader>
              <CardTitle>Encuéntranos aquí</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.0434776694065!2d-68.11457395333285!3d-16.523902543669006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f21004fbdd8c7%3A0x959572fd3d2f913!2sIglesia%20Esperanza%20en%20%C3%89l!5e0!3m2!1ses-419!2sus!4v1773346907535!5m2!1ses-419!2sus"
                  // width="600"
                  // height="450"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <p className="mt-4 text-gray-600 text-center">
                Dirección: Calle 5, Obrajes #538, La Paz, Bolivia
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        {/* Horarios */}
        <div id="horarios">
          <h2 className="text-3xl font-semibold mb-8 text-center">Horarios</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Culto Dominical</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700">Domingos 10:00 AM</p>
                <p className="text-gray-600">
                  Reunión principal con alabanza, adoración y mensaje.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reunión de Oración</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700">Miércoles 7:00 PM</p>
                <p className="text-gray-600">
                  Tiempo especial para interceder y buscar la presencia de Dios.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grupos de Vida</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700">Viernes 7:30 PM</p>
                <p className="text-gray-600">
                  Encuentros en hogares para compartir la Palabra y la vida en comunidad.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ministerio de Jóvenes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700">Sábados 6:00 PM</p>
                <p className="text-gray-600">
                  Reunión dinámica para jóvenes con música, enseñanza y actividades.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}