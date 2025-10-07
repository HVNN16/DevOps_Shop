import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">📱 PhoneStore</Link>
      <nav className="space-x-4">
        <Link to="/products">Products</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
}
