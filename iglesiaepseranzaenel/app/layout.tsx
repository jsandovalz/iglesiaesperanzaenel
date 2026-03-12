import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Iglesia",
  description: "Sitio oficial de nuestra iglesia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">

        {/* Navbar global */}
        <Navbar />

        {/* Contenido dinámico de cada página */}
        <main className="flex-grow">{children}</main>

        {/* Footer global */}
        <Footer />
      </body>
    </html>
  );
}