import axios from "axios";
import { toRichText } from './utils';
import { NextResponse } from "next/server";

const API_URL = process.env.API_URL || "https://steadfast-triumph-c0193f1fb8.strapiapp.com";
export const fetchData = async (endpoint: string) => {
  const res = await axios.get(`${API_URL}/api/${endpoint}`);
  return res.data.data;
};

export async function getData(endpoint: string) {
  //?populate=*
  try {
    const response = await fetch(`${API_URL}/api/${endpoint}`,{cache: "no-store"})
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log("DATA=",data);
    return data.data;
  } catch(error) {
    console.error('Error getting data:',error)
    return null
  }
}
export async function getDataWithPagination(endpoint: string) {
  //?populate=*
  try {
    const response = await fetch(`${API_URL}/api/${endpoint}`,{cache: "no-store"})
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log("DATA=",data);
    return data;
  } catch(error) {
    console.error('Error getting data:',error)
    return null
  }
}

export async function createInteraction(Tipo: "Peticion" | "Testimonio", Nombre: string, descripcion: string) {
  console.log("DESC=",descripcion);
  console.log("HOST:=",API_URL);
  const res = await fetch(`${API_URL}/api/interaccions`, {
    cache:"no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, // si usas autenticación
    },
    body: JSON.stringify({
      data: {
        Tipo,
        Nombre,
        Descripcion: toRichText(descripcion),
      },
    }),
  });

  return res.json();
}

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
