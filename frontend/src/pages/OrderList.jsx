// import React, { useEffect, useState } from "react";
// import api from "../api/axios_client";

// export default function OrderList() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     api.get("/orders").then((res) => setOrders(res.data));
//   }, []);

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-xl font-bold mb-4">📦 Đơn hàng của tôi</h2>
//       {orders.length === 0 ? (
//         <p>Chưa có đơn hàng nào</p>
//       ) : (
//         <ul className="space-y-4">
//           {orders.map((o) => (
//             <li key={o._id} className="border p-4 rounded-lg shadow">
//               <p>Mã đơn: <b>{o._id}</b></p>
//               <p>Tổng tiền: {o.totalAmount.toLocaleString()} đ</p>
//               <p>Trạng thái: <span className="text-blue-600">{o.status}</span></p>
//               <p>Ngày đặt: {new Date(o.createdAt).toLocaleString()}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import api from "../api/axios_client";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  const toggleDetail = (id) => {
    setOpenOrderId(openOrderId === id ? null : id);
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">📦</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Bạn chưa có đơn hàng nào</h2>
          <p className="text-gray-500 mb-8">Bắt đầu mua sắm hôm nay và trải nghiệm dịch vụ của chúng tôi!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Lịch sử đơn hàng
        </h1>
        <p className="text-gray-600 mb-10">
          Bạn có <span className="font-semibold text-pink-600">{orders.length}</span> đơn hàng
        </p>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
            >
              {/* Header đơn hàng */}
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <div>
                  <p className="text-gray-700">
                    Mã đơn: <b>{order._id}</b>
                  </p>

                  <p className="text-gray-700">
                    Ngày đặt:{" "}
                    <b>{new Date(order.createdAt).toLocaleString("vi-VN")}</b>
                  </p>

                  <p className="text-gray-700">
                    Tổng tiền:{" "}
                    <span className="font-semibold text-pink-600 text-lg">
                      {order.totalAmount.toLocaleString("vi-VN")}₫
                    </span>
                  </p>
                </div>

                {/* trạng thái */}
                <div className="flex flex-col items-start md:items-end gap-2">
                  <span
                    className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                      {
                        pending: "bg-yellow-100 text-yellow-700",
                        paid: "bg-blue-100 text-blue-700",
                        shipped: "bg-purple-100 text-purple-700",
                        delivered: "bg-green-100 text-green-700",
                        cancelled: "bg-red-100 text-red-700",
                      }[order.status]
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>

                  <button
                    onClick={() => toggleDetail(order._id)}
                    className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                  >
                    {openOrderId === order._id ? "Ẩn chi tiết" : "Xem chi tiết"}
                  </button>
                </div>
              </div>

              {/* Chi tiết đơn hàng */}
              {openOrderId === order._id && (
                <div className="mt-6 bg-gray-50 border rounded-2xl p-5 animate-fadeIn">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    🛒 Sản phẩm đã đặt
                  </h3>

                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition"
                      >
                        <img
                          src={item.imageSnapshot || "https://via.placeholder.com/120"}
                          alt={item.nameSnapshot}
                          className="w-24 h-24 object-cover rounded-xl"
                        />

                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">
                            {item.nameSnapshot}
                          </h4>

                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.variant?.color && (
                              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                {item.variant.color}
                              </span>
                            )}
                            {item.variant?.storage && (
                              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                                {item.variant.storage}
                              </span>
                            )}
                            {item.variant?.ram && (
                              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                                {item.variant.ram}
                              </span>
                            )}
                          </div>

                          <p className="text-gray-600 text-sm mt-2">
                            Giá:{" "}
                            <b>{item.priceAtOrder.toLocaleString("vi-VN")}₫</b>
                          </p>
                          <p className="text-gray-600 text-sm">
                            Số lượng: <b>{item.quantity}</b>
                          </p>

                          <p className="text-pink-600 font-semibold text-lg mt-1">
                            Tổng:{" "}
                            {(item.priceAtOrder * item.quantity).toLocaleString(
                              "vi-VN"
                            )}₫
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* animation */}
      <style>{`
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(10px);}
          to {opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

