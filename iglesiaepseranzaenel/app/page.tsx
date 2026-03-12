import HeroLive from "@/components/HeroLive";
import HeroSlider from "@/components/HeroSlider";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/lib/api";
import { getSlidesByPage } from '../utils/slides';

export default async function Home() {
  const data = await getData('inicios?populate[Imagenes][populate]=src');
  
  // 2. Filtras y transformas con tu helper (sync)
  const slides = getSlidesByPage(data, "Inicio");
  
  return (
  <>
      
    {/* Hero dinámico */}
    <HeroSlider slides={slides ?? []} autoPlay interval={5000}/>

  
    <Separator className="my-12" />

    {/* Bloque de transmisiones en vivo */}
    <HeroLive/>
    </>
  );
}