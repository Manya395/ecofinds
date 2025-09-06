import ProductCard from "../components/ProductCard";

const dummyProducts = [
  { id: 1, title: "Vintage Jacket", price: 1200, category: "Clothes" },
  { id: 2, title: "Wooden Chair", price: 800, category: "Furniture" },
];

function Feed() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded-md w-1/2"
        />
        <select className="border px-3 py-2 rounded-md">
          <option>All Categories</option>
          <option>Clothes</option>
          <option>Furniture</option>
          <option>Electronics</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {dummyProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
