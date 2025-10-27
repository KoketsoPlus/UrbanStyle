import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.config";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Load Stripe outside component render
const stripePromise = loadStripe(
  "pk_test_51SMnKeQikMFRjGqcNU5COIIigJj6hKn328DC5sVjAZXAFzpLUIe5cMSTewPKA6VW0V92PnBs34nuOuOmP73amYoL00f7Y6qg5X"
);

function CheckoutForm() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [userData, setUserData] = useState(null);

  // Calculate total safely
  const getTotal = () =>
    cart
      .reduce(
        (sum, item) =>
          sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
        0
      )
      .toFixed(2);

  // Fetch current user data
  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setUserData(docSnap.data());
      }
    };
    fetchUser();
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("You must be logged in to pay!");
      navigate("/login");
      return;
    }

    if (!stripe || !elements) return;

    // ✅ Simulate test payment
    alert("Payment successful! ✅ Your order has been placed.");

    // Save order to Firestore
    const order = {
      items: cart.map((item) => ({
        name: item.alt,
        size: item.size,
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
      })),
      total: getTotal(),
      createdAt: new Date().toISOString(),
      orderId: Math.floor(Math.random() * 1000000),
    };

    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { orders: arrayUnion(order) });
    } catch (err) {
      console.error("Error saving order:", err);
    }

    navigate("/profile");
  };

  return (
    <form onSubmit={handlePayment} className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Order Summary */}
      <div className="border p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item, i) => (
              <li key={i} className="flex justify-between">
                <span>
                  {item.alt} (Size: {item.size}) x {item.quantity || 1}
                </span>
                <span>
                  R
                  {(
                    (Number(item.price) || 0) *
                    (Number(item.quantity) || 1)
                  ).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 font-bold text-lg text-right">
          Total: R{getTotal()}
        </div>
      </div>

      {/* Stripe Card */}
      <div className="border p-4 rounded mb-4">
        <CardElement />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Pay Now
      </button>
    </form>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
