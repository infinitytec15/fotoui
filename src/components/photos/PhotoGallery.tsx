import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Image as ImageIcon,
  Heart,
  ShoppingCart,
  ZoomIn,
} from "lucide-react";

interface Photo {
  id: string;
  src: string;
  title: string;
  date: string;
  event: string;
  tags: string[];
  liked: boolean;
}

interface PhotoGalleryProps {
  photos?: Photo[];
  onSelectPhoto?: (photo: Photo) => void;
  onAddToCart?: (photo: Photo) => void;
  filters?: {
    events: string[];
    dates: string[];
    tags: string[];
  };
}

const PhotoGallery = ({
  photos = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=800&q=80",
      title: "School Play",
      date: "2023-05-15",
      event: "Spring Performance",
      tags: ["play", "performance", "group"],
      liked: false,
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
      title: "Science Fair",
      date: "2023-04-22",
      event: "Science Fair",
      tags: ["science", "education", "group"],
      liked: true,
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80",
      title: "Graduation Day",
      date: "2023-06-30",
      event: "Graduation",
      tags: ["graduation", "ceremony", "portrait"],
      liked: false,
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      title: "Sports Day",
      date: "2023-03-18",
      event: "Sports Day",
      tags: ["sports", "outdoor", "group"],
      liked: false,
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
      title: "Art Exhibition",
      date: "2023-05-05",
      event: "Art Exhibition",
      tags: ["art", "exhibition", "portrait"],
      liked: true,
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800&q=80",
      title: "Music Concert",
      date: "2023-06-10",
      event: "Summer Concert",
      tags: ["music", "performance", "group"],
      liked: false,
    },
  ],
  onSelectPhoto = () => {},
  onAddToCart = () => {},
  filters = {
    events: [
      "Spring Performance",
      "Science Fair",
      "Graduation",
      "Sports Day",
      "Art Exhibition",
      "Summer Concert",
    ],
    dates: [
      "2023-03-18",
      "2023-04-22",
      "2023-05-05",
      "2023-05-15",
      "2023-06-10",
      "2023-06-30",
    ],
    tags: [
      "play",
      "performance",
      "group",
      "science",
      "education",
      "graduation",
      "ceremony",
      "portrait",
      "sports",
      "outdoor",
      "art",
      "exhibition",
      "music",
    ],
  },
}: PhotoGalleryProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<string>("all_events");
  const [selectedDate, setSelectedDate] = useState<string>("all_dates");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter photos based on search and filters
  const filteredPhotos = photos.filter((photo) => {
    const matchesSearch =
      searchQuery === "" ||
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesEvent =
      selectedEvent === "all_events" ||
      selectedEvent === "" ||
      photo.event === selectedEvent;
    const matchesDate =
      selectedDate === "all_dates" ||
      selectedDate === "" ||
      photo.date === selectedDate;
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => photo.tags.includes(tag));

    return matchesSearch && matchesEvent && matchesDate && matchesTags;
  });

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsDialogOpen(true);
    onSelectPhoto(photo);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleLikeToggle = (photoId: string) => {
    // In a real app, this would update the state properly
    console.log(`Toggle like for photo ${photoId}`);
  };

  const handleAddToCart = (photo: Photo) => {
    onAddToCart(photo);
  };

  return (
    <div className="bg-white w-full h-full p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Photo Gallery</h2>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/4 space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search photos..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Card>
              <CardContent className="p-4">
                <Tabs defaultValue="filters">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="filters">Filters</TabsTrigger>
                    <TabsTrigger value="tags">Tags</TabsTrigger>
                  </TabsList>
                  <TabsContent value="filters" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Event</Label>
                      <Select
                        value={selectedEvent}
                        onValueChange={setSelectedEvent}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Events" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all_events">All Events</SelectItem>
                          {filters.events.map((event) => (
                            <SelectItem key={event} value={event}>
                              {event}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Select
                        value={selectedDate}
                        onValueChange={setSelectedDate}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Dates" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all_dates">All Dates</SelectItem>
                          {filters.dates.map((date) => {
                            const formattedDate = new Date(
                              date,
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            });
                            return (
                              <SelectItem key={date} value={date}>
                                {formattedDate}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedEvent("all_events");
                        setSelectedDate("all_dates");
                        setSelectedTags([]);
                      }}
                    >
                      Clear Filters
                    </Button>
                  </TabsContent>

                  <TabsContent value="tags" className="pt-4">
                    <ScrollArea className="h-[200px] pr-4">
                      <div className="space-y-2">
                        {filters.tags.map((tag) => (
                          <div
                            key={tag}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`tag-${tag}`}
                              checked={selectedTags.includes(tag)}
                              onCheckedChange={() => handleTagToggle(tag)}
                            />
                            <Label
                              htmlFor={`tag-${tag}`}
                              className="cursor-pointer"
                            >
                              {tag}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="text-sm text-muted-foreground">
              Showing {filteredPhotos.length} of {photos.length} photos
            </div>
          </div>

          <div className="w-full md:w-3/4">
            {filteredPhotos.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-lg p-6 text-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No photos found</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPhotos.map((photo) => (
                  <Card key={photo.id} className="overflow-hidden group">
                    <div className="relative">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="mr-2"
                          onClick={() => handlePhotoClick(photo)}
                        >
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="mr-2"
                          onClick={() => handleLikeToggle(photo.id)}
                        >
                          <Heart
                            className={`h-4 w-4 ${photo.liked ? "fill-red-500 text-red-500" : ""}`}
                          />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => handleAddToCart(photo)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium truncate">
                            {photo.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {photo.event}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(photo.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        {photo.liked && (
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {photo.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {photo.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{photo.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredPhotos.map((photo) => (
                  <Card key={photo.id} className="overflow-hidden">
                    <div className="flex p-4">
                      <div className="w-24 h-24 mr-4 flex-shrink-0">
                        <img
                          src={photo.src}
                          alt={photo.title}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{photo.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {photo.event}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(photo.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handlePhotoClick(photo)}
                            >
                              <ZoomIn className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleLikeToggle(photo.id)}
                            >
                              <Heart
                                className={`h-4 w-4 ${photo.liked ? "fill-red-500 text-red-500" : ""}`}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleAddToCart(photo)}
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {photo.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          {selectedPhoto && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedPhoto.title}</DialogTitle>
                <DialogDescription>
                  {selectedPhoto.event} -{" "}
                  {new Date(selectedPhoto.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="w-full max-h-[60vh] object-contain rounded-md"
                />
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex flex-wrap gap-1">
                  {selectedPhoto.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLikeToggle(selectedPhoto.id)}
                  >
                    <Heart
                      className={`h-4 w-4 mr-2 ${selectedPhoto.liked ? "fill-red-500 text-red-500" : ""}`}
                    />
                    {selectedPhoto.liked ? "Liked" : "Like"}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      handleAddToCart(selectedPhoto);
                      setIsDialogOpen(false);
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotoGallery;
