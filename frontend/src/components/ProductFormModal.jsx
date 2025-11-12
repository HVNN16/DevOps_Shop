import { useState, useEffect } from "react";

export default function ProductFormModal({ isOpen, onClose, onSubmit, editingProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    basePrice: "",
    discountPercent: 0,
    description: "",
    images: [""],
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        brand: editingProduct.brand || "",
        model: editingProduct.model || "",
        basePrice: editingProduct.basePrice || "",
        discountPercent: editingProduct.discountPercent || 0,
        description: editingProduct.description || "",
        images: editingProduct.images?.length ? editingProduct.images : [""],
      });
    } else {
      setFormData({
        name: "",
        brand: "",
        model: "",
        basePrice: "",
        discountPercent: 0,
        description: "",
        images: [""],
      });
    }
  }, [editingProduct]);

  if (!isOpen) return null;

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => setFormData({ ...formData, images: [...formData.images, ""] });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px] p-6">
        <h2 className="text-xl font-bold mb-4">
          {editingProduct ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Tên sản phẩm"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Thương hiệu (brand)"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Model"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Giá gốc (basePrice)"
            value={formData.basePrice}
            onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Giảm giá (%)"
            value={formData.discountPercent}
            onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Mô tả sản phẩm"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border p-2 rounded h-20"
          />

          <div>
            <label className="block font-medium mb-1">Ảnh sản phẩm</label>
            {formData.images.map((img, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Link ảnh #${i + 1}`}
                value={img}
                onChange={(e) => handleImageChange(i, e.target.value)}
                className="w-full border p-2 rounded mb-2"
              />
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="text-blue-600 text-sm mt-1 hover:underline"
            >
              + Thêm ảnh
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Hủy
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
