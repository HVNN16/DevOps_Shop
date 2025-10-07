import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="cursor-pointer border rounded-lg p-4 shadow hover:shadow-lg transition"
    >
      <img
        src={product.images?.[0] || "https://via.placeholder.com/200"}
        alt={product.name}
        className="w-full h-40 object-cover mb-2 rounded"
      />
      <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
      <p className="text-gray-600 text-xs">{product.brand}</p>
      <p className="text-red-600 font-bold mt-1">
        {product.finalPrice?.toLocaleString()} đ
      </p>
    </div>
  );
}
