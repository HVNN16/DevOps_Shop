import { useState } from "react";
import api from "../api/axios_client";

export function ProfileForm({ user }) {

  // Form thông tin tài khoản
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    address: user.address || "",
    avatar: user.avatar || "",
  });

  // Form đổi mật khẩu
  const [passForm, setPassForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Cập nhật profile
  const handleUpdate = async () => {
    try {
      await api.put("/users/me", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Cập nhật thành công!");
    } catch (err) {
      console.error(err);
      alert("❌ Cập nhật thất bại!");
    }
  };

  // 🔹 Đổi mật khẩu
  const handleChangePassword = async () => {
    if (!passForm.oldPassword || !passForm.newPassword) {
      alert("Vui lòng nhập đủ thông tin!");
      return;
    }

    try {
      await api.put("/users/change-password", passForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🔑 Đổi mật khẩu thành công!");
      setPassForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert("❌ Mật khẩu cũ không đúng!");
    }
  };

  return (
    <div className="space-y-8">

      {/* Thông tin cá nhân */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block font-medium mb-1">Họ và tên</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Số điện thoại</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Địa chỉ</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Avatar URL</label>
          <input
            name="avatar"
            value={form.avatar}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
      </div>

      {/* Nút Lưu */}
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Lưu thay đổi
      </button>

      {/* Đổi mật khẩu */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-3">Đổi mật khẩu</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="password"
            placeholder="Mật khẩu cũ"
            value={passForm.oldPassword}
            onChange={(e) =>
              setPassForm({ ...passForm, oldPassword: e.target.value })
            }
            className="border rounded w-full p-2"
          />

          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={passForm.newPassword}
            onChange={(e) =>
              setPassForm({ ...passForm, newPassword: e.target.value })
            }
            className="border rounded w-full p-2"
          />
        </div>

        <button
          onClick={handleChangePassword}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Đổi mật khẩu
        </button>
      </div>
    </div>
  );
}
