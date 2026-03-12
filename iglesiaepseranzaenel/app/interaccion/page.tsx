
import ContactForm from "@/components/ContactForm";
import HeroSlider from "@/components/HeroSlider";
import InfoCard from "@/components/InfoCard";
import MuroOracionForm from "@/components/MuroOracionForm";
import TestimonioForm from "@/components/TestimonioForm";
import TestimoniosList from "@/components/TestimoniosList";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/lib/api";
import { getSlidesByPage } from "@/utils/slides";


export default async function Interaccion() {
  const data = await getData('inicios?populate[Imagenes][populate]=src');
  const slides = getSlidesByPage(data, "Interaccion");

  // const dataTestimonios = await getData('interaccions?filters[Estado][$eq]=Aprobado&filters[Tipo][$eq]=Testimonio&sort=publishedAt:desc');
  // const testimonios = dataTestimonios || [];
  // console.log("TESTIMONOIS:",testimonios);
  
  return (
    <>
      {/* Hero reutilizado */}
      <HeroSlider slides={slides} autoPlay interval={5000} />

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Muro de Oración */}
        <div id="muro-oracion">
          <h2 className="text-3xl font-semibold mb-8 text-center">Muro de Oración</h2>
          <MuroOracionForm />
        </div>


        <Separator className="my-12" />

        {/* Testimonios */}
        <div id="testimonios">
          <h2 className="text-3xl font-semibold mb-8 text-center">Testimonios</h2>
          <TestimoniosList/>

          {/* Formulario para compartir testimonio */}
          <div className="mt-8 text-center">
            <TestimonioForm/>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Pedir Información */}
        <div id="informacion">
          <h2 className="text-3xl font-semibold mb-8 text-center">Pedir Información</h2>
          <Card>
            <CardHeader>
              <CardTitle>Formulario de contacto</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm/>
              {/* <form className="space-y-4 max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <textarea
                  placeholder="Escribe tu consulta..."
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                ></textarea>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Enviar consulta
                </button>
              </form> */}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}