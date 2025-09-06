function Purchases() {
  const pastOrders = [
    { id: 1, title: "Table", price: 1500 },
    { id: 2, title: "Headphones", price: 700 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Previous Purchases</h2>
      <ul className="space-y-3">
        {pastOrders.map((order) => (
          <li key={order.id} className="bg-white p-4 rounded shadow flex justify-between">
            <span>{order.title}</span>
            <span className="text-green-600 font-bold">₹{order.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Purchases;
