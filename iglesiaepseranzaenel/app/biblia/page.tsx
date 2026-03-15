"use client";

import BibliaContent from "@/components/BibliaContent";
import { Suspense } from "react";

export default function Biblia() {
  return (
    <Suspense fallback={<p>Cargando búsqueda...</p>}>
      <BibliaContent />
    </Suspense>
  );
}
