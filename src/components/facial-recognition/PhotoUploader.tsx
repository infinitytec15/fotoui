import React, { useState, useRef } from "react";
import { Camera, Upload, X, Image as ImageIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PhotoUploaderProps {
  onPhotoSelected?: (file: File, previewUrl: string) => void;
  onPhotoRemoved?: () => void;
  isProcessing?: boolean;
  processingProgress?: number;
  allowWebcam?: boolean;
}

const PhotoUploader = ({
  onPhotoSelected = () => {},
  onPhotoRemoved = () => {},
  isProcessing = false,
  processingProgress = 0,
  allowWebcam = true,
}: PhotoUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onPhotoSelected(file, result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onPhotoRemoved();
  };

  const handleWebcamToggle = async () => {
    if (isWebcamActive) {
      // Turn off webcam
      if (webcamRef.current && webcamRef.current.srcObject) {
        const stream = webcamRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        webcamRef.current.srcObject = null;
      }
      setIsWebcamActive(false);
    } else {
      // Turn on webcam
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }
        setIsWebcamActive(true);
      } catch (err) {
        console.error("Error accessing webcam:", err);
        alert("Could not access webcam. Please check permissions.");
      }
    }
  };

  const capturePhoto = () => {
    if (webcamRef.current && canvasRef.current) {
      const video = webcamRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the current video frame to the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to data URL
        const imageDataUrl = canvas.toDataURL("image/jpeg");
        setPreviewUrl(imageDataUrl);

        // Convert data URL to Blob/File for processing
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "webcam-capture.jpg", {
              type: "image/jpeg",
            });
            onPhotoSelected(file, imageDataUrl);
          }
        }, "image/jpeg");

        // Turn off webcam
        handleWebcamToggle();
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-xl">Upload a Photo</CardTitle>
        <CardDescription>
          Upload a clear photo of your child to find their school photos
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!previewUrl ? (
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-64 transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary"}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isWebcamActive ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <video
                  ref={webcamRef}
                  autoPlay
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
                <canvas ref={canvasRef} className="hidden" />
                <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2 z-10">
                  <Button onClick={capturePhoto} variant="secondary">
                    Take Photo
                  </Button>
                  <Button onClick={handleWebcamToggle} variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <div className="text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                    >
                      <span onClick={() => fileInputRef.current?.click()}>
                        Upload a file
                      </span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="relative rounded-lg overflow-hidden h-64">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full bg-white/80 hover:bg-white"
                      onClick={handleRemovePhoto}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove photo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {isProcessing && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                <RefreshCw className="h-8 w-8 animate-spin mb-2" />
                <p className="text-sm font-medium mb-2">Processing image...</p>
                <div className="w-3/4">
                  <Progress value={processingProgress} className="h-1.5" />
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!previewUrl && allowWebcam && (
          <Button
            variant="outline"
            onClick={handleWebcamToggle}
            className="flex items-center"
            disabled={isWebcamActive}
          >
            <Camera className="mr-2 h-4 w-4" />
            Use Webcam
          </Button>
        )}
        {previewUrl && (
          <Button
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
            variant="outline"
            className="flex items-center"
            disabled={isProcessing}
          >
            <Upload className="mr-2 h-4 w-4" />
            Change Photo
          </Button>
        )}
        {previewUrl && <Button disabled={isProcessing}>Continue</Button>}
      </CardFooter>
    </Card>
  );
};

export default PhotoUploader;
