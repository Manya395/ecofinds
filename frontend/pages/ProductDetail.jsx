import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <img src="https://via.placeholder.com/300" alt="Product" className="w-full h-64 object-cover rounded" />
      <h2 className="text-2xl font-bold mt-4">Product {id}</h2>
      <p className="text-gray-700">Category: Sample Category</p>
      <p className="text-green-600 font-bold text-xl mt-2">₹1200</p>
      <p className="mt-2">This is a placeholder product description.</p>
      <button className="mt-4 w-full bg-green-600 text-white py-2 rounded">Add to Cart</button>
    </div>
  );
}

export default ProductDetail;
