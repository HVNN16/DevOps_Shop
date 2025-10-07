import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center bg-indigo-600 text-white px-6 py-3 shadow-md">
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold cursor-pointer hover:text-gray-200"
      >
        DevOps Shop
      </h1>

      <nav className="space-x-4 flex items-center">
        <Link to="/">Trang chủ</Link>
        <Link to="/cart">Giỏ hàng</Link>


        {user ? (
          <>
            {/* ✅ Nếu là admin thì hiển thị thêm nút “Trang quản trị” */}
            {user.role === "admin" && (
              <Link
                to="/admin"
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
              >
                Trang quản trị
              </Link>
            )}

            <span className="ml-2">Xin chào, <b>{user.name}</b></span>
            <button
              onClick={handleLogout}
              className="ml-3 underline hover:text-gray-200"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Đăng nhập</Link>
            <Link to="/register">Đăng ký</Link>
          </>
        )}
      </nav>
    </header>
  );
}
