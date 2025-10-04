import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export default function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
      <Card className="glass-card max-w-md">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            {icon}
          </div>
          <Construction className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground mb-6">{description}</p>
          <Button variant="outline">Coming Soon</Button>
        </CardContent>
      </Card>
    </div>
  );
}
