import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // ✅ Correct auth variable

  // ✅ Combine items by product + size
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
    removeFromCart(item, item.size);
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // ✅ If not logged in → Signup page | If logged in → Checkout page
  const handleCheckout = () => {
    if (!currentUser) {
      navigate("/signup");
    } else {
      navigate("/checkout");
    }
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

                {/* ✅ Quantity Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item)}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item)}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* ✅ Total + Checkout */}
          <div className="mt-8 text-right font-bold text-xl">
            Total: R{getTotal()}
          </div>
          <div className="mt-6 text-right">
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
