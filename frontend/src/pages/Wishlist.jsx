import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import api from "../api/axios_client";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await api.get("/wishlist");
        setWishlist(res.data);

        // 🔥 Đồng bộ localStorage với dữ liệu từ server
        const productIds = res.data.map((p) => p._id);
        localStorage.setItem("wishlist", JSON.stringify(productIds));

        // 🔥 Dispatch event để ProductCard cập nhật
        window.dispatchEvent(new Event("wishlistUpdated"));

      } catch (err) {
        console.error("❌ Lỗi lấy wishlist:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWishlist();

    // 🔥 Lắng nghe sự kiện wishlistUpdated để refetch
    const handleWishlistUpdate = () => {
      fetchWishlist();
    };

    window.addEventListener("wishlistUpdated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, []);

  // 🔥 Hàm bỏ yêu thích trong trang wishlist
  const handleRemove = async (productId) => {
    try {
      // 🔥 Dùng DELETE endpoint riêng
      const response = await api.delete(`/wishlist/${productId}`);
      console.log("✅ API Response:", response.data);

      // 🧠 Cập nhật UI ngay lập tức
      setWishlist((prev) => prev.filter((item) => item._id !== productId));

      // 🔥 Cập nhật localStorage ngay lập tức
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlist = wishlist.filter((id) => id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      // 🔥 Dispatch event để các ProductCard khác cập nhật
      window.dispatchEvent(new Event("wishlistUpdated"));

    } catch (err) {
      console.error("❌ Lỗi xóa wishlist:", err.response?.data || err);
      alert("Không thể xóa sản phẩm khỏi danh sách yêu thích");
      
      // 🔥 Nếu lỗi, fetch lại từ server để đồng bộ
      try {
        const res = await api.get("/wishlist");
        setWishlist(res.data);
        const productIds = res.data.map((p) => p._id);
        localStorage.setItem("wishlist", JSON.stringify(productIds));
        window.dispatchEvent(new Event("wishlistUpdated"));
      } catch (refetchErr) {
        console.error("❌ Lỗi fetch lại wishlist:", refetchErr);
      }
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Đang tải...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Danh sách yêu thích
      </h1>

      {wishlist.length === 0 ? (
        // 🎨 Empty State giống trang Cart
        <div className="flex flex-col items-center justify-center py-20">
          {/* Icon trái tim lớn */}
          <div className="mb-6">
            <Heart size={100} className="text-gray-300" strokeWidth={1.5} />
          </div>

          {/* Text */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Danh sách yêu thích trống
          </h2>
          <p className="text-gray-500 mb-8">
            Hãy thêm sản phẩm yêu thích vào danh sách của bạn!
          </p>

          {/* Button */}
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-600 transition"
          >
            Khám phá sản phẩm
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onRemoveWishlist={() => handleRemove(p._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}