import React, { useState, useEffect } from "react";
import api from "../api/axios_client";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const [cart, setCart] = useState(null);
  const [form, setForm] = useState({ address: "", phone: "", paymentMethod: "COD" });
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/cart").then((res) => setCart(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/orders", form);
      alert("✅ " + res.data.message);
      navigate("/orders");
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Lỗi đặt hàng"));
    }
  };

  if (!cart) return <p>Đang tải...</p>;
  const total = cart.items.reduce((s, i) => s + i.priceAtAdd * i.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Xác nhận đơn hàng</h2>
      <ul>
        {cart.items.map((i) => (
          <li key={i._id}>
            {i.nameSnapshot} - {i.variant.storage} - SL: {i.quantity}
          </li>
        ))}
      </ul>
      <p className="font-semibold mt-2">Tổng tiền: {total.toLocaleString()} đ</p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <input
          placeholder="Địa chỉ giao hàng"
          className="border p-2 rounded"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        />
        <input
          placeholder="Số điện thoại"
          className="border p-2 rounded"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <select
          className="border p-2 rounded"
          value={form.paymentMethod}
          onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
        >
          <option value="COD">Thanh toán khi nhận hàng</option>
          <option value="Online">Thanh toán online</option>
        </select>
        <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
          ✅ Đặt hàng
        </button>
      </form>
    </div>
  );
}
