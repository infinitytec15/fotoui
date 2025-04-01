import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Camera,
  Calendar,
  Coffee,
  Frame,
  Gift,
  CreditCard,
  Printer,
  ShoppingBag,
} from "lucide-react";

interface ProductCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  popular?: boolean;
  new?: boolean;
}

interface ProductSelectorProps {
  onSelectProduct?: (product: Product) => void;
  selectedProductId?: string;
}

const ProductSelector = ({
  onSelectProduct = () => {},
  selectedProductId = "",
}: ProductSelectorProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("prints");

  const categories: ProductCategory[] = [
    {
      id: "prints",
      name: "Impressões",
      icon: <Printer className="h-5 w-5" />,
      description: "Fotos impressas em diversos tamanhos e acabamentos",
    },
    {
      id: "mugs",
      name: "Canecas",
      icon: <Coffee className="h-5 w-5" />,
      description: "Canecas personalizadas com as fotos escolares",
    },
    {
      id: "frames",
      name: "Porta-retratos",
      icon: <Frame className="h-5 w-5" />,
      description: "Porta-retratos elegantes para destacar as melhores fotos",
    },
    {
      id: "calendars",
      name: "Calendários",
      icon: <Calendar className="h-5 w-5" />,
      description: "Calendários personalizados com fotos escolares",
    },
    {
      id: "cards",
      name: "Cartões",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Cartões comemorativos personalizados",
    },
    {
      id: "gifts",
      name: "Presentes",
      icon: <Gift className="h-5 w-5" />,
      description: "Itens diversos personalizados com as fotos",
    },
    {
      id: "packages",
      name: "Pacotes",
      icon: <ShoppingBag className="h-5 w-5" />,
      description: "Conjuntos de produtos com preços especiais",
    },
  ];

  const products: Product[] = [
    {
      id: "print-10x15",
      name: "Foto 10x15cm",
      description: "Impressão de alta qualidade em papel fotográfico",
      price: 15.9,
      image:
        "https://images.unsplash.com/photo-1576716087033-ce96f785bd7e?w=300&q=80",
      categoryId: "prints",
      popular: true,
    },
    {
      id: "print-15x21",
      name: "Foto 15x21cm",
      description: "Impressão de alta qualidade em papel fotográfico",
      price: 24.9,
      image:
        "https://images.unsplash.com/photo-1576716087033-ce96f785bd7e?w=300&q=80",
      categoryId: "prints",
    },
    {
      id: "print-20x30",
      name: "Foto 20x30cm",
      description: "Impressão de alta qualidade em papel fotográfico",
      price: 39.9,
      image:
        "https://images.unsplash.com/photo-1576716087033-ce96f785bd7e?w=300&q=80",
      categoryId: "prints",
    },
    {
      id: "mug-standard",
      name: "Caneca Padrão",
      description: "Caneca de cerâmica personalizada com foto",
      price: 39.9,
      image:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300&q=80",
      categoryId: "mugs",
      popular: true,
    },
    {
      id: "mug-magic",
      name: "Caneca Mágica",
      description: "Caneca que revela a foto quando aquecida",
      price: 49.9,
      image:
        "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=300&q=80",
      categoryId: "mugs",
      new: true,
    },
    {
      id: "frame-simple",
      name: "Porta-retrato Simples",
      description: "Porta-retrato em madeira com foto impressa",
      price: 59.9,
      image:
        "https://images.unsplash.com/photo-1581612129334-551ccd2c6a8c?w=300&q=80",
      categoryId: "frames",
    },
    {
      id: "frame-deluxe",
      name: "Porta-retrato Deluxe",
      description: "Porta-retrato premium com acabamento especial",
      price: 89.9,
      image:
        "https://images.unsplash.com/photo-1581612129334-551ccd2c6a8c?w=300&q=80",
      categoryId: "frames",
      popular: true,
    },
    {
      id: "calendar-desk",
      name: "Calendário de Mesa",
      description: "Calendário de mesa personalizado com 12 fotos",
      price: 69.9,
      image:
        "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=300&q=80",
      categoryId: "calendars",
      popular: true,
    },
    {
      id: "calendar-wall",
      name: "Calendário de Parede",
      description: "Calendário de parede personalizado com 12 fotos",
      price: 79.9,
      image:
        "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=300&q=80",
      categoryId: "calendars",
    },
    {
      id: "card-standard",
      name: "Cartão Padrão",
      description: "Cartão personalizado com foto e mensagem",
      price: 12.9,
      image:
        "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=300&q=80",
      categoryId: "cards",
    },
    {
      id: "gift-keychain",
      name: "Chaveiro Personalizado",
      description: "Chaveiro com foto impressa",
      price: 29.9,
      image:
        "https://images.unsplash.com/photo-1581088387864-681099d9bfe6?w=300&q=80",
      categoryId: "gifts",
      new: true,
    },
    {
      id: "package-basic",
      name: "Pacote Básico",
      description: "2 fotos 10x15 + 1 caneca personalizada",
      price: 59.9,
      image:
        "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=300&q=80",
      categoryId: "packages",
      popular: true,
    },
  ];

  const filteredProducts = products.filter(
    (product) => product.categoryId === activeCategory,
  );

  const handleSelectProduct = (product: Product) => {
    onSelectProduct(product);
  };

  return (
    <Card className="h-full w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Selecione um Produto
        </CardTitle>
        <CardDescription>
          Escolha o tipo de produto para personalizar com as fotos selecionadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <ScrollArea className="w-full pb-4">
            <TabsList className="flex w-full justify-start overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2 px-4 py-2"
                >
                  {category.icon}
                  <span>{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {filteredProducts.map((product) => (
                  <TooltipProvider key={product.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Card
                          className={`cursor-pointer transition-all hover:shadow-md ${selectedProductId === product.id ? "ring-2 ring-primary" : ""}`}
                          onClick={() => handleSelectProduct(product)}
                        >
                          <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute right-2 top-2 flex gap-1">
                              {product.popular && (
                                <Badge
                                  variant="secondary"
                                  className="bg-yellow-100 text-yellow-800"
                                >
                                  Popular
                                </Badge>
                              )}
                              {product.new && (
                                <Badge
                                  variant="secondary"
                                  className="bg-green-100 text-green-800"
                                >
                                  Novo
                                </Badge>
                              )}
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {product.description}
                            </p>
                            <p className="mt-2 font-bold text-primary">
                              R$ {product.price.toFixed(2)}
                            </p>
                          </CardContent>
                        </Card>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Clique para selecionar este produto</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <p className="text-sm text-muted-foreground">
          {categories.find((c) => c.id === activeCategory)?.description}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open("#", "_blank")}
        >
          <Camera className="mr-2 h-4 w-4" />
          Ver catálogo completo
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductSelector;
