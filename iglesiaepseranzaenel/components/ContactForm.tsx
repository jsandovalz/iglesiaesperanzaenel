"use client";
import { useState } from "react";

export default function ContactForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [consulta, setConsulta] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const API_URL = process.env.API_URL || "http://localhost:1337";

    const res = await fetch(`${API_URL}/api/contact/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, consulta }),
    });

    if (res.ok) {
      alert("Tu consulta fue enviada ✅");
      setNombre("");
      setEmail("");
      setConsulta("");
    } else {
      alert("Error al enviar la consulta ❌");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <textarea
        placeholder="Escribe tu consulta..."
        value={consulta}
        onChange={(e) => setConsulta(e.target.value)}
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows={4}
      ></textarea>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Enviar consulta
      </button>
    </form>
  );
}