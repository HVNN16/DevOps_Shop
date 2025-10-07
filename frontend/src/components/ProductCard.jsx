import { Link } from "react-router-dom";

export default function ProductCard({ p }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <div className="overflow-hidden">
        <img
          src={p.image || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={p.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
          {p.name}
        </h2>
        <p className="text-sm text-gray-500 mt-1">{p.brand}</p>
        <p className="text-2xl font-bold text-blue-700 mt-3">${p.price}</p>

        <Link
          to={`/products/${p._id}`}
          className="mt-4 inline-block w-full rounded-lg bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
