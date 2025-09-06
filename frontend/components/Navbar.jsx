import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold">EcoFinds</Link>
        <nav className="space-x-4 hidden md:flex">
          <Link to="/">Feed</Link>
          <Link to="/my-listings">My Listings</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/purchases">Purchases</Link>
        </nav>
        <div>
          <Link to="/login" className="bg-white text-green-600 px-3 py-1 rounded-md font-semibold">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
