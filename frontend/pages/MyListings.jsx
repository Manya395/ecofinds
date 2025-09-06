function MyListings() {
  const myProducts = [
    { id: 1, title: "Old Phone", price: 500 },
    { id: 2, title: "Books", price: 200 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Listings</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {myProducts.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-green-600 font-bold">₹{p.price}</p>
            <div className="flex gap-2 mt-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
              <button className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListings;
