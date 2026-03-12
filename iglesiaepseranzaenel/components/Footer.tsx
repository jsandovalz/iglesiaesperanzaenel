import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Github, Facebook, Instagram, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";




export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Enlaces rápidos */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">Inicio</a></li>
            <li><a href="/sobre-nosotros" className="hover:text-white">Sobre nosotros</a></li>
            <li><a href="/eventos" className="hover:text-white">Eventos</a></li>
            <li><a href="/contacto" className="hover:text-white">Contacto</a></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.facebook.com/profile.php?id=100080235307408" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.instagram.com/iglesiaesperanzaenel/" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.youtube.com/@iglesiaesperanzaenel7272" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.tiktok.com/@iglesia.esperanza5" target="_blank" rel="noopener noreferrer">
                <FaTiktok className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Información */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Iglesia Esperanza en Él</h3>
          <p className="text-sm">
            La Paz, Bolivia <br />
            Transmisiones en vivo cada domingo
          </p>
        </div>
      </div>

      <Separator className="my-6 bg-gray-700" />

      <div className="text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Iglesia Esperanza en Él. Todos los derechos reservados.
      </div>
    </footer>
  );
}