import HeroSlider from "@/components/HeroSlider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/lib/api";
import { getSlidesByPage } from "@/utils/slides";

export const dynamic = "force-dynamic";
export default async function Visitanos() {
  
  const data = await getData('inicios?populate[Imagenes][populate]=src');
  const slides = getSlidesByPage(data, "Visitanos");

  const secciones = [
    {
      titulo: "Culto General",
      items: [
        "Domingo de 11:00 a 12:30",
      ],
    },
    {
      titulo: "Discipulados",
      items: [
        "Panorama Bíblico — Domingo 10:30 a 11:00",
        "Niños — Domingo 11:00 a 12:30",
        "Adolescentes — Sábado 17:00 a 19:00",
        "Jóvenes — Sábado 17:00 a 19:00",
        "Varones — Primer viernes 19:00 a 20:30",
        "Mujeres — Segundo viernes 19:00 a 20:30",
        "Matrimonios — Tercer viernes 19:00 a 20:30",
        "Adultos mayores — Primer sábado 16:00 a 18:00",
      ],
    },
    {
      titulo: "Discipulados en Casa",
      items: [
        "Lunes — Zona Irpavi",
        "Lunes — Zona Sopocachi",
        "Miércoles — Zona 27 de Mayo (Periférica)",
        "Jueves — Zona Tejar",
        "Jueves — Zona Obrajes-Llojeta",
        "Jueves — Miraflores",
        "Jueves — Cota Cota",
      ],
    },
    {
      titulo: "Oración",
      items: [
        "Oración de mujeres — Martes 9:00 a 10:00",
        "Oración general — Miércoles 19:00 a 20:00",
      ],
    },
  ];

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
        <section className="max-w-6xl mx-auto mt-12 px-6">
          <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">
            Horarios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {secciones.map((sec, i) => (
              <div
                key={i}
                className="bg-white shadow-lg rounded-xl p-6 border border-indigo-100"
              >
                <h3 className="text-xl font-bold text-indigo-700 mb-4 text-center">
                  {sec.titulo}
                </h3>

                <ul className="space-y-2 text-gray-700">
                  {sec.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2"
                    >
                      <span className="text-indigo-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}