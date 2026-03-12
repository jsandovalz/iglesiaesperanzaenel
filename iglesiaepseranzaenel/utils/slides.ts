type File = {
  id: number;
  documentId: string;
  name: string;
  url: string;
}

type Imagen = {
  alt: string;
  caption: string;
  button_text: string;
  button_link: string;
  src?: File[];
};

type PaginaData = {
  Pagina: string;
  Imagenes: Imagen[];
};

export function getSlidesByPage(data: PaginaData[], pageName: string) {
  const slideInicio = data.find((item: PaginaData) => item.Pagina ===pageName);
  
  return slideInicio?.Imagenes.flatMap(img => {
  const files: File[] = img?.src ?? [];
  return files.map(file => ({
    src: process.env.API_URL + file.url, 
    alt: img.alt,
    caption: img.caption,
    buttonText: img.button_text,
    buttonLink: img.button_link,
  }));
}) ?? []
};