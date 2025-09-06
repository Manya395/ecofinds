import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Feed from "./pages/Feed";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import MyListings from "./pages/MyListings";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Purchases from "./pages/Purchases";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/my-listings" element={<MyListings />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/purchases" element={<Purchases />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
