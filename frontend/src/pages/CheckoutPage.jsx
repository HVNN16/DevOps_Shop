// import React, { useState, useEffect } from "react";
// import api from "../api/axios_client";
// import { useNavigate } from "react-router-dom";

// export default function CheckoutPage() {
//   const [cart, setCart] = useState(null);
//   const [form, setForm] = useState({ address: "", phone: "", paymentMethod: "COD" });
//   const navigate = useNavigate();

//   useEffect(() => {
//     api.get("/cart").then((res) => setCart(res.data));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/orders", form);
//       alert("✅ " + res.data.message);
//       navigate("/orders");
//     } catch (err) {
//       alert("❌ " + (err.response?.data?.message || "Lỗi đặt hàng"));
//     }
//   };

//   if (!cart) return <p>Đang tải...</p>;
//   const total = cart.items.reduce((s, i) => s + i.priceAtAdd * i.quantity, 0);

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h2 className="text-xl font-bold mb-4">Xác nhận đơn hàng</h2>
//       <ul>
//         {cart.items.map((i) => (
//           <li key={i._id}>
//             {i.nameSnapshot} - {i.variant.storage} - SL: {i.quantity}
//           </li>
//         ))}
//       </ul>
//       <p className="font-semibold mt-2">Tổng tiền: {total.toLocaleString()} đ</p>

//       <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
//         <input
//           placeholder="Địa chỉ giao hàng"
//           className="border p-2 rounded"
//           value={form.address}
//           onChange={(e) => setForm({ ...form, address: e.target.value })}
//           required
//         />
//         <input
//           placeholder="Số điện thoại"
//           className="border p-2 rounded"
//           value={form.phone}
//           onChange={(e) => setForm({ ...form, phone: e.target.value })}
//           required
//         />
//         <select
//           className="border p-2 rounded"
//           value={form.paymentMethod}
//           onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
//         >
//           <option value="COD">Thanh toán khi nhận hàng</option>
//           <option value="Online">Thanh toán online</option>
//         </select>
//         <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
//           ✅ Đặt hàng
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import api from "../api/axios_client";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const [cart, setCart] = useState(null);
  const [form, setForm] = useState({ address: "", phone: "", paymentMethod: "COD" });
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/cart").then((res) => setCart(res.data));
  }, []);

  // Hàm validate số điện thoại Việt Nam
  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/\s/g, "");
    const phoneRegex = /^(0|\+84|84)[0-9]{9,10}$/;
    return phoneRegex.test(cleanPhone);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, phone: value });
    
    if (value && !validatePhone(value)) {
      setPhoneError("Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng (VD: 0912345678)");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePhone(form.phone)) {
      setPhoneError("Vui lòng nhập số điện thoại hợp lệ");
      return;
    }
    
    try {
      const res = await api.post("/orders", form);
      alert("✅ " + res.data.message);
      window.dispatchEvent(new Event("cartUpdated")); // 🟢 Cập nhật Header
      navigate("/orders");
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Lỗi đặt hàng"));
    }
  };

  if (!cart) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Đang tải thông tin đơn hàng...</p>
        </div>
      </div>
    );
  }
  
  const total = cart.items.reduce((s, i) => s + i.priceAtAdd * i.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Thanh toán
          </h1>
          <p className="text-gray-600">
            Hoàn tất đơn hàng của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ====== FORM THÔNG TIN ====== */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                Thông tin giao hàng
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Địa chỉ */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Địa chỉ giao hàng <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Nhập địa chỉ chi tiết: số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 outline-none"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Số điện thoại */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      placeholder="VD: 0912345678"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 transition-all duration-200 outline-none ${
                        phoneError 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                          : 'border-gray-200 focus:border-pink-500 focus:ring-pink-200'
                      }`}
                      value={form.phone}
                      onChange={handlePhoneChange}
                      required
                    />
                  </div>
                  {phoneError && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{phoneError}</span>
                    </div>
                  )}
                </div>

                {/* Phương thức thanh toán */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Phương thức thanh toán
                  </label>
                  <div className="space-y-3">
                    <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      form.paymentMethod === "COD" 
                        ? 'border-pink-500 bg-pink-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={form.paymentMethod === "COD"}
                        onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                        className="w-5 h-5 text-pink-600 focus:ring-pink-500"
                      />
                      <div className="ml-4 flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Thanh toán khi nhận hàng (COD)</p>
                          <p className="text-sm text-gray-500">Thanh toán bằng tiền mặt khi nhận hàng</p>
                        </div>
                      </div>
                    </label>

                    <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      form.paymentMethod === "Online" 
                        ? 'border-pink-500 bg-pink-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Online"
                        checked={form.paymentMethod === "Online"}
                        onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                        className="w-5 h-5 text-pink-600 focus:ring-pink-500"
                      />
                      <div className="ml-4 flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Thanh toán online</p>
                          <p className="text-sm text-gray-500">Thanh toán qua thẻ ATM, Visa, MasterCard, Momo</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* ====== TỔNG ĐƠN HÀNG ====== */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b">
                  Đơn hàng
                </h2>

                {/* Danh sách sản phẩm */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cart.items.map((item) => (
                    <div key={item._id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
                      <img
                        src={item.imageSnapshot || "https://via.placeholder.com/60"}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        alt={item.nameSnapshot}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">
                          {item.nameSnapshot}
                        </p>
                        <p className="text-xs text-gray-500 mb-1">
                          {item.variant.storage}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">SL: {item.quantity}</span>
                          <span className="font-semibold text-sm text-pink-600">
                            {(item.priceAtAdd * item.quantity).toLocaleString("vi-VN")}₫
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tổng tiền */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="font-semibold text-gray-900">
                      {total.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="font-semibold text-green-600">Miễn phí</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold text-gray-900">Tổng cộng</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        {total.toLocaleString("vi-VN")}₫
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 text-right">(Đã bao gồm VAT)</p>
                  </div>
                </div>

                {/* Nút đặt hàng */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
                  disabled={phoneError !== ""}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Hoàn tất đặt hàng
                </button>

                {/* Thông tin bảo mật */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Thanh toán an toàn và bảo mật</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Giao hàng nhanh trong 2-3 ngày</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Đổi trả miễn phí trong 7 ngày</span>
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