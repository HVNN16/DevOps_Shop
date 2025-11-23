import React, { useEffect, useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios_client";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  // 🔹 Wishlist
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setLiked(wishlist.includes(product._id));
  }, [product._id]);

  const handleWishlist = async (e) => {
    e.stopPropagation();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vui lòng đăng nhập để sử dụng Wishlist ♥");
        navigate("/login");
        return;
      }

      await api.post(`/wishlist/${product._id}`);

      // update UI
      setLiked((prev) => !prev);

      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (wishlist.includes(product._id)) {
        wishlist = wishlist.filter((id) => id !== product._id);
      } else {
        wishlist.push(product._id);
      }
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (err) {
      console.error("Wishlist Error:", err);
      alert("Không thể cập nhật wishlist.");
    }
  };

  // 🔹 Tính giá cuối cùng
  const finalPrice =
    product.finalPrice ||
    product.basePrice -
      (product.basePrice * (product.discountPercent || 0)) / 100;

  const discount =
    product.discountPercent > 0 ? `-${product.discountPercent}%` : null;

  // 🔹 Tồn kho tổng
  const totalStock =
    product.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) || 0;

  const isOutOfStock = totalStock <= 0;

  // 🔹 Add to cart
  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (isOutOfStock) {
      alert("Sản phẩm đã hết hàng");
      return;
    }

    try {
      const res = await api.post("/cart/add", {
        productId: product._id,
        variant: product.variants?.[0] || null,
        quantity: 1,
      });

      alert(res.data.message || "Đã thêm vào giỏ");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Cart Error:", err.response?.data || err);
      alert("Không thể thêm vào giỏ hàng");
    }
  };

  return (
    <div
      onClick={() => {
        if (!isOutOfStock) navigate(`/product/${product._id}`);
      }}
      className={`cursor-pointer border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white flex flex-col relative 
        ${isOutOfStock ? "opacity-70 cursor-not-allowed" : ""}`}
    >
      {/* Ảnh */}
      <div className="relative">
        <img
          src={
            product.images?.[0] ||
            "https://via.placeholder.com/400x400?text=No+Image"
          }
          alt={product.name}
          className="w-full h-72 object-cover"
        />

        {/* 🔥 Overlay chuyên nghiệp khi hết hàng */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
              HẾT HÀNG
            </span>
          </div>
        )}

        {/* Giảm giá */}
        {discount && (
          <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
            {discount}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow hover:shadow-md transition text-gray-500 hover:text-red-500"
        >
          <Heart
            size={18}
            className={`${liked ? "fill-red-500 text-red-500" : ""}`}
          />
        </button>
      </div>

      {/* Thông tin */}
      <div className="flex flex-col justify-between flex-1 p-4">
        <div>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>

          {/* ⭐ Rating */}
          <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
            <span>⭐</span>
            <span className="font-medium">
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
              <p className="line-through text-sm text-gray-400">
                {product.basePrice.toLocaleString("vi-VN")}đ
              </p>
            )}
          </div>
        </div>

        {/* Nút thêm vào giỏ */}
        {isOutOfStock ? (
          <button
            disabled
            className="mt-5 w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
          >
            Hết hàng
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="mt-5 w-full bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition"
          >
            <ShoppingCart size={16} />
            <span className="text-sm font-medium">Thêm vào giỏ</span>
          </button>
        )}
      </div>
    </div>
  );
}
