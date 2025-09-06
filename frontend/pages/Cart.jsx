function Cart() {
  const cartItems = [
    { id: 1, title: "Shoes", price: 900 },
    { id: 2, title: "Lamp", price: 300 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-green-600">₹{item.price}</p>
            </div>
            <button className="bg-red-600 text-white px-3 py-1 rounded">Remove</button>
          </div>
        ))}
      </div>
      <button className="mt-6 w-full bg-green-600 text-white py-2 rounded">Checkout</button>
    </div>
  );
}

export default Cart;
