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