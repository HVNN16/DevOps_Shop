import { useState } from "react";
import api from "../api/axios_client";

export function ProfileForm({ user }) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      // 🔥 API thật — bạn đã có route /users/me/update
      const res = await api.put("/users/me/update", {
        name,
        phone,
        address,
      });

      alert("Cập nhật thông tin thành công!");

      // Cập nhật user vào localStorage (Frontend tự nhận)
      localStorage.setItem("user", JSON.stringify(res.data));

    } catch (err) {
      console.error(err);
      alert("Lỗi cập nhật thông tin!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Họ và tên
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 bg-white"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Số điện thoại
        </label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 bg-white"
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Địa chỉ
        </label>
        <textarea
          rows="2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 bg-white"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm disabled:opacity-60"
      >
        {loading ? "Đang lưu..." : "Lưu thay đổi"}
      </button>
    </div>
  );
}
