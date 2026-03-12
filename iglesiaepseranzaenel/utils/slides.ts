type Imagen = {
  alt: string;
  caption: string;
  button_text: string;
  button_link: string;
  src?: { data?: { attributes: { url: string } }[] };
};

type PaginaData = {
  Pagina: string;
  Imagenes: Imagen[];
};

export function getSlidesByPage(data: PaginaData[], pageName: string) {
  const slideInicio = data.find(item => item.Pagina ===pageName);
  
  return slideInicio?.Imagenes.flatMap(img => {
  const files = img?.src ?? [];
  return files.map(file => ({
    src: process.env.API_URL + file.url, // aquí concatenas tu dominio
    alt: img.alt,
    caption: img.caption,
    buttonText: img.button_text,
    buttonLink: img.button_link,
  }));
})
};