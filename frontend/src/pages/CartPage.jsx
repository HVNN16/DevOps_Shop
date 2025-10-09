// import React, { useEffect, useState } from "react";
// import api from "../api/axios_client";
//
// export default function CartPage() {
//   const [cart, setCart] = useState(null);
//
//   const fetchCart = () => {
//     api
//       .get("/cart")
//       .then((res) => setCart(res.data))
//       .catch((err) => {
//         console.error("GET /cart error:", err.response?.data || err.message);
//       });
//   };
//
//   const handleUpdateQty = async (itemId, newQty) => {
//     try {
//       await api.put("/cart/update", { itemId, quantity: newQty });
//       fetchCart();
//     } catch (err) {
//       console.error(
//         "PUT /cart/update error:",
//         err.response?.data || err.message
//       );
//       alert(err.response?.data?.message || "Lỗi cập nhật giỏ hàng");
//     }
//   };
//
//   const handleRemove = async (itemId) => {
//     try {
//       await api.delete("/cart/remove", { data: { itemId } });
//       fetchCart();
//     } catch (err) {
//       console.error(
//         "DELETE /cart/remove error:",
//         err.response?.data || err.message
//       );
//       alert(err.response?.data?.message || "Lỗi xóa sản phẩm");
//     }
//   };
//
//   useEffect(() => {
//     fetchCart();
//   }, []);
//
//   if (!cart) return <p className="text-center mt-10">Đang tải giỏ hàng...</p>;
//   if (cart.items.length === 0)
//     return <p className="text-center mt-10">Giỏ hàng trống</p>;
//
//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">🛒 Giỏ hàng của bạn</h2>
//       {cart.items.map((item) => (
//         <div key={item._id} className="flex justify-between border-b py-3">
//           <div className="flex gap-4">
//             <img
//               src={item.imageSnapshot || "https://via.placeholder.com/80"}
//               className="w-20 h-20 object-cover rounded"
//             />
//             <div>
//               <p className="font-semibold">{item.nameSnapshot}</p>
//               <p className="text-gray-500 text-sm">
//                 {item.variant.color} / {item.variant.storage} /{" "}
//                 {item.variant.ram}
//               </p>
//               <p className="text-red-500 font-semibold">
//                 {(item.priceAtAdd * item.quantity).toLocaleString()} đ
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() =>
//                 handleUpdateQty(item._id, item.quantity - 1)
//               }
//             >
//               -
//             </button>
//             <span>{item.quantity}</span>
//             <button
//               onClick={() =>
//                 handleUpdateQty(item._id, item.quantity + 1)
//               }
//             >
//               +
//             </button>
//             <button
//               onClick={() => handleRemove(item._id)}
//               className="ml-2 text-red-600"
//             >
//               ✖
//             </button>
//           </div>
//         </div>
//       ))}
//
//       <p className="text-right font-bold mt-6 text-lg">
//         Tổng tiền:{" "}
//         {cart.items
//           .reduce((sum, i) => sum + i.priceAtAdd * i.quantity, 0)
//           .toLocaleString()}{" "}
//         đ
//       </p>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import api from "../api/axios_client";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(null);

  // 🔹 Lấy dữ liệu giỏ hàng
  const fetchCart = () => {
    api
      .get("/cart")
      .then((res) => setCart(res.data))
      .catch((err) => {
        console.error("GET /cart error:", err.response?.data || err.message);
      });
  };

  // 🔹 Cập nhật số lượng
  const handleUpdateQty = async (itemId, newQty) => {
    if (newQty < 1) return;
    try {
      await api.put("/cart/update", { itemId, quantity: newQty });
      fetchCart();
      window.dispatchEvent(new Event("cartUpdated")); // 🟢 Cập nhật Header
    } catch (err) {
      console.error(
        "PUT /cart/update error:",
        err.response?.data || err.message
      );
      alert(err.response?.data?.message || "Lỗi cập nhật giỏ hàng");
    }
  };

  // 🔹 Xóa sản phẩm
  const handleRemove = async (itemId) => {
    try {
      await api.delete("/cart/remove", { data: { itemId } });
      fetchCart();
      window.dispatchEvent(new Event("cartUpdated")); // 🟢 Cập nhật Header
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

  const totalPrice = cart.items.reduce(
    (sum, i) => sum + i.priceAtAdd * i.quantity,
    0
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-6">
      {/* ====== DANH SÁCH SẢN PHẨM ====== */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-4">🛒 Giỏ hàng của bạn</h2>

        {cart.items.map((item) => (
          <div
            key={item._id}
            className="flex justify-between border-b py-4 items-center"
          >
            <div className="flex gap-4">
              <img
                src={item.imageSnapshot || "https://via.placeholder.com/100"}
                className="w-20 h-20 object-cover rounded-lg"
                alt={item.nameSnapshot}
              />
              <div>
                <p className="font-semibold text-lg">{item.nameSnapshot}</p>
                <p className="text-gray-500 text-sm">
                  {item.variant.color} / {item.variant.storage} /{" "}
                  {item.variant.ram}
                </p>
                <p className="text-red-500 font-semibold mt-1">
                  {(item.priceAtAdd * item.quantity).toLocaleString("vi-VN")}₫
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleUpdateQty(item._id, item.quantity - 1)}
                className="w-8 h-8 border rounded hover:bg-gray-100"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleUpdateQty(item._id, item.quantity + 1)}
                className="w-8 h-8 border rounded hover:bg-gray-100"
              >
                +
              </button>
              <button
                onClick={() => handleRemove(item._id)}
                className="ml-3 text-red-600 text-xl hover:text-red-800"
              >
                ✖
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ====== TỔNG ĐƠN HÀNG ====== */}
      <div className="lg:col-span-1">
        <div className="sticky top-20 border rounded-2xl shadow-lg p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">Tổng đơn hàng</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-500">Tạm tính</span>
              <span className="font-medium">
                {totalPrice.toLocaleString("vi-VN")}₫
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Phí vận chuyển</span>
              <span className="font-medium text-green-600">Miễn phí</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-semibold">Tổng cộng</span>
              <span className="text-xl font-bold text-pink-600">
                {totalPrice.toLocaleString("vi-VN")}₫
              </span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="w-full bg-black text-white py-3 rounded-lg mb-3 hover:bg-gray-800 transition"
          >
            Thanh toán
          </Link>
          <Link
            to="/products"
            className="block text-center border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}
