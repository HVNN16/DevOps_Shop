import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../api/axios_client";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("❌ Error loading product:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to="/products"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-2xl shadow-lg">
        <img
          src={product.image || "https://via.placeholder.com/500x400?text=No+Image"}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg"
        />

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {product.name}
          </h1>
          <p className="text-lg text-gray-500 mb-2">{product.brand}</p>
          <p className="text-2xl text-blue-700 font-bold mb-4">
            ${product.price}
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            {product.description || "No description available."}
          </p>
          <button className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
