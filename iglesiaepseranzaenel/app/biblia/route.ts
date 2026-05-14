import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Falta parámetro 'query'" }, { status: 400 });
  }

  const apiUrl = `https://bible-api.com/${encodeURIComponent(query)}?translation=rvr1960`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error al consultar Bible API" }, { status: 500 });
  }
}
