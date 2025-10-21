import React, { useState } from "react";
import { ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";

import apple1 from "../assets/outfits/apple1.jpg";
import apple2 from "../assets/outfits/apple2.avif";
import apple3 from "../assets/outfits/apple3.avif";
import apple4 from "../assets/outfits/apple4.avif";

const fallbackImages = [
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1485231183945-fffde7cb39ac?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
];

const outfits = [
  { id: 1, image: apple1, alt: "Empire Waist Dress", price: 799, sizes: ["S", "M", "L", "XL"] },
  { id: 2, image: apple2, alt: "V-Neck Blouse", price: 879, sizes: ["S", "M", "L"] },
  { id: 3, image: apple3, alt: "A-Line Skirt", price: 459, sizes: ["M", "L", "XL"] },
  { id: 4, image: apple4, alt: "Jumpsuit", price: 699, sizes: ["S", "L", "XL"] },
];

export default function Apple() {
  const [imageErrors, setImageErrors] = useState({});
  const { addToCart, addToWishlist } = useCart();
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  const handleImageError = (outfitId) => {
    setImageErrors((prev) => ({ ...prev, [outfitId]: true }));
  };

  const getImageSrc = (outfit) => {
    if (imageErrors[outfit.id]) {
      return fallbackImages[outfit.id - 1];
    }
    return outfit.image;
  };

  const handleAddToWishlist = (outfit) => {
    addToWishlist(outfit);
  };

  const openSizeModal = (outfit) => {
    setSelectedOutfit(outfit);
    setSelectedSize("");
    setShowSizeModal(true);
  };

  const handleAddToCart = () => {
    if (selectedOutfit && selectedSize) {
      addToCart({ ...selectedOutfit, size: selectedSize });
      setShowSizeModal(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold text-center mb-2 text-gray-900">Apple Shape Outfit Styles</h1>
      <p className="text-center text-gray-600 mb-10">
        Apple-shaped bodies carry weight around the midsection with slimmer hips and legs. 
        The aim is to elongate the torso, define the waist, and draw attention to the legs and neckline, creating a balanced, 
        streamlined appearance.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {outfits.map((outfit) => (
          <div
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
                  onClick={() => handleAddToWishlist(outfit)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <Sparkles size={22} />
                </button>
                <button
                  aria-label="Add to cart"
                  onClick={() => openSizeModal(outfit)}
                  className="text-gray-400 hover:text-green-600 transition"
                >
                  <ShoppingBag size={22} />
                </button>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700">{outfit.alt}</p>
          </div>
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
