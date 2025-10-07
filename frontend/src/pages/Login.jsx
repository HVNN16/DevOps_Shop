import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios_client";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Đăng nhập thành công!");

      // ✅ Nếu là admin → chuyển hướng sang trang quản trị
      if (res.data.user.role === "admin") {
        navigate("/admin"); // ví dụ: trang quản trị
      } else {
        navigate("/"); // người dùng bình thường
      }
    } catch (err) {
      setError(err.response?.data?.message || "Sai email hoặc mật khẩu");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 mb-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 mb-4 rounded"
        />

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Đăng nhập
        </button>

        <p className="mt-3 text-center">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-indigo-600">Đăng ký ngay</Link>
        </p>
      </form>
    </div>
  );
}
