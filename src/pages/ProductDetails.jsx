// src/pages/ProductDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getProductById } from "../products";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, addToWishlist } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProductById(id)
      .then((data) => {
        if (data) {
          setProduct(data);
        } else {
          setError("Product not found");
        }
      })
      .catch(() => {
        setError("Error loading product");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart({ ...product, size: selectedSize });
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-lg">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  const {
    image,
    alt,
    price,
    eBPrice,
    title,
    brand,
    sizes = [],
    color,
    material,
    delivery,
    returns,
    description = [],
    model = {},
  } = product;

  return (
    <div className="max-w-6xl mt-8 mx-auto p-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Image */}
      <div className="flex justify-center">
        <img
          src={image}
          alt={alt || title}
          className="w-full max-w-md rounded-xl border shadow object-cover"
          style={{ maxHeight: "578px" }}
        />
      </div>
      {/* Details */}
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
        <div className="mb-1">
          <span className="text-2xl font-semibold">R{price}</span>
          {eBPrice && <span className="ml-4 text-gray-400 text-sm line-through">eB: {eBPrice}</span>}
        </div>
        <div className="mb-4 text-gray-700 font-medium">{alt}</div>

        {/* Sizes */}
        <div className="mb-6">
          <div className="block font-medium mb-2">Select a size:</div>
          <div className="flex gap-3 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-full border transition ${
                  selectedSize === size
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart & Wishlist */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`flex items-center gap-2 px-6 py-3 rounded ${
              selectedSize
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } transition`}
          >
            <ShoppingBag size={20} /> Add to Cart
          </button>
          <button
            onClick={handleAddToWishlist}
            className="flex items-center gap-2 px-6 py-3 border border-gray-400 text-gray-900 rounded hover:border-black transition"
          >
            <Sparkles size={20} /> Add to Wishlist
          </button>
        </div>

        {/* Shipping and Returns */}
        <div className="mb-8">
          <div className="text-sm font-semibold">Shipping:</div>
          <div className="text-gray-700 mb-4">{delivery}</div>
          <div className="text-sm font-semibold">Returns:</div>
          <div className="text-gray-700">{returns}</div>
        </div>

        {/* Product Details */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Product Details</h2>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            {description.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="grid grid-cols-2 text-sm gap-y-1 mb-6">
            <span className="font-semibold">Colour:</span> <span>{color}</span>
            <span className="font-semibold">Material:</span> <span>{material}</span>
            <span className="font-semibold">Brand:</span> <span>{brand}</span>
          </div>
        </div>

        {/* Model Info */}
        <div>
          <h2 className="font-semibold text-lg mb-2"></h2>
          <div className="grid grid-cols-2 gap-y-1 text-sm">
            {model.wears && (
              <>
                <span>Size:</span>
                <span>{model.wears}</span>
              </>
            )}
            {model.height && (
              <>
                <span>Height:</span>
                <span>{model.height}</span>
              </>
            )}
            {model.waist && (
              <>
                <span>Waist:</span>
                <span>{model.waist}</span>
              </>
            )}
            {model.bust && (
              <>
                <span>Bust:</span>
                <span>{model.bust}</span>
              </>
            )}
            {model.hip && (
              <>
                <span>Hip:</span>
                <span>{model.hip}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
