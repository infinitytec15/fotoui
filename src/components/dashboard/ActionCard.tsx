import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Camera, FileImage, ShoppingBag } from "lucide-react";

interface ActionCardProps {
  title?: string;
  description?: string;
  icon?: "facial-recognition" | "browse-photos" | "view-orders";
  onClick?: () => void;
  className?: string;
}

const ActionCard = ({
  title = "Card Title",
  description = "Description of the action card and what it does.",
  icon = "facial-recognition",
  onClick = () => {},
  className,
}: ActionCardProps) => {
  const getIcon = () => {
    switch (icon) {
      case "facial-recognition":
        return <Camera className="h-12 w-12 text-primary" />;
      case "browse-photos":
        return <FileImage className="h-12 w-12 text-primary" />;
      case "view-orders":
        return <ShoppingBag className="h-12 w-12 text-primary" />;
      default:
        return <Camera className="h-12 w-12 text-primary" />;
    }
  };

  return (
    <Card
      className={cn(
        "flex flex-col h-full transition-all hover:shadow-lg bg-white",
        className,
      )}
    >
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          {getIcon()}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Content can be added here if needed */}
      </CardContent>
      <CardFooter className="pt-4 flex justify-center">
        <Button onClick={onClick} className="w-full">
          {icon === "facial-recognition" && "Find My Child"}
          {icon === "browse-photos" && "Browse Photos"}
          {icon === "view-orders" && "View Orders"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActionCard;
