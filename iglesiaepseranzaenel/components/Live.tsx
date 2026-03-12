"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { parseRichText } from "../utils/richtext";

type TypeArchive = {
  url: string;
  mime: string;
};

interface Multi {
  Titulo: string;
  Url: string ;
  Descripcion: any[];
  Fecha: string;
  Tipo: string;
  Archivo: TypeArchive[]
}
interface Multime {
  multi: Multi[];
}

export default function Live({
    multi
}: Multime) {
    return (
        <>
            {multi.map((source, index) => {
                const { Titulo, Url, Fecha, Tipo, Archivo } = source;
                const plainText = parseRichText(source.Descripcion);
                console.log("ARchivo:",Archivo);
                return (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{Tipo==="Youtube"?"Prédica:":""} {Titulo}</CardTitle>
                            <CardDescription>{plainText}</CardDescription>
                            <CardTitle>Fecha: {Fecha}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {Tipo==="Video" && Archivo && (
                                <video
                                    controls
                                    className="w-full h-64 rounded-lg"
                                >
                                    <source src={process.env.API_URL + Archivo[0].url} type="video/mp4" />
                                    Tu navegador no soporta video.
                                </video>

                            )}
                            {Tipo === "Audio" && Archivo && (
                                <audio controls className="w-full mt-4">
                                    <source
                                        src={process.env.API_URL + Archivo[0].url}
                                        type={Archivo[0].mime || "audio/mpeg"}
                                    />
                                    Tu navegador no soporta audio.
                                </audio>
                            )}
                            {Tipo === "Youtube" && Url && (
                                <iframe
                                    className="w-full h-48 rounded-lg shadow-md"
                                    src={"https://www.youtube.com/embed/"+Url}
                                    title={Titulo}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}
                            {Tipo === "RightMedia" && Url && (
                                <a
                                    href={Url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                    >
                                    Ver en RightNow Media
                                </a>
                                
                            )}
                        </CardContent>
                    </Card>
                
            )})}
        </>
    )
}