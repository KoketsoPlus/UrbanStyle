import { X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ProductModal({ product, onClose }) {
  const { addToCart, addToWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState("");

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    addToCart(product, selectedSize);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <X />
        </button>
        <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded mb-4" />
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-500 mb-2">By {product.brand}</p>
        <p className="text-xl font-bold mb-4">{product.price}</p>

        <label className="block mb-2 font-semibold">Select Size</label>
        <div className="flex gap-2 mb-4">
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`border rounded px-3 py-1 ${
                selectedSize === size ? "bg-black text-white" : "bg-white"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Add to Cart
          </button>
          <button
            onClick={() => addToWishlist(product)}
            className="flex-1 border border-gray-400 py-2 rounded hover:bg-gray-100"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
