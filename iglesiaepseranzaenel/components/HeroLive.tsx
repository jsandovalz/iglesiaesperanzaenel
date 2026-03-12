import { getData } from "@/lib/api";

export default async function HeroLive () {
    
    const strapiData = await getData('live-streams?filters[activo][$eq]=true');
    const { titulo, descripcion, youtube_id, activo } = strapiData;
    if (!activo) {
    return (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No hay transmisión en vivo ahora</h2>
          <p className="text-gray-600">Vuelve a visitarnos en el próximo culto.</p>
        </div>
      );
    }
    
    return (
        <section className="max-w-6xl mx-auto px-6 py-16 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Transmisiones en vivo
        </h2>
        <p className="text-lg text-gray-600">
          Únete a nuestros cultos semanales desde cualquier lugar a través de
          YouTube Live.
        </p>

        {/* Embed de YouTube Live */}
        <div className="aspect-w-16 aspect-h-9 max-w-4xl mx-auto">
           <h1 className="text-4xl font-bold mb-4">{titulo}</h1>
          <p className="text-lg text-gray-600 mb-8">{descripcion}</p>
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src={`https://www.youtube.com/embed/${youtube_id}?autoplay=1`}
            title="Transmisión en vivo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <a
          href={`https://www.youtube.com/embed/${youtube_id}?autoplay=1`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
        >
          Ver en YouTube
        </a>
      </section>
    )

}
