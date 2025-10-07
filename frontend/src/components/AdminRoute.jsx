import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Nếu chưa đăng nhập
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-3">⚠️ Bạn chưa đăng nhập</h1>
        <p className="text-gray-700 mb-4">Vui lòng đăng nhập để tiếp tục.</p>
        <a
          href="/login"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Đăng nhập ngay
        </a>
      </div>
    );
  }

  // Nếu đã đăng nhập nhưng không phải admin
  if (user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-3">🚫 Truy cập bị từ chối</h1>
        <p className="text-gray-700 mb-4">
          Trang này chỉ dành cho <span className="font-semibold text-indigo-700">quản trị viên (Admin)</span>.
        </p>
        <a
          href="/"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Quay lại Trang chủ
        </a>
      </div>
    );
  }

  // Nếu là admin → cho phép truy cập
  return children;
}
