import React, { useEffect, useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios_client";

export default function ProductCard({ product, onRemoveWishlist }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  // 🔹 Check wishlist in localStorage
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setLiked(wishlist.includes(product._id));
  }, [product._id]);

  // 🔹 Toggle wishlist
  const handleWishlist = async (e) => {
    e.stopPropagation(); // tránh click vào card

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vui lòng đăng nhập để sử dụng Wishlist ♥");
        navigate("/login");
        return;
      }

      await api.post(`/wishlist/${product._id}`);

      // cập nhật UI
      setLiked((prev) => !prev);

      // cập nhật localStorage (client cache)
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (wishlist.includes(product._id)) {
        wishlist = wishlist.filter((id) => id !== product._id);
      } else {
        wishlist.push(product._id);
      }
      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      window.dispatchEvent(new Event("wishlistUpdated"));

    } catch (err) {
      console.error("❌ Wishlist Error:", err);
      alert("Không thể cập nhật wishlist.");
    }
  };

  // 🔹 Tính giá cuối cùng
  const discount =
    product.discountPercent > 0 ? `-${product.discountPercent}%` : null;

  const finalPrice =
    product.finalPrice ||
    product.basePrice -
      (product.basePrice * (product.discountPercent || 0)) / 100;

  // 🔹 Thêm vào giỏ
  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      const res = await api.post("/cart/add", {
        productId: product._id,
        variant: product.variants?.[0] || null,
        quantity: 1,
      });

      alert("✅ " + (res.data.message || "Đã thêm vào giỏ hàng"));
      window.dispatchEvent(new Event("cartUpdated"));

    } catch (err) {
      console.error("POST /cart/add:", err.response?.data || err);
      alert("❌ Lỗi khi thêm vào giỏ hàng");
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
          src={
            product.images?.[0] ||
            "https://via.placeholder.com/400x400?text=No+Image"
          }
          alt={product.name}
          className="w-full h-72 object-cover"
        />

        {/* Label nổi bật */}
        <span className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-2 py-1 rounded-md">
          Nổi bật
        </span>

        {/* Giảm giá */}
        {discount && (
          <span className="absolute top-3 right-3 bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-1 rounded-md">
            {discount}
          </span>
        )}

        {/* ❤️ Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow hover:shadow-md transition text-gray-500 hover:text-red-500"
        >
          <Heart
            size={18}
            className={`transition ${
              liked ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-col justify-between flex-1 p-4">
        <div>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>

          {/* ⭐ Hiển thị rating đúng */}
          <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
            <span>⭐</span>
            <span className="text-gray-800 font-medium">
              {product.averageRating?.toFixed(1) || "0.0"}
            </span>
            <span className="text-gray-500 text-xs">
              ({product.reviewCount || 0})
            </span>
          </div>

          {/* Giá */}
          <div className="mt-2">
            <p className="text-lg font-bold text-gray-900">
              {finalPrice.toLocaleString("vi-VN")}đ
            </p>
            {product.discountPercent > 0 && (
              <p className="text-sm text-gray-400 line-through">
                {product.basePrice.toLocaleString("vi-VN")}đ
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