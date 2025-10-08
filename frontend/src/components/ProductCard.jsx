import React from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios_client";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const discount = product.discountPercent > 0 ? `-${product.discountPercent}%` : null;
  const finalPrice =
    product.finalPrice ||
    product.basePrice - (product.basePrice * (product.discountPercent || 0)) / 100;

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      const res = await api.post("/cart/add", {
        productId: product._id,
        variant: product.variants?.[0] || null,
        quantity: 1,
      });
      alert("✅ " + res.data.message);
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Lỗi khi thêm vào giỏ hàng"));
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="cursor-pointer border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white flex flex-col"
    >
      {/* Ảnh sản phẩm */}
      <div className="relative">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/400x400?text=No+Image"}
          alt={product.name}
          className="w-full h-72 object-cover"
        />

        <span className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-2 py-1 rounded-md">
          Nổi bật
        </span>

        {discount && (
          <span className="absolute top-3 right-3 bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-1 rounded-md">
            {discount}
          </span>
        )}
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-col justify-between flex-1 p-4">
        <div>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>

          {/* Đánh giá */}
          <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
            <span>⭐</span>
            <span className="text-gray-800 font-medium">
              {product.ratingAvg?.toFixed(1) || "0.0"}
            </span>
            <span className="text-gray-500 text-xs">
              ({product.ratingCount || 0})
            </span>
          </div>

          {/* Giá */}
          <div className="mt-2">
            <p className="text-lg font-bold text-gray-900">
              {finalPrice.toLocaleString()}đ
            </p>
            {product.discountPercent > 0 && (
              <p className="text-sm text-gray-400 line-through">
                {product.basePrice.toLocaleString()}đ
              </p>
            )}
          </div>
        </div>

        {/* Nút thêm vào giỏ */}
        <button
          onClick={handleAddToCart}
          className="mt-5 w-full bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition"
        >
          <ShoppingCart size={16} />
          <span className="text-sm font-medium">Thêm vào giỏ</span>
        </button>
      </div>
    </div>
  );
}

