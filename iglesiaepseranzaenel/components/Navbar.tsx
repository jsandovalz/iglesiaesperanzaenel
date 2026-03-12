"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react"; // ícono hamburguesa
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
         <Image
            src="/Logo IEE2.jpg.jpeg"
            alt="Iglesia Esperanza en el"
            width={200}
            height={200}
          />
        {/* Links desktop */}
        <div className="hidden md:flex gap-6">
          <Link href="/">Inicio</Link>
          <Link href="/somos-familia">Somos Familia</Link>
          <Link href="/vida-de-iglesia">Vida de Iglesia</Link>
          <Link href="/multimedia">Multimedia</Link>
          <Link href="/interaccion">Interacción</Link>
          <Link href="/visitanos">Visítanos</Link>
          <Link href="/generosidad">Generosidad</Link>
        </div>

        {/* Botón hamburguesa móvil */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden bg-white shadow-lg flex flex-col gap-4 px-6 py-4">
          <Link href="/" onClick={() => setOpen(false)}>Inicio</Link>
          <Link href="/somos-familia" onClick={() => setOpen(false)}>Somos Familia</Link>
          <Link href="/vida-de-iglesia" onClick={() => setOpen(false)}>Vida de Iglesia</Link>
          <Link href="/multimedia" onClick={() => setOpen(false)}>Multimedia</Link>
          <Link href="/interaccion" onClick={() => setOpen(false)}>Interacción</Link>
          <Link href="/visitanos" onClick={() => setOpen(false)}>Visítanos</Link>
          <Link href="/generosidad" onClick={() => setOpen(false)}>Generosidad</Link>
        </div>
      )}
    </nav>
  );
}