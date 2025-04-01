import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize,
  Share2,
} from "lucide-react";

interface MockupPreviewProps {
  selectedPhoto?: string;
  productType?: string;
  customizationOptions?: {
    color?: string;
    size?: string;
    layout?: string;
  };
}

const MockupPreview = ({
  selectedPhoto = "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80",
  productType = "mug",
  customizationOptions = {
    color: "white",
    size: "medium",
    layout: "centered",
  },
}: MockupPreviewProps) => {
  const [zoom, setZoom] = useState<number[]>([50]);
  const [viewMode, setViewMode] = useState("2d");

  // Mock product templates
  const productTemplates = {
    mug: {
      image:
        "https://images.unsplash.com/photo-1577909618896-39d5e7e0fb9c?w=800&q=80",
      mockupPositions: {
        centered: {
          top: "30%",
          left: "50%",
          width: "40%",
          transform: "translate(-50%, -50%)",
        },
        wrapped: {
          top: "50%",
          left: "50%",
          width: "60%",
          transform: "translate(-50%, -50%) rotate(10deg)",
        },
      },
    },
    frame: {
      image:
        "https://images.unsplash.com/photo-1581343109297-b0723170dc42?w=800&q=80",
      mockupPositions: {
        centered: {
          top: "50%",
          left: "50%",
          width: "80%",
          transform: "translate(-50%, -50%)",
        },
        offset: {
          top: "45%",
          left: "48%",
          width: "75%",
          transform: "translate(-50%, -50%) rotate(-2deg)",
        },
      },
    },
    calendar: {
      image:
        "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=800&q=80",
      mockupPositions: {
        centered: {
          top: "40%",
          left: "50%",
          width: "70%",
          transform: "translate(-50%, -50%)",
        },
        top: {
          top: "25%",
          left: "50%",
          width: "65%",
          transform: "translate(-50%, -50%)",
        },
      },
    },
  };

  const currentProduct =
    productTemplates[productType as keyof typeof productTemplates] ||
    productTemplates.mug;
  const currentLayout = customizationOptions.layout || "centered";
  const mockupPosition =
    currentProduct.mockupPositions[
      currentLayout as keyof typeof currentProduct.mockupPositions
    ];

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Product Mockup Preview</span>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="2d" className="w-full" onValueChange={setViewMode}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="2d">2D Preview</TabsTrigger>
            <TabsTrigger value="3d">3D Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="2d" className="w-full">
            <div className="relative w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
              {/* Product template image */}
              <img
                src={currentProduct.image}
                alt={`${productType} template`}
                className="w-full h-full object-contain"
              />

              {/* Overlaid photo */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: mockupPosition.top,
                  left: mockupPosition.left,
                  width: mockupPosition.width,
                  transform: `${mockupPosition.transform} scale(${zoom[0] / 50})`,
                }}
              >
                <img
                  src={selectedPhoto}
                  alt="Selected photo"
                  className="w-full h-auto rounded"
                />
              </div>

              {/* Controls overlay */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <Button variant="secondary" size="icon">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon">
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="3d" className="w-full">
            <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">
                3D preview would be rendered here using a 3D library like
                Three.js
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-0">
        <div className="w-full grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium mb-2">Product Color</p>
            <Select defaultValue={customizationOptions.color}>
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="red">Red</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Layout Style</p>
            <Select defaultValue={customizationOptions.layout}>
              <SelectTrigger>
                <SelectValue placeholder="Select layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="centered">Centered</SelectItem>
                <SelectItem value="wrapped">Wrapped</SelectItem>
                <SelectItem value="offset">Offset</SelectItem>
                <SelectItem value="top">Top Aligned</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Size</p>
            <Select defaultValue={customizationOptions.size}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full">
          <div className="flex justify-between mb-2">
            <p className="text-sm font-medium">Photo Zoom</p>
            <p className="text-sm text-gray-500">{zoom[0]}%</p>
          </div>
          <Slider
            defaultValue={zoom}
            max={100}
            step={1}
            onValueChange={setZoom}
          />
        </div>

        <div className="w-full flex justify-end space-x-2 mt-4">
          <Button variant="outline">Reset</Button>
          <Button>Add to Cart</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MockupPreview;
