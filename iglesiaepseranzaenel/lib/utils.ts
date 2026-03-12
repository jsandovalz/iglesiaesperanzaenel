import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function parseRichText(rich: any[]): string {
  if (!Array.isArray(rich)) return "";

  return rich
    .map(block =>
      (block.children || [])
        .map((child: any) => child.text || "")
        .join(" ")
    )
    .join("\n");
}

export function toRichText(text: string) {
  return [
    {
      type: "paragraph",
      children: [{ type: "text", text }],
    },
  ];
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  // Configuración para español (Bolivia)
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",   // día de la semana
    day: "numeric",    // número del día
    month: "long",     // nombre del mes
    hour: "numeric",   // hora
    minute: "2-digit", // minutos
    hour12: true,      // formato 12h con AM/PM
  };

  return new Intl.DateTimeFormat("es-BO", options).format(date);
}

export function sortByDateOnly(items: any[], field: string, order: "asc" | "desc" = "asc") {
  return [...items].sort((a, b) => {
    const dateA = new Date(a[field] as string);
    const dateB = new Date(b[field] as string);
    console.log("dateA=",dateA);
    console.log("dateB=",dateB);

    // Normalizamos a solo año-mes-día (ignorando hora)
    const onlyDateA = new Date(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
    const onlyDateB = new Date(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());

    if (order === "asc") {
      return onlyDateA.getTime() - onlyDateB.getTime();
    } else {
      return onlyDateB.getTime() - onlyDateA.getTime();
    }
  });
}
