import React from "react";

export default function Hourglass() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* 🖼️ Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
        <img
          src="/src/assets/avatars/hourglass.png"
          alt="Hourglass Body Shape"
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Hourglass Shape
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Known for balanced proportions and a defined waist, the hourglass
            shape looks stunning in outfits that highlight your curves. Explore
            clothing that accentuates your natural silhouette effortlessly.
          </p>
          <a
            href="/shop"
            className="inline-block mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Shop Hourglass Styles
          </a>
        </div>
      </div>

      {/* 👗 Outfit Suggestions Section */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Outfit Suggestions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition transform">
          <img
            src="/src/assets/outfits/hourglass1.jpg"
            alt="Outfit 1"
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">Bodycon Dress</h3>
            <p className="text-gray-600 text-sm">
              Perfectly hugs your shape and emphasizes the waist.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition transform">
          <img
            src="/src/assets/outfits/hourglass2.jpg"
            alt="Outfit 2"
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">Wrap Top</h3>
            <p className="text-gray-600 text-sm">
              Creates a flattering neckline and highlights curves.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition transform">
          <img
            src="/src/assets/outfits/hourglass3.jpg"
            alt="Outfit 3"
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">High-Waisted Jeans</h3>
            <p className="text-gray-600 text-sm">
              Accentuates your waist and elongates the legs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
