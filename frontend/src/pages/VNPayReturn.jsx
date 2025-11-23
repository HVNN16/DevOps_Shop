import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios_client";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function VNPayReturn() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading"); 
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    const fetchReturn = async () => {
      try {
        const params = Object.fromEntries([...searchParams]);
        const res = await api.get("/payment/vnpay_return", { params });

        if (res.data.responseCode === "00") {
          clearCart();
          window.dispatchEvent(new Event("cartUpdated"));
          setStatus("success");

          setTimeout(() => {
            navigate("/orders");
          }, 3000);

        } else {
          setStatus("fail");
        }
      } catch (err) {
        setStatus("error");
      }
    };

    fetchReturn();
  }, []);
  const renderContent = () => {
    if (status === "loading")
      return (
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-3" />
          <p className="text-gray-700 text-lg">Đang xác minh thanh toán VNPay...</p>
        </div>
      );

    if (status === "success")
      return (
        <div className="flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-3" />
          <h2 className="text-2xl font-bold text-green-600">Thanh toán thành công!</h2>
          <p className="text-gray-700 mt-2">Đơn hàng của bạn đã được ghi nhận.</p>
          <p className="text-gray-500 text-sm mt-1">Chuyển đến trang "Đơn hàng của tôi" trong 3 giây...</p>
        </div>
      );

    if (status === "fail")
      return (
        <div className="flex flex-col items-center">
          <XCircle className="w-16 h-16 text-red-500 mb-3" />
          <h2 className="text-2xl font-bold text-red-600">Thanh toán thất bại!</h2>
          <p className="text-gray-700 mt-2">VNPay từ chối giao dịch hoặc có lỗi xảy ra.</p>
        </div>
      );

    return (
      <div className="flex flex-col items-center">
        <XCircle className="w-16 h-16 text-red-500 mb-3" />
        <h2 className="text-2xl font-bold text-red-600">Lỗi hệ thống!</h2>
        <p className="text-gray-700 mt-2">Không thể xác minh trạng thái giao dịch.</p>
      </div>
    );
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md text-center">
        {renderContent()}
      </div>
    </div>
  );
}
