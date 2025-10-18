import { useState } from "react";
import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    name: "Floral Dress",
    price: 49.99,
    image: "/images/dress1.jpg",
    suitableShapes: ["Hourglass", "Pear"]
  },
  {
    id: 2,
    name: "Summer Top",
    price: 29.99,
    image: "/images/top1.jpg",
    suitableShapes: ["Apple", "Rectangle"]
  },
];

const shapes = ["All", "Hourglass", "Pear", "Apple", "Rectangle"];

export default function Shop() {
  const [selectedShape, setSelectedShape] = useState("All");

  const filteredProducts = selectedShape === "All" 
    ? products 
    : products.filter(p => p.suitableShapes.includes(selectedShape));

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Shop Products</h2>
      <div className="flex justify-center mb-6 space-x-4">
        {shapes.map((shape) => (
          <button
            key={shape}
            onClick={() => setSelectedShape(shape)}
            className={`px-4 py-2 rounded ${
              selectedShape === shape ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {shape}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
