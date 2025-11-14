// import React, { useEffect, useState } from "react";
// import api from "../api/axios_client";
// import { Link } from "react-router-dom";

// export default function CartPage() {
//   const [cart, setCart] = useState(null);

//   // 🔹 Lấy dữ liệu giỏ hàng
//   const fetchCart = () => {
//     api
//         .get("/cart")
//         .then((res) => setCart(res.data))
//         .catch((err) => {
//           console.error("GET /cart error:", err.response?.data || err.message);
//         });
//   };

//   // 🔹 Cập nhật số lượng
//   const handleUpdateQty = async (itemId, newQty) => {
//     if (newQty < 1) return;
//     try {
//       await api.put("/cart/update", { itemId, quantity: newQty });
//       fetchCart();
//       window.dispatchEvent(new Event("cartUpdated")); // 🟢 Cập nhật Header
//     } catch (err) {
//       console.error("PUT /cart/update error:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Lỗi cập nhật giỏ hàng");
//     }
//   };

//   // 🔹 Xóa sản phẩm
//   const handleRemove = async (itemId) => {
//     try {
//       await api.delete("/cart/remove", { data: { itemId } });
//       fetchCart();
//       window.dispatchEvent(new Event("cartUpdated")); // 🟢 Cập nhật Header
//     } catch (err) {
//       console.error("DELETE /cart/remove error:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Lỗi xóa sản phẩm");
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   if (!cart) return <p className="text-center mt-10">Đang tải giỏ hàng...</p>;
//   if (cart.items.length === 0)
//     return <p className="text-center mt-10">Giỏ hàng trống</p>;

//   const totalPrice = cart.items.reduce(
//     (sum, i) => sum + i.priceAtAdd * i.quantity,
//     0
//   );

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-6">
//       {/* ====== DANH SÁCH SẢN PHẨM ====== */}
//       <div className="lg:col-span-2">
//         <h2 className="text-2xl font-bold mb-4">🛒 Giỏ hàng của bạn</h2>

//         {cart.items.map((item) => (
//           <div
//             key={item._id}
//             className="flex justify-between border-b py-4 items-center"
//           >
//             <div className="flex gap-4">
//               <img
//                 src={item.imageSnapshot || "https://via.placeholder.com/100"}
//                 className="w-20 h-20 object-cover rounded-lg"
//                 alt={item.nameSnapshot}
//               />
//               <div>
//                 <p className="font-semibold text-lg">{item.nameSnapshot}</p>
//                 <p className="text-gray-500 text-sm">
//                   {item.variant.color} / {item.variant.storage} /{" "}
//                   {item.variant.ram}
//                 </p>
//                 <p className="text-red-500 font-semibold mt-1">
//                   {(item.priceAtAdd * item.quantity).toLocaleString("vi-VN")}₫
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => handleUpdateQty(item._id, item.quantity - 1)}
//                 className="w-8 h-8 border rounded hover:bg-gray-100"
//               >
//                 -
//               </button>
//               <span>{item.quantity}</span>
//               <button
//                 onClick={() => handleUpdateQty(item._id, item.quantity + 1)}
//                 className="w-8 h-8 border rounded hover:bg-gray-100"
//               >
//                 +
//               </button>
//               <button
//                 onClick={() => handleRemove(item._id)}
//                 className="ml-3 text-red-600 text-xl hover:text-red-800"
//               >
//                 ✖
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ====== TỔNG ĐƠN HÀNG ====== */}
//       <div className="lg:col-span-1">
//         <div className="sticky top-20 border rounded-2xl shadow-lg p-6 bg-white">
//           <h2 className="text-xl font-bold mb-4">Tổng đơn hàng</h2>

//           <div className="space-y-3 mb-6">
//             <div className="flex justify-between">
//               <span className="text-gray-500">Tạm tính</span>
//               <span className="font-medium">
//                 {totalPrice.toLocaleString("vi-VN")}₫
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-500">Phí vận chuyển</span>
//               <span className="font-medium text-green-600">Miễn phí</span>
//             </div>
//             <div className="border-t pt-3 flex justify-between">
//               <span className="font-semibold">Tổng cộng</span>
//               <span className="text-xl font-bold text-pink-600">
//                 {totalPrice.toLocaleString("vi-VN")}₫
//               </span>
//             </div>
//           </div>

//           <Link
//             to="/checkout"
//             className="w-full bg-black text-white py-3 rounded-lg mb-3 hover:bg-gray-800 transition"
//           >
//             Thanh toán
//           </Link>
//           <Link
//             to="/products"
//             className="block text-center border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
//           >
//             Tiếp tục mua sắm
//           </Link>
//         </div>
//       </div>
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
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("PUT /cart/update error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Lỗi cập nhật giỏ hàng");
    }
  };

  // 🔹 Xóa sản phẩm
  const handleRemove = async (itemId) => {
    try {
      await api.delete("/cart/remove", { data: { itemId } });
      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("DELETE /cart/remove error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Lỗi xóa sản phẩm");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (!cart) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Đang tải giỏ hàng...</p>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Giỏ hàng trống</h2>
          <p className="text-gray-500 mb-8">Hãy thêm sản phẩm yêu thích vào giỏ hàng của bạn!</p>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Khám phá sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = cart.items.reduce(
    (sum, i) => sum + i.priceAtAdd * i.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Giỏ hàng của bạn
          </h1>
          <p className="text-gray-600">
            Bạn có <span className="font-semibold text-pink-600">{cart.items.length}</span> sản phẩm trong giỏ hàng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ====== DANH SÁCH SẢN PHẨM ====== */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Hình ảnh sản phẩm */}
                  <div className="flex-shrink-0">
                    <div className="relative group">
                      <img
                        src={item.imageSnapshot || "https://via.placeholder.com/150"}
                        className="w-32 h-32 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-200"
                        alt={item.nameSnapshot}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 rounded-xl transition-all duration-200"></div>
                    </div>
                  </div>

                  {/* Thông tin sản phẩm */}
                  <div className="flex-grow">
                    <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2">
                      {item.nameSnapshot}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {item.variant.color}
                      </span>
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {item.variant.storage}
                      </span>
                      <span className="px-3 py-1 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-full text-sm font-medium">
                        {item.variant.ram}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Giá */}
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Đơn giá: {item.priceAtAdd.toLocaleString("vi-VN")}₫</p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                          {(item.priceAtAdd * item.quantity).toLocaleString("vi-VN")}₫
                        </p>
                      </div>

                      {/* Nút điều chỉnh số lượng */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                          <button
                            onClick={() => handleUpdateQty(item._id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 font-bold text-gray-700"
                          >
                            −
                          </button>
                          <span className="w-12 h-10 flex items-center justify-center font-semibold text-gray-800 bg-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQty(item._id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 font-bold text-gray-700"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item._id)}
                          className="w-10 h-10 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-200 hover:scale-110"
                          title="Xóa sản phẩm"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ====== TỔNG ĐƠN HÀNG ====== */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b">
                  Tổng đơn hàng
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="font-semibold text-gray-900 text-lg">
                      {totalPrice.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="font-semibold text-green-600 flex items-center gap-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Miễn phí
                    </span>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Tổng cộng</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        {totalPrice.toLocaleString("vi-VN")}₫
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/checkout"
                    className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Thanh toán
                    </span>
                  </Link>

                  <Link
                    to="/products"
                    className="block w-full border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-center"
                  >
                    ← Tiếp tục mua sắm
                  </Link>
                </div>

                {/* Thông tin bổ sung */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Giao hàng miễn phí toàn quốc</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Bảo hành chính hãng 12 tháng</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                    <span>Đổi trả trong 7 ngày</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}