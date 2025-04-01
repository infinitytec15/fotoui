import React, { useState, useRef, useEffect } from "react";
import { Camera, QrCodeIcon, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface QRCodeScannerProps {
  onSuccess?: (code: string) => void;
  onError?: (error: string) => void;
  isOpen?: boolean;
  title?: string;
  description?: string;
}

const QRCodeScanner = ({
  onSuccess = (code) => console.log(`QR Code scanned: ${code}`),
  onError = (error) => console.error(`QR Code error: ${error}`),
  isOpen = true,
  title = "Scan QR Code",
  description = "Scan the unique QR code provided by your school to access your child's photos.",
}: QRCodeScannerProps) => {
  const [scanning, setScanning] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  // Simulate QR code scanning
  const startScanning = () => {
    setScanning(true);
    setScanResult(null);

    // In a real implementation, this would initialize the camera and QR code scanner
    // For this UI scaffolding, we'll simulate a successful scan after a delay
    setTimeout(() => {
      const mockSuccess = Math.random() > 0.3; // 70% chance of success for demo purposes

      if (mockSuccess) {
        const mockCode =
          "SCHOOL-" +
          Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0");
        setScanResult({
          success: true,
          message: `Successfully scanned code: ${mockCode}`,
        });
        onSuccess(mockCode);
      } else {
        setScanResult({
          success: false,
          message: "Could not detect a valid QR code. Please try again.",
        });
        onError("QR code detection failed");
      }

      setScanning(false);
    }, 3000);
  };

  const stopScanning = () => {
    setScanning(false);
    // In a real implementation, this would stop the camera stream
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.trim().length < 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid access code (minimum 6 characters)",
        variant: "destructive",
      });
      return;
    }

    setScanResult({
      success: true,
      message: `Access code accepted: ${accessCode}`,
    });
    onSuccess(accessCode);
    setAccessCode("");
    setManualEntry(false);
  };

  // Clean up camera resources when component unmounts
  useEffect(() => {
    return () => {
      if (scanning) {
        stopScanning();
      }
    };
  }, [scanning]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCodeIcon className="h-6 w-6 text-primary" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center space-y-4">
          {!manualEntry ? (
            <>
              <Card className="w-full bg-gray-50">
                <CardContent className="p-0 overflow-hidden relative">
                  <div className="aspect-square relative bg-black flex items-center justify-center">
                    {scanning ? (
                      <>
                        <video
                          ref={videoRef}
                          className="w-full h-full object-cover"
                          autoPlay
                          playsInline
                          muted
                        />
                        <motion.div
                          className="absolute inset-0 border-2 border-primary z-10 pointer-events-none"
                          animate={{
                            top: ["0%", "80%", "0%"],
                          }}
                          transition={{
                            duration: 2.5,
                            ease: "linear",
                            repeat: Infinity,
                          }}
                          style={{
                            borderTopWidth: "3px",
                            borderBottomWidth: "3px",
                            height: "20%",
                          }}
                        />
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8 text-center">
                        {scanResult ? (
                          <div className="flex flex-col items-center space-y-2">
                            {scanResult.success ? (
                              <CheckCircle className="h-16 w-16 text-green-500" />
                            ) : (
                              <AlertCircle className="h-16 w-16 text-red-500" />
                            )}
                            <p className="text-sm font-medium text-white">
                              {scanResult.message}
                            </p>
                          </div>
                        ) : (
                          <>
                            <Camera className="h-16 w-16 text-gray-400 mb-4" />
                            <p className="text-gray-300">
                              Camera preview will appear here
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-4">
                  {scanning ? (
                    <Button variant="destructive" onClick={stopScanning}>
                      Cancel Scan
                    </Button>
                  ) : (
                    <Button
                      onClick={startScanning}
                      disabled={!!scanResult?.success}
                      className="w-full"
                    >
                      {scanResult?.success
                        ? "Scan Successful"
                        : "Start Scanning"}
                    </Button>
                  )}
                </CardFooter>
              </Card>

              <div className="flex items-center w-full space-x-2">
                <div className="flex-1 h-px bg-gray-200" />
                <p className="text-xs text-gray-400">OR</p>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <Button
                variant="outline"
                onClick={() => setManualEntry(true)}
                className="w-full"
              >
                Enter Access Code Manually
              </Button>
            </>
          ) : (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Manual Code Entry</CardTitle>
                <CardDescription>
                  Enter the access code provided by your school
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleManualSubmit} className="space-y-4">
                  <Input
                    placeholder="Enter access code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="text-center text-lg tracking-wider"
                  />
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setManualEntry(false)}
                      className="flex-1"
                    >
                      Back to Scanner
                    </Button>
                    <Button type="submit" className="flex-1">
                      Submit Code
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeScanner;
