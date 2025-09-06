function AddProduct() {
  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Product Title" className="w-full border p-2 rounded" />
        <select className="w-full border p-2 rounded">
          <option>Clothes</option>
          <option>Furniture</option>
          <option>Electronics</option>
        </select>
        <textarea placeholder="Description" className="w-full border p-2 rounded"></textarea>
        <input type="number" placeholder="Price" className="w-full border p-2 rounded" />
        <button className="w-full bg-green-600 text-white py-2 rounded">Submit Listing</button>
      </form>
    </div>
  );
}

export default AddProduct;
