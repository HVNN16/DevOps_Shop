import React, { useEffect, useState } from "react";
import api from "../api/axios_client";

export default function CartPage() {
  const [cart, setCart] = useState(null);

  const fetchCart = () => {
    api
      .get("/cart")
      .then((res) => setCart(res.data))
      .catch((err) => {
        console.error("GET /cart error:", err.response?.data || err.message);
      });
  };

  const handleUpdateQty = async (itemId, newQty) => {
    try {
      await api.put("/cart/update", { itemId, quantity: newQty });
      fetchCart();
    } catch (err) {
      console.error(
        "PUT /cart/update error:",
        err.response?.data || err.message
      );
      alert(err.response?.data?.message || "Lỗi cập nhật giỏ hàng");
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await api.delete("/cart/remove", { data: { itemId } });
      fetchCart();
    } catch (err) {
      console.error(
        "DELETE /cart/remove error:",
        err.response?.data || err.message
      );
      alert(err.response?.data?.message || "Lỗi xóa sản phẩm");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (!cart) return <p className="text-center mt-10">Đang tải giỏ hàng...</p>;
  if (cart.items.length === 0)
    return <p className="text-center mt-10">Giỏ hàng trống</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Giỏ hàng của bạn</h2>
      {cart.items.map((item) => (
        <div key={item._id} className="flex justify-between border-b py-3">
          <div className="flex gap-4">
            <img
              src={item.imageSnapshot || "https://via.placeholder.com/80"}
              className="w-20 h-20 object-cover rounded"
            />
            <div>
              <p className="font-semibold">{item.nameSnapshot}</p>
              <p className="text-gray-500 text-sm">
                {item.variant.color} / {item.variant.storage} /{" "}
                {item.variant.ram}
              </p>
              <p className="text-red-500 font-semibold">
                {(item.priceAtAdd * item.quantity).toLocaleString()} đ
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                handleUpdateQty(item._id, item.quantity - 1)
              }
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() =>
                handleUpdateQty(item._id, item.quantity + 1)
              }
            >
              +
            </button>
            <button
              onClick={() => handleRemove(item._id)}
              className="ml-2 text-red-600"
            >
              ✖
            </button>
          </div>
        </div>
      ))}

      <p className="text-right font-bold mt-6 text-lg">
        Tổng tiền:{" "}
        {cart.items
          .reduce((sum, i) => sum + i.priceAtAdd * i.quantity, 0)
          .toLocaleString()}{" "}
        đ
      </p>
    </div>
  );
}
