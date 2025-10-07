import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="text-center mt-20">
      <h1 className="text-4xl font-bold text-blue-700">Welcome to Phone Store</h1>
      <p className="mt-4 text-gray-600">Find your favorite phone at the best price!</p>
      <Link to="/products" className="mt-6 inline-block bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition">View Products</Link>
    </section>
  );
}
