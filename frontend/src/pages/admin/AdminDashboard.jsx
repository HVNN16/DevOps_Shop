import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import UserFormModal from "../../components/UserFormModal";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi lấy danh sách user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      try {
        await axios.delete(`http://localhost:8081/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("🗑️ Xóa thành công!");
        fetchUsers();
      } catch (err) {
        console.error("❌ Lỗi khi xóa user:", err);
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingUser) {
        await axios.put(
          `http://localhost:8081/api/users/${editingUser._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("✅ Cập nhật thành công!");
      } else {
        await axios.post("http://localhost:8081/api/users", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("✅ Thêm người dùng thành công!");
      }
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      console.error("❌ Lỗi khi thêm/sửa user:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">📊 Trang quản trị</h1>
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            ➕ Thêm người dùng
          </button>
        </div>

        {loading ? (
          <p>Đang tải danh sách người dùng...</p>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-4">👥 Danh sách người dùng</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2 border">Tên</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Vai trò</th>
                  <th className="p-2 border">Ngày tạo</th>
                  <th className="p-2 border text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="p-2 border">{u.name}</td>
                    <td className="p-2 border">{u.email}</td>
                    <td className="p-2 border">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          u.role === "admin"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="p-2 border">
                      {new Date(u.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => handleEdit(u)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500"
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        🗑️ Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <UserFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          editingUser={editingUser}
        />
      </div>
    </div>
  );
}
