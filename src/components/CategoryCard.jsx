export default function CategoryCard({ name, image }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer">
      <img src={image} alt={name} className="w-full h-48 object-cover"/>
      <h3 className="text-center font-semibold text-lg py-2">{name}</h3>
    </div>
  );
}
