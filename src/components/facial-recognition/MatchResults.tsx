import React, { useState } from "react";
import { Check, ShoppingCart, Maximize2, Heart } from "lucide-react";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Photo {
  id: string;
  url: string;
  date: string;
  event: string;
  matchConfidence: number;
}

interface MatchResultsProps {
  photos?: Photo[];
  onSelectPhoto?: (photo: Photo) => void;
  isLoading?: boolean;
}

const MatchResults = ({
  photos = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80",
      date: "2023-05-15",
      event: "School Sports Day",
      matchConfidence: 98,
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800&q=80",
      date: "2023-06-10",
      event: "Graduation Ceremony",
      matchConfidence: 95,
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1511949860663-92c5c57d48a7?w=800&q=80",
      date: "2023-04-22",
      event: "Science Fair",
      matchConfidence: 92,
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?w=800&q=80",
      date: "2023-03-18",
      event: "Art Exhibition",
      matchConfidence: 89,
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
      date: "2023-02-05",
      event: "School Play",
      matchConfidence: 87,
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
      date: "2023-01-20",
      event: "Field Trip",
      matchConfidence: 84,
    },
  ],
  onSelectPhoto = () => {},
  isLoading = false,
}: MatchResultsProps) => {
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);

  const togglePhotoSelection = (photoId: string) => {
    setSelectedPhotos((prev) =>
      prev.includes(photoId)
        ? prev.filter((id) => id !== photoId)
        : [...prev, photoId],
    );
  };

  const handleAddToCart = () => {
    const photosToAdd = photos.filter((photo) =>
      selectedPhotos.includes(photo.id),
    );
    console.log("Adding to cart:", photosToAdd);
    // Here you would typically call a function to add these to the cart
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white p-8 rounded-lg">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-lg font-medium text-gray-700">
            Processing facial recognition...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Match Results</h2>
        <p className="text-gray-600">
          We found {photos.length} photos that match your search. Select the
          ones you'd like to use for products.
        </p>
      </div>

      {photos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">
            No matching photos found. Try uploading a different photo.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setHoveredPhoto(photo.id)}
                onMouseLeave={() => setHoveredPhoto(null)}
                className="relative"
              >
                <Card className="overflow-hidden h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={photo.url}
                      alt={`School photo from ${photo.event}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                        onClick={() => window.open(photo.url, "_blank")}
                      >
                        <Maximize2 className="h-4 w-4 text-gray-700" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                        onClick={() => console.log("Favorite:", photo.id)}
                      >
                        <Heart className="h-4 w-4 text-gray-700" />
                      </Button>
                    </div>
                    <div
                      className={`absolute top-2 left-2 h-6 w-6 rounded-full flex items-center justify-center transition-colors ${selectedPhotos.includes(photo.id) ? "bg-primary" : "bg-white/80 backdrop-blur-sm"}`}
                      onClick={() => togglePhotoSelection(photo.id)}
                    >
                      {selectedPhotos.includes(photo.id) && (
                        <Check className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-sm font-medium">
                            {photo.event}
                          </p>
                          <p className="text-white/80 text-xs">{photo.date}</p>
                        </div>
                        <div className="bg-green-500/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {photo.matchConfidence}% Match
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardFooter className="p-3 flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => onSelectPhoto(photo)}
                    >
                      Use This Photo
                    </Button>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=student123" />
                      <AvatarFallback>ST</AvatarFallback>
                    </Avatar>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              {selectedPhotos.length} photo
              {selectedPhotos.length !== 1 ? "s" : ""} selected
            </p>
            <Button
              onClick={handleAddToCart}
              disabled={selectedPhotos.length === 0}
              className="flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Add Selected to Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MatchResults;
