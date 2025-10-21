export default function ProductCard({ product, onClick }) {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition transform cursor-pointer"
      onClick={() => onClick(product)}
    >
      <img src={product.image} alt={product.name} className="w-full h-80 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2">By {product.brand}</p>
        <p className="text-lg font-bold">{product.price}</p>
      </div>
    </div>
  );
}
