import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CardProps {
  title: string;
  content: string;
  subtitle?: string;
  fechaInicio?: string;
  fechaFinal?: string;
  imageUrl?: string;
}

export default function InfoCard({ 
  title, 
  content, 
  subtitle, 
  fechaInicio,
  fechaFinal,
  imageUrl,
 }: CardProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {fechaInicio && <p className="text-gray-700">Inicio: {fechaInicio}</p>}
        {fechaFinal && (<p className="text-gray-700">Fin: {fechaFinal}</p>)}
        <p className="text-lg mt-2">{content}</p>
        {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
      </CardContent>
    </Card>
  );
}