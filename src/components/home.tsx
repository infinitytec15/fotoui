import React, { useState } from "react";
import { motion } from "framer-motion";

// Components
import DashboardGrid from "./dashboard/DashboardGrid";
import FacialRecognitionPanel from "./facial-recognition/FacialRecognitionPanel";
import PhotoGallery from "./photos/PhotoGallery";
import ProductCustomizer from "./products/ProductCustomizer";
import ShoppingCart from "./cart/ShoppingCart";
import OrderHistory from "./orders/OrderHistory";
import QRCodeScanner from "./auth/QRCodeScanner";

const Home = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Handle QR code scan success
  const handleQRScanSuccess = (code: string) => {
    console.log(`Authentication successful with code: ${code}`);
    setIsAuthenticated(true);
    setIsQRScannerOpen(false);
  };

  // Handle QR code scan error
  const handleQRScanError = (error: string) => {
    console.error(`Authentication error: ${error}`);
    // In a real app, you would show an error message to the user
  };

  // Handle dashboard action selection
  const handleActionSelect = (action: string) => {
    switch (action) {
      case "facial-recognition":
        setActiveSection("facial-recognition");
        break;
      case "browse-photos":
        setActiveSection("photo-gallery");
        break;
      case "view-orders":
        setActiveSection("order-history");
        break;
      default:
        setActiveSection("dashboard");
    }
  };

  // Handle photo selection from facial recognition or gallery
  const handlePhotoSelect = (photo: any) => {
    setSelectedPhoto(typeof photo === "string" ? photo : photo.src);
    setActiveSection("product-customizer");
  };

  // Handle add to cart action
  const handleAddToCart = () => {
    setActiveSection("shopping-cart");
  };

  // Handle continue shopping action
  const handleContinueShopping = () => {
    setActiveSection("dashboard");
  };

  // Handle checkout action
  const handleCheckout = () => {
    console.log("Proceeding to checkout");
    // In a real app, you would navigate to the checkout page
  };

  // Render the appropriate section based on activeSection state
  const renderSection = () => {
    switch (activeSection) {
      case "facial-recognition":
        return (
          <FacialRecognitionPanel
            onMatchFound={(photos) => {
              // In a real app, this would handle the matched photos
              console.log("Matched photos:", photos);
            }}
          />
        );
      case "photo-gallery":
        return (
          <PhotoGallery
            onSelectPhoto={handlePhotoSelect}
            onAddToCart={(photo) => {
              handlePhotoSelect(photo);
            }}
          />
        );
      case "product-customizer":
        return (
          <ProductCustomizer
            selectedPhoto={selectedPhoto || undefined}
            onAddToCart={handleAddToCart}
            onBack={() => setActiveSection("photo-gallery")}
            onNext={handleAddToCart}
          />
        );
      case "shopping-cart":
        return (
          <ShoppingCart
            onContinueShopping={handleContinueShopping}
            onCheckout={handleCheckout}
          />
        );
      case "order-history":
        return <OrderHistory />;
      default:
        return <DashboardGrid onActionSelect={handleActionSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* QR Code Scanner for Authentication */}
      {!isAuthenticated && (
        <QRCodeScanner
          isOpen={isQRScannerOpen}
          onSuccess={handleQRScanSuccess}
          onError={handleQRScanError}
        />
      )}

      {/* Main Content */}
      {isAuthenticated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto py-8 px-4"
        >
          {/* Navigation Breadcrumbs */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <button
                    onClick={() => setActiveSection("dashboard")}
                    className={`inline-flex items-center text-sm font-medium ${activeSection === "dashboard" ? "text-primary" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    Home
                  </button>
                </li>
                {activeSection !== "dashboard" && (
                  <li>
                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 text-gray-400 mx-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                      <span className="text-sm font-medium text-gray-500 md:ml-2">
                        {activeSection === "facial-recognition" &&
                          "Find Photos by Face"}
                        {activeSection === "photo-gallery" && "Browse Photos"}
                        {activeSection === "product-customizer" &&
                          "Customize Product"}
                        {activeSection === "shopping-cart" && "Shopping Cart"}
                        {activeSection === "order-history" && "Order History"}
                      </span>
                    </div>
                  </li>
                )}
              </ol>
            </nav>
          </div>

          {/* Main Content Section */}
          {renderSection()}
        </motion.div>
      )}
    </div>
  );
};

export default Home;
