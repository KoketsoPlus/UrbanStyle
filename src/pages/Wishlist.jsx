import React from "react";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { wishlist, addToCart, removeFromWishlist } = useCart();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <ul className="space-y-4">
          {wishlist.map((item) => (
            <li
              key={`${item.id}-${item.size}`}
              className="flex items-center gap-4 border-b pb-4"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="font-semibold">{item.alt}</h2>
                <p>Size: {item.size}</p>
                <p className="font-bold">R{item.price}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => addToCart(item)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
