import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import api from "../api/axios_client";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedVariant(res.data.variants?.[0]);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const res = await api.post("/cart/add", {
        productId: product._id,
        variant: selectedVariant,
        quantity: 1,
      });
      alert("✅ " + res.data.message);
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Lỗi khi thêm vào giỏ hàng"));
    }
  };

  if (loading) return <p className="text-center mt-10">Đang tải chi tiết sản phẩm...</p>;
  if (!product) return <p className="text-center mt-10 text-gray-600">Không tìm thấy sản phẩm.</p>;

  const discount = product.discountPercent > 0 ? `-${product.discountPercent}%` : null;
  const finalPrice =
    product.finalPrice ||
    (product.basePrice - (product.basePrice * (product.discountPercent || 0)) / 100);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Grid layout: ảnh - thông tin */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-sm">
        {/* Ảnh sản phẩm */}
        <div className="relative">
          <img
            src={product.images?.[0] || "https://via.placeholder.com/500x500?text=No+Image"}
            alt={product.name}
            className="w-full h-[420px] object-cover rounded-xl border border-gray-200"
          />
          {discount && (
            <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
              {discount}
            </span>
          )}
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-4">{product.brand}</p>

            {/* Đánh giá */}
            <div className="flex items-center gap-1 text-yellow-500 mb-4">
              <Star size={18} fill="#facc15" />
              <span className="text-gray-800 font-medium">
                {product.ratingAvg?.toFixed(1) || "0.0"}
              </span>
              <span className="text-gray-500 text-sm">
                ({product.ratingCount || 0} đánh giá)
              </span>
            </div>

            {/* Giá */}
            <div className="mb-5">
              <p className="text-3xl font-bold text-gray-900">
                {finalPrice.toLocaleString()}đ
              </p>
              {product.discountPercent > 0 && (
                <p className="text-gray-400 line-through mt-1">
                  {product.basePrice.toLocaleString()}đ
                </p>
              )}
            </div>

            {/* Biến thể */}
            {product.variants?.length > 0 && (
              <div className="mb-6">
                <label className="font-semibold text-gray-800">Chọn biến thể:</label>
                <select
                  onChange={(e) =>
                    setSelectedVariant(
                      product.variants.find((v) => v.storage === e.target.value)
                    )
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 ml-3 text-sm focus:ring-1 focus:ring-gray-400"
                  value={selectedVariant?.storage || ""}
                >
                  {product.variants.map((v, i) => (
                    <option key={i} value={v.storage}>
                      {v.color} - {v.storage} - {v.ram}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Nút thêm vào giỏ */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-gray-800 transition"
            >
              <ShoppingCart size={18} />
              <span>Thêm vào giỏ hàng</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mô tả & thông số */}
      {product.description && (
        <div className="mt-10 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">Mô tả sản phẩm</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>
      )}

      {product.specs && (
        <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">Thông số kỹ thuật</h2>
          <ul className="text-gray-700 text-sm grid grid-cols-1 md:grid-cols-2 gap-3">
            {product.specs.screen && <li><strong>Màn hình:</strong> {product.specs.screen}</li>}
            {product.specs.chipset && <li><strong>Chipset:</strong> {product.specs.chipset}</li>}
            {product.specs.battery && <li><strong>Pin:</strong> {product.specs.battery}</li>}
            {product.specs.camera && <li><strong>Camera:</strong> {product.specs.camera}</li>}
            {product.specs.os && <li><strong>Hệ điều hành:</strong> {product.specs.os}</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
