import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ShoppingCart, ArrowLeft, ArrowRight } from "lucide-react";
import ProductSelector from "./ProductSelector";
import MockupPreview from "./MockupPreview";

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

interface CustomizationOptions {
  color?: string;
  size?: string;
  layout?: string;
}

interface ProductCustomizerProps {
  selectedPhoto?: string;
  onAddToCart?: (product: Product, options: CustomizationOptions) => void;
  onBack?: () => void;
  onNext?: () => void;
}

const ProductCustomizer = ({
  selectedPhoto = "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80",
  onAddToCart = () => {},
  onBack = () => {},
  onNext = () => {},
}: ProductCustomizerProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customizationOptions, setCustomizationOptions] =
    useState<CustomizationOptions>({
      color: "white",
      size: "medium",
      layout: "centered",
    });

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      onAddToCart(selectedProduct, customizationOptions);
    }
  };

  const handleCustomizationChange = (
    options: Partial<CustomizationOptions>,
  ) => {
    setCustomizationOptions((prev) => ({
      ...prev,
      ...options,
    }));
  };

  const getProductType = () => {
    if (!selectedProduct) return "mug";

    if (selectedProduct.categoryId === "mugs") return "mug";
    if (selectedProduct.categoryId === "frames") return "frame";
    if (selectedProduct.categoryId === "calendars") return "calendar";

    return "mug"; // default fallback
  };

  return (
    <div className="w-full h-full bg-gray-50 p-4 md:p-6">
      <Card className="w-full h-full bg-white shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold flex justify-between items-center">
            <span>Personalização de Produto</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={!selectedProduct}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Adicionar ao Carrinho
              </Button>
              <Button variant="outline" size="sm" onClick={onNext}>
                Avançar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            <div className="md:col-span-1 border-r">
              <ProductSelector
                onSelectProduct={handleProductSelect}
                selectedProductId={selectedProduct?.id}
              />
            </div>
            <div className="md:col-span-2 p-4">
              {selectedProduct ? (
                <div className="h-full flex flex-col">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-gray-600">
                      {selectedProduct.description}
                    </p>
                    <p className="text-lg font-bold text-primary mt-2">
                      R$ {selectedProduct.price.toFixed(2)}
                    </p>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex-grow">
                    <MockupPreview
                      selectedPhoto={selectedPhoto}
                      productType={getProductType()}
                      customizationOptions={customizationOptions}
                    />
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-8 max-w-md">
                    <img
                      src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80"
                      alt="Select a product"
                      className="w-48 h-48 object-cover mx-auto mb-6 rounded-lg opacity-50"
                    />
                    <h3 className="text-xl font-semibold mb-2">
                      Selecione um Produto
                    </h3>
                    <p className="text-gray-500">
                      Escolha um produto na lista à esquerda para visualizar o
                      mockup com sua foto selecionada.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCustomizer;
