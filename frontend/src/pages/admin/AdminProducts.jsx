import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import ProductFormModal from "../../components/ProductFormModal";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/products");
      setProducts(res.data.data);
    } catch (err) {
      console.error("❌ Lỗi khi lấy sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await axios.delete(`http://localhost:8081/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("🗑️ Xóa thành công!");
        fetchProducts();
      } catch (err) {
        console.error("❌ Lỗi khi xóa sản phẩm:", err);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingProduct) {
        await axios.put(`http://localhost:8081/api/products/${editingProduct._id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("✅ Cập nhật thành công!");
      } else {
        await axios.post("http://localhost:8081/api/products", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("✅ Thêm sản phẩm thành công!");
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      console.error("❌ Lỗi khi thêm/sửa sản phẩm:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">📦 Quản lý sản phẩm</h1>
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            ➕ Thêm sản phẩm
          </button>
        </div>

        {loading ? (
          <p>Đang tải sản phẩm...</p>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2 border">Tên</th>
                  <th className="p-2 border">Hãng</th>
                  <th className="p-2 border">Giá</th>
                  <th className="p-2 border">Giảm (%)</th>
                  <th className="p-2 border text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="p-2 border">{p.name}</td>
                    <td className="p-2 border">{p.brand}</td>
                    <td className="p-2 border">{p.basePrice.toLocaleString()} ₫</td>
                    <td className="p-2 border">{p.discountPercent}%</td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => handleEdit(p)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <ProductFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          editingProduct={editingProduct}
        />
      </div>
    </div>
  );
}
