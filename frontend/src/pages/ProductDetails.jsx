import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import api from "../api/axios_client";

export default function ProductDetail() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadProduct();
    loadReviews();
  }, [id]);

  const loadProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
      setSelectedVariant(res.data.variants?.[0]);
    } catch (err) {
      console.error("LOAD PRODUCT ERROR:", err);
    }
  };

  const loadReviews = async () => {
    try {
      const res = await api.get(`/reviews/product/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.error("LOAD REVIEWS ERROR:", err);
    } finally {
      setLoadingReviews(false);
    }
  };

  const submitReview = async () => {
    if (!rating) return alert("Bạn chưa chọn số sao!");

    setSubmitting(true);
    try {
      await api.post(`/reviews/${id}`, { rating, comment });

      setRating(0);
      setComment("");

      loadReviews();
      loadProduct(); // ⬅ cập nhật averageRating + reviewCount
    } catch (err) {
      alert("❌ Lỗi khi gửi đánh giá");
      console.error("REVIEW ERROR:", err);
    }
    setSubmitting(false);
  };

  const addToCart = async () => {
    try {
      await api.post("/cart/add", {
        productId: product._id,
        variant: selectedVariant,
        quantity: 1,
      });
      alert("Đã thêm vào giỏ hàng!");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (e) {
      alert("Lỗi khi thêm vào giỏ hàng");
    }
  };

  if (!product) return <p className="text-center mt-10">Đang tải...</p>;

  const finalPrice = product.finalPrice || product.basePrice;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* ==== THÔNG TIN SẢN PHẨM ==== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-sm">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full rounded-xl border"
        />

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-1 text-yellow-500 mt-3">
            <Star size={18} fill="#facc15" />
            <span>{product.averageRating?.toFixed(1) || "0.0"}</span>
            <span className="text-gray-500 text-sm">
              ({product.reviewCount || 0} đánh giá)
            </span>
          </div>

          <p className="text-3xl font-bold mt-4">
            {finalPrice.toLocaleString()}đ
          </p>

          {product.variants?.length > 0 && (
            <select
              className="mt-5 border px-3 py-2 rounded-lg"
              onChange={(e) =>
                setSelectedVariant(
                  product.variants.find((v) => v.storage === e.target.value)
                )
              }
            >
              {product.variants.map((v, i) => (
                <option key={i} value={v.storage}>
                  {v.color} - {v.storage} - {v.ram}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={addToCart}
            className="mt-5 w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} /> Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* ==== FORM REVIEW ==== */}
      {user && (
        <div className="mt-10 bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Viết đánh giá</h3>

          <div className="flex gap-2 text-3xl mb-3 cursor-pointer">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                className={s <= rating ? "text-yellow-500" : "text-gray-300"}
                onClick={() => setRating(s)}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border p-3 rounded-lg"
            placeholder="Viết đánh giá..."
          />

          <button
            onClick={submitReview}
            disabled={submitting}
            className="mt-3 px-5 py-2 bg-pink-600 text-white rounded-lg"
          >
            {submitting ? "Đang gửi..." : "Gửi đánh giá"}
          </button>
        </div>
      )}

      {/* ==== LIST REVIEW ==== */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Đánh giá từ người dùng</h2>

        {loadingReviews ? (
          <p>Đang tải...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500">Chưa có đánh giá nào</p>
        ) : (
          reviews.map((rv) => (
            <div
              key={rv._id}
              className="p-4 bg-gray-50 border rounded-xl mb-3"
            >
              <p className="font-semibold">{rv.user?.name}</p>

              <div className="text-yellow-500">
                {"★".repeat(rv.rating)}
              </div>

              <p className="mt-2">{rv.comment}</p>

              <p className="text-sm text-gray-400">
                {new Date(rv.createdAt).toLocaleString("vi-VN")}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
