import axios from "axios";
import { toRichText } from './utils';

const API_URL = process.env.API_URL || "http://localhost:1337";
export const fetchData = async (endpoint: string) => {
  const res = await axios.get(`${API_URL}/api/${endpoint}`);
  return res.data.data;
};

export async function getData(endpoint: string) {
  //?populate=*
  try {
    const response = await fetch(`${API_URL}/api/${endpoint}`)
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
    const response = await fetch(`${API_URL}/api/${endpoint}`)
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
  console.log("HOST=",API_URL);
  const res = await fetch(`${API_URL}/api/interaccions`, {
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
