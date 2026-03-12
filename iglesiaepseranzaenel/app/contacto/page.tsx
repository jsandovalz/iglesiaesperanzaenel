"use client";

import { useState } from "react";
import HeroSlider from "@/components/HeroSlider";

export default function Contacto() {
  const slides = [
    {
      src: "/multimedia/contacto.jpg",
      alt: "Contacto Iglesia",
      caption: "Estamos aquí para escucharte",
      buttonText: "Escríbenos",
      buttonLink: "#formulario",
    },
  ];

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"}/api/contactos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: formData }),
    });
    alert("Mensaje enviado. ¡Gracias por contactarnos!");
    setFormData({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <>
      <HeroSlider slides={slides ?? []} autoPlay interval={5000} />

      <section className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Encabezado */}
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contáctanos
          </h1>
          <p className="text-lg text-gray-600">
            Queremos escucharte. Escríbenos y estaremos en contacto contigo.
          </p>
        </header>

        {/* Formulario */}
        <div id="formulario" className="bg-gray-100 p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full p-3 rounded border"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded border"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Mensaje</label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                className="w-full p-3 rounded border"
                rows={5}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Información de contacto */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Información</h2>
          <p className="text-gray-700">📍 Dirección: Calle 5 Nro. 538 a media cuadra arriba de la Av. 14 de septiembre Obrajes, La Paz - Bolivia</p>
          <p className="text-gray-700">📞 Teléfono: +591 777-12345</p>
          <p className="text-gray-700">✉️ Email: contacto@iglesia.org</p>
          <p className="text-gray-700">🌐 Redes: Facebook / YouTube / Instagram</p>
        </div>
      </section>
    </>
  );
}