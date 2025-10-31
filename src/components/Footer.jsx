import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const googlePlay =
  "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-gray-300 pt-12">
      {/* Upper Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 border-b border-gray-700 pb-10">
        {/* Brand */}
        <div>
          <h2 className="text-white text-lg font-bold mb-4">URBANSTYLE</h2>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-white font-semibold mb-4">Account</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Account Info</a></li>
            <li><a href="#">Orders</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Wishlist</a></li>
            <li><a href="#">Notification Settings</a></li>
            <li><a href="#">Buy Gift Vouchers</a></li>
          </ul>
        </div>

        {/* Client Concierge */}
        <div>
          <h3 className="text-white font-semibold mb-4">Client Concierge</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Help Centre</a></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Payment Options</a></li>
            <li><a href="#">Delivery Options</a></li>
            <li><a href="#">Click & Collect</a></li>
            <li><a href="#">Returns Policy</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* The Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">The Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Reviews</a></li>
            <li><a href="#">Tech Careers</a></li>
            <li><a href="#">Marketing Services</a></li>
            <li><a href="#">Corporate Gifts</a></li>
          </ul>
        </div>

        {/* Download the App + Connect */}
        <div>
          <h3 className="text-white font-semibold mb-4">Download the App</h3>
          <div className="space-y-3">
            <img src={googlePlay} alt="Google Play" className="h-10" />
          </div>

          <div className="mt-6">
            <h3 className="text-white font-semibold mb-2">Connect With Us</h3>
            <div className="flex space-x-4">
              <Facebook size={20} />
              <Instagram size={20} />
              <Twitter size={20} />
              <Youtube size={20} />
            </div>

            <button className="mt-4 border border-white px-4 py-2 text-sm text-white hover:bg-white hover:text-black transition">
              READ OUR BLOG
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-black py-4 text-center text-xs text-gray-400">
        <div className="flex flex-wrap justify-center gap-4 mb-2">
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Shopping Glossary</a>
          <a href="#">Dresses Glossary</a>
          <a href="#">Sneakers Glossary</a>
          <a href="#">Home + Living Glossary</a>
          <a href="#">Black Friday</a>
        </div>
        <p className="text-gray-500 mt-2">© 2025 UrbanStyle. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
