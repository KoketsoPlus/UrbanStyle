import { User, ShoppingBag, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart, wishlist } = useCart();

  // Sum quantities or count as 1 if no quantity field
  const totalCartItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const totalWishlistItems = wishlist ? wishlist.length : 0;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-4xl font-bold tracking-wide hover:text-pink-500 transition"
        >
          UrbanStyle
        </Link>

        {/* Icon Menu */}
        <div className="flex items-center gap-6">
          {/* Wishlist icon with badge */}
          <Link to="/wishlist" className="relative hover:text-pink-500 transition">
            <Sparkles size={24} />
            {totalWishlistItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalWishlistItems}
              </span>
            )}
          </Link>

          {/* Cart icon with badge */}
          <Link to="/cart" className="relative hover:text-pink-500 transition">
            <ShoppingBag size={24} />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </Link>

          {/* Profile icon */}
          <Link to="/profile" className="hover:text-pink-500 transition">
            <User size={24} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
