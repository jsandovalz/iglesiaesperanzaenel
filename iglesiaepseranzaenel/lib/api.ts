import axios from "axios";
import { toRichText } from './utils';

const API_URL = process.env.API_URL || "https://iee-production.up.railway.app/";
export const fetchData = async (endpoint: string) => {
  const res = await axios.get(`${API_URL}/api/${endpoint}`);
  return res.data.data;
};

export async function getData(endpoint: string) {
  //?populate=*
  try {
    const response = await fetch(`${API_URL}/api/${endpoint}`,{next: { revalidate: 86400 }})
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
    const response = await fetch(`${API_URL}/api/${endpoint}`,{next: { revalidate: 600 }})
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
  const res = await fetch(`${API_URL}/api/interaccions`, {
    next: { revalidate: 300 },
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

export async function getActividades() {
  try {
    const res = await fetch(
      `${API_URL}/api/actividadsemana?populate[actividades][sort][0]=fecha:asc&populate[actividades][sort][1]=hora:asc`,
      { cache: "no-store",
        next: { revalidate: 600 } // 10 minutos
       }
    );

    if (!res.ok) return null;

    const json = await res.json();
  
    // ESTA ES LA PARTE CORRECTA
    return json?.data || null;

  } catch (error) {
    console.error("Error cargando actividades:", error);
    return null;
  }
}
