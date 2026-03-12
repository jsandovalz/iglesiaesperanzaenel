import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Bienvenido a nuestra iglesia
        </h2>
        <p className="text-lg text-gray-600">
          Somos una comunidad que vive la fe en unidad, compartiendo amor y
          esperanza. Cada semana nos reunimos para adorar y crecer juntos.
        </p>
      </section>
  );
}