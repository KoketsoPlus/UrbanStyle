import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";  // <-- Import context hook

import hourglass1 from "../assets/outfits/hourglass1.avif";
import hourglass2 from "../assets/outfits/hourglass2.avif";
import hourglass3 from "../assets/outfits/hourglass3.avif";
import hourglass4 from "../assets/outfits/hourglass4.avif";

const fallbackImages = [
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1485231183945-fffde7cb39ac?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
];

const outfits = [
  { id: "hourglass1", image: hourglass1, alt: "dress", price: 899, sizes: ["S", "M", "L", "XL"] },
  { id: "hourglass2", image: hourglass2, alt: "pleather skirt and top", price: 879, sizes: ["S", "XL"] },
  { id: "hourglass3", image: hourglass3, alt: "skirt", price: 459, sizes: ["M", "L", "XL"] },
  { id: "hourglass4", image: hourglass4, alt: "jumpsuit", price: 699, sizes: ["S", "L", "XL"] },
];

export default function Hourglass() {
  const [imageErrors, setImageErrors] = useState({});
  const { addToCart, addToWishlist } = useCart();  // <-- Use context methods
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  const handleImageError = (outfitId) => {
    setImageErrors((prev) => ({ ...prev, [outfitId]: true }));
  };

  const getImageSrc = (outfit) => {
    if (imageErrors[outfit.id]) {
      return fallbackImages[outfit.id.split('hourglass')[1] - 1];  // Adjust fallback based on id
    }
    return outfit.image;
  };

  const handleAddToWishlist = (outfit) => {
    addToWishlist(outfit);
  };

  const openSizeModal = (outfit, e) => {
    e.preventDefault(); // Prevent link navigation when clicking add to cart button
    setSelectedOutfit(outfit);
    setSelectedSize("");
    setShowSizeModal(true);
  };

  const handleAddToCart = () => {
    if (selectedOutfit && selectedSize) {
      addToCart({ ...selectedOutfit, size: selectedSize }); // <-- Add to cart via context
      setShowSizeModal(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold text-center mb-2 text-gray-900">Hourglass Outfit Styles</h1>
      <p className="text-center text-gray-600 mb-10">
        Hourglass-shaped bodies have balanced bust and hips with a well-defined, 
        narrow waist. The goal is to accentuate natural curves and highlight the waistline for a classic, feminine silhouette.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {outfits.map((outfit) => (
          <Link
            to={`/product/${outfit.id}`}
            key={outfit.id}
            className="overflow-hidden rounded-2xl shadow-md hover:scale-105 transition-transform duration-300 bg-gray-50 p-4 flex flex-col"
          >
            <img
              src={getImageSrc(outfit)}
              alt={outfit.alt}
              className="w-full h-80 object-cover mb-4 rounded-xl"
              onError={() => handleImageError(outfit.id)}
              loading="lazy"
              decoding="async"
              style={{ transform: "scale(0.9)", transformOrigin: "center center" }}
            />
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-lg">R{outfit.price}</span>
              <div className="flex space-x-3">
                <button
                  aria-label="Add to wishlist"
                  onClick={(e) => {
                    e.preventDefault(); // prevent navigation on click
                    handleAddToWishlist(outfit);
                  }}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <Sparkles size={22} />
                </button>
                <button
                  aria-label="Add to cart"
                  onClick={(e) => openSizeModal(outfit, e)}
                  className="text-gray-400 hover:text-green-600 transition"
                >
                  <ShoppingBag size={22} />
                </button>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700">{outfit.alt}</p>
          </Link>
        ))}
      </div>

      {showSizeModal && selectedOutfit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-xl shadow-lg min-w-[300px]">
            <h3 className="mb-4 text-xl font-bold">Choose Size for {selectedOutfit.alt}</h3>
            <div className="mb-6 flex flex-wrap gap-3">
              {selectedOutfit.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedSize === size ? "bg-green-600 text-white" : "bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowSizeModal(false)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                disabled={!selectedSize}
                onClick={handleAddToCart}
                className={`px-4 py-2 rounded ${
                  selectedSize ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500"
                }`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
