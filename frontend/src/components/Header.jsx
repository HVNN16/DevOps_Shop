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
    <header className="flex justify-between items-center bg-indigo-600 text-white px-6 py-3">
      <h1 className="text-xl font-bold">DevOps Shop</h1>
      <nav className="space-x-4">
        <Link to="/">Trang chủ</Link>
        <Link to="/products">Sản phẩm</Link>
        {user ? (
          <>
            <span>Xin chào, {user.name}</span>
            <button onClick={handleLogout} className="ml-3 underline">Đăng xuất</button>
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
