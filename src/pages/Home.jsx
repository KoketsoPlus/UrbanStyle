import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";

// Import images
import hourglass from "../assets/avatars/hourglass.jpg";
import pear from "../assets/avatars/inverted-triangle.jpg";
import apple from "../assets/avatars/apple.jpg";
import rectangle from "../assets/avatars/rectangle.jpg";

const categories = [
  { name: "Hourglass", image: hourglass },
  { name: "InvertedTraingle", image: pear },
  { name: "Apple", image: apple },
  { name: "Rectangle", image: rectangle },
];

export default function Home() {
  return (
    <div>
      <Hero />

      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Shop by Body Shape</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/${cat.name.toLowerCase()}`}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <CategoryCard name={cat.name} image={cat.image} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
