import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, addToCart, removeFromCart } = useCart();

  // Aggregate quantities by product ID + size
  const cartMap = cart.reduce((acc, item) => {
    const key = `${item.id}-${item.size}`;
    if (!acc[key]) {
      acc[key] = { ...item, quantity: 1 };
    } else {
      acc[key].quantity += 1;
    }
    return acc;
  }, {});

  const cartItems = Object.values(cartMap);

  const increaseQuantity = (item) => {
    addToCart(item, item.size);
  };

  const decreaseQuantity = (item) => {
    // Call removeFromCart to decrement quantity or remove item
    removeFromCart(item, item.size);
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
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
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item)}
                    className="bg-gray-200 px-3 py-1 rounded"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item)}
                    className="bg-gray-200 px-3 py-1 rounded"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-right font-bold text-xl">
            Total: R{getTotal()}
          </div>
          <div className="mt-6 text-right">
            <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
