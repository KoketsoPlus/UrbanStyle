export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded"/>
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-500">${product.price}</p>
      <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
}
