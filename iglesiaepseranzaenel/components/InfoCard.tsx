import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CardProps {
  title: string;
  content: string;
  subtitle?: string;
  fechaInicio?: string;
}

export default function InfoCard({ title, content, subtitle, fechaInicio }: CardProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {fechaInicio && <p className="text-gray-700">{fechaInicio}</p>}
        <p className="text-lg">{content}</p>
        {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
      </CardContent>
    </Card>
  );
}