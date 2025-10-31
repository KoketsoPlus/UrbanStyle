import { useRef } from "react";
import FashionVideo from "../assets/videos/fashion-scroll.mp4"; // ✅ import video from src

export default function Hero() {
  // Create a ref for the section to scroll to
  const shapesSectionRef = useRef(null);

  // Scroll handler function
  const handleShopNowClick = () => {
    shapesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={FashionVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Text Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Find Your Perfect Fit
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Discover clothing styles designed for every body shape.
          </p>

          <button
            onClick={handleShopNowClick}
            className="inline-block bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold uppercase tracking-wide hover:bg-pink-600 transition"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Section to scroll to */}
      <div
        ref={shapesSectionRef}
        className="mt-12 pt-8 max-w-6xl mx-auto px-4"
        id="shapes-section"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Shop by Body Shape
        </h2>
        {/* Shapes filter UI or previews go here */}
      </div>
    </>
  );
}
