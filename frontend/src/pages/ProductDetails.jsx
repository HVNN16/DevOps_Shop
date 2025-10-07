import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios_client";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
      setSelectedVariant(res.data.variants?.[0]);
    });
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
      alert("❌ " + err.response?.data?.message || "Lỗi khi thêm vào giỏ hàng");
    }
  };

  if (!product) return <p>Đang tải chi tiết...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={product.images?.[0] || "https://via.placeholder.com/400"}
        alt={product.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p className="text-gray-500">{product.brand}</p>
      <p className="text-red-600 font-bold text-lg mt-2">
        {product.finalPrice?.toLocaleString()} đ
      </p>

      <div className="mt-4">
        <label className="font-semibold">Chọn biến thể:</label>
        <select
          onChange={(e) =>
            setSelectedVariant(
              product.variants.find(
                (v) => v.storage === e.target.value
              )
            )
          }
          className="border p-2 ml-2"
        >
          {product.variants?.map((v, i) => (
            <option key={i} value={v.storage}>
              {v.color} - {v.storage} - {v.ram}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700"
      >
        ➕ Thêm vào giỏ hàng
      </button>
    </div>
  );
}
