import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
      <nav className="flex flex-col space-y-2">
        <Link to="/admin" className="hover:bg-gray-700 px-3 py-2 rounded">
          📊 Dashboard
        </Link>
        <Link to="/admin/users" className="hover:bg-gray-700 px-3 py-2 rounded">
          👥 Quản lý người dùng
        </Link>
        <Link to="/admin/products" className="hover:bg-gray-700 px-3 py-2 rounded">
          📦 Quản lý sản phẩm
        </Link>
        <Link to="/admin/orders" className="hover:bg-gray-700 px-3 py-2 rounded">
          🧾 Đơn hàng
        </Link>
      </nav>
      <div className="mt-auto border-t border-gray-700 pt-4 text-sm text-gray-400">
        © 2025 Phone Store
      </div>
    </div>
  );
}
