"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createInteraction } from "@/lib/api";

export default function MuroOracionForm() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await createInteraction('Peticion',nombre,descripcion);

    if (res.data!=null ) {
      alert("Tu petición fue enviada y está en revisión 🙏");
      setNombre("");
      setDescripcion("");
    } else {
      alert("Error al enviar la petición");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparte tu petición</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Escribe tu petición de oración..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Enviar petición
          </button>
        </form>
      </CardContent>
    </Card>
  );
}