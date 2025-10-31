import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"; // AuthProvider import

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute"; // import ProtectedRoute

// Pages
import Home from "./pages/Home";
import Hourglass from "./pages/Hourglass";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Rectangle from "./pages/Rectangle";
import Apple from "./pages/Apple";
import InvertedTriangle from "./pages/InvertedTriangle";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout"; // checkout page import
import ProductDetails from "./pages/ProductDetails"; // Add ProductDetails import
import Contact from "./pages/Contact";

function App() {
  return (
    <AuthProvider> {/* Auth wrapped around everything */}
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hourglass" element={<Hourglass />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/rectangle" element={<Rectangle />} />
                <Route path="/apple" element={<Apple />} />
                <Route path="/invertedtriangle" element={<InvertedTriangle />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/contact" element={<Contact />} />


                {/* Product details dynamic route */}
                <Route path="/product/:id" element={<ProductDetails />} />

                {/* Protected profile page */}
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />

                {/* Protected checkout page */}
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />

                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
