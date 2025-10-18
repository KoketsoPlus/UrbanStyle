import { User, ShoppingBag, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* 🔹 Logo */}
        <a href="/" className="text-4xl font-bold tracking-wide">
          UrbanStyle
        </a>

        {/* 🔹 Icon Menu */}
        <div className="flex items-center gap-6">
          <a href="/wishlist" className="hover:text-pink-500 transition">
            <Sparkles size={24} />
          </a>
          <a href="/cart" className="hover:text-pink-500 transition">
            <ShoppingBag size={24} />
          </a>
          <a href="/profile" className="hover:text-pink-500 transition">
            <User size={24} />
          </a>
        </div>
      </div>
    </nav>
  );
}
