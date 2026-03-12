import HeroSlider from "@/components/HeroSlider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/lib/api";
import { getSlidesByPage } from "@/utils/slides";
import Image from "next/image";

export default async function Generosidad() {
  const data = await getData('inicios?populate[Imagenes][populate]=src');
  const slides = getSlidesByPage(data, "Generosidad");

  return (
    <>
      {/* Hero reutilizado */}
      <HeroSlider slides={slides} autoPlay interval={5000} />

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Introducción */}
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Generosidad
          </h1>
          <p className="text-lg text-gray-600">
            Tus diezmos y ofrendas son una expresión de fe y amor que permiten
            que la iglesia siga creciendo y sirviendo a la comunidad.
          </p>
        </header>

        <Separator className="my-12" />

        {/* Bloque de Ofrendas y Diezmos */}
        <div id="ofrendas">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Diezmos y Ofrendas
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Formas de dar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <p className="text-gray-600">
                Puedes dar de manera segura a través de nuestras cuentas locales
                o escaneando el código QR.
              </p>

              {/* Ejemplo QR */}
              <div className="flex flex-col items-center space-y-4">
                <Image
                  src="/multimedia/qr-donacion.png"
                  alt="QR para donaciones"
                  width={200}
                  height={200}
                  className="rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-500">
                  Escanea este código QR con tu app bancaria o billetera móvil.
                </p>
              </div>

              {/* Botones alternativos */}
              <div className="flex justify-center space-x-4 mt-6">
                <a
                  href="https://www.paypal.com/donate?hosted_button_id=TU_ID"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Dar con PayPal
                </a>
                <a
                  href="/api/stripe-checkout"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                  Dar con Tarjeta
                </a>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                También puedes dar en efectivo durante nuestros cultos semanales.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}