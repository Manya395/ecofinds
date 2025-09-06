import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
      <img
        src={product.image || "https://via.placeholder.com/150"}
        alt={product.title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
      <p className="text-green-600 font-bold">₹{product.price}</p>
      <Link
        to={`/product/${product.id}`}
        className="block text-center mt-2 bg-green-600 text-white py-1 rounded-md"
      >
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;
