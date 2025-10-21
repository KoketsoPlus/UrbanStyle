import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Hourglass from "./pages/Hourglass";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Rectangle from "./pages/Rectangle";
import Apple from "./pages/Apple";
import InvertedTriangle from "./pages/InvertedTriangle";
// Uncomment and import these when implemented
// import Wishlist from "./pages/Wishlist";
// import Profile from "./pages/Profile";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Navbar is context-aware */}
          <Navbar />
          {/* Main application pages */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hourglass" element={<Hourglass />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/rectangle" element={<Rectangle />} />
              <Route path="/apple" element={<Apple />} />
              <Route path="/invertedtriangle" element={<InvertedTriangle />} />
              {/* Uncomment when these routes/pages exist */}
              {/* <Route path="/wishlist" element={<Wishlist />} /> */}
              {/* <Route path="/profile" element={<Profile />} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
