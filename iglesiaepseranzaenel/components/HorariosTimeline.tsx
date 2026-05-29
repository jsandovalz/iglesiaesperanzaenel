"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const TimelineSection = ({ title, items }: { title: string; items: string[] }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView]);

  return (
    <div ref={ref} className="relative pl-10 pb-14">
      {/* Línea vertical */}
      <div className="absolute left-4 top-0 h-full w-[3px] bg-indigo-300 rounded-full" />

      {/* Punto animado */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4 }}
        className="absolute left-[10px] top-1 w-5 h-5 bg-indigo-600 rounded-full shadow-md"
      />

      {/* Card animada */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, x: -40 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
        }}
      >
        <Card className="shadow-md border border-indigo-100">
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">
              {title}
            </h3>

            <ul className="space-y-2 text-gray-700">
              {items.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-indigo-600">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default function HorariosTimeline({ secciones }: { secciones: any[] }) {
  return (
    <section className="max-w-6xl mx-auto mt-12 px-6">
      <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">
        Horarios
      </h2>

      {secciones.map((sec, i) => (
        <TimelineSection key={i} title={sec.titulo} items={sec.items} />
      ))}
    </section>
  );
}
