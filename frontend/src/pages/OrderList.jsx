import React, { useEffect, useState } from "react";
import api from "../api/axios_client";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">📦 Đơn hàng của tôi</h2>
      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((o) => (
            <li key={o._id} className="border p-4 rounded-lg shadow">
              <p>Mã đơn: <b>{o._id}</b></p>
              <p>Tổng tiền: {o.totalAmount.toLocaleString()} đ</p>
              <p>Trạng thái: <span className="text-blue-600">{o.status}</span></p>
              <p>Ngày đặt: {new Date(o.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
