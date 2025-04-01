import React, { useState } from "react";
import { Search, Info, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import PhotoUploader from "./PhotoUploader";
import MatchResults from "./MatchResults";

interface FacialRecognitionPanelProps {
  onPhotoSelected?: (file: File, previewUrl: string) => void;
  onMatchFound?: (photos: any[]) => void;
  isProcessing?: boolean;
}

const FacialRecognitionPanel = ({
  onPhotoSelected = () => {},
  onMatchFound = () => {},
  isProcessing = false,
}: FacialRecognitionPanelProps) => {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Simulate processing progress
  React.useEffect(() => {
    if (isProcessing && processingProgress < 100) {
      const timer = setTimeout(() => {
        setProcessingProgress((prev) => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            setShowResults(true);
            setActiveTab("results");
            return 100;
          }
          return newProgress;
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isProcessing, processingProgress]);

  const handlePhotoSelected = (file: File, preview: string) => {
    setSelectedFile(file);
    setPreviewUrl(preview);
    setProcessingProgress(0);
    onPhotoSelected(file, preview);
  };

  const handlePhotoRemoved = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setProcessingProgress(0);
    setShowResults(false);
  };

  const handleSelectPhoto = (photo: any) => {
    console.log("Selected photo for products:", photo);
    // Here you would typically navigate to product customization
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto bg-gray-50 p-6 rounded-xl shadow-sm"
    >
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Find Your Child's Photos
            </h1>
            <p className="text-gray-500 mt-1">
              Upload a photo of your child to find all their school photos using
              facial recognition
            </p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  Our facial recognition technology helps you find all photos of
                  your child from school events. The uploaded photo is only used
                  for matching and is not stored permanently.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="upload" disabled={isProcessing}>
              <Search className="mr-2 h-4 w-4" /> Upload Photo
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!showResults}>
              <ArrowRight className="mr-2 h-4 w-4" /> View Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-0">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-1/2">
                <PhotoUploader
                  onPhotoSelected={handlePhotoSelected}
                  onPhotoRemoved={handlePhotoRemoved}
                  isProcessing={isProcessing}
                  processingProgress={processingProgress}
                  allowWebcam={true}
                />
              </div>
              <div className="w-full md:w-1/2">
                <Card>
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                    <CardDescription>
                      Our facial recognition system helps you find your child's
                      photos quickly
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-4">
                      <li className="flex gap-3">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                          1
                        </div>
                        <div>
                          <h3 className="font-medium">Upload a recent photo</h3>
                          <p className="text-sm text-gray-500">
                            Choose a clear, front-facing photo of your child's
                            face
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                          2
                        </div>
                        <div>
                          <h3 className="font-medium">
                            Facial recognition processing
                          </h3>
                          <p className="text-sm text-gray-500">
                            Our system analyzes the photo and searches the
                            school database
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                          3
                        </div>
                        <div>
                          <h3 className="font-medium">View matching photos</h3>
                          <p className="text-sm text-gray-500">
                            Browse all photos where your child appears and
                            select your favorites
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                          4
                        </div>
                        <div>
                          <h3 className="font-medium">
                            Create personalized products
                          </h3>
                          <p className="text-sm text-gray-500">
                            Use selected photos to create mugs, frames,
                            calendars and more
                          </p>
                        </div>
                      </li>
                    </ol>
                  </CardContent>
                  <CardFooter>
                    <p className="text-xs text-gray-500">
                      Your privacy is important to us. Uploaded photos are only
                      used for matching and are not stored permanently.
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="mt-0">
            <MatchResults
              onSelectPhoto={handleSelectPhoto}
              isLoading={isProcessing && !showResults}
            />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default FacialRecognitionPanel;
