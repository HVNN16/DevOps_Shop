import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios_client";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi khi đăng ký");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký</h2>
        <input
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 mb-3 rounded"
        />
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
          Đăng ký
        </button>
        <p className="mt-3 text-center">
          Đã có tài khoản? <Link to="/login" className="text-indigo-600">Đăng nhập</Link>
        </p>
      </form>
    </div>
  );
}
