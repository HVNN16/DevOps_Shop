// import { useState, useEffect } from "react";

// export default function ProductFormModal({ isOpen, onClose, onSubmit, editingProduct }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     brand: "",
//     model: "",
//     basePrice: "",
//     discountPercent: 0,
//     description: "",
//     images: [""],
//   });

//   useEffect(() => {
//     if (editingProduct) {
//       setFormData({
//         name: editingProduct.name || "",
//         brand: editingProduct.brand || "",
//         model: editingProduct.model || "",
//         basePrice: editingProduct.basePrice || "",
//         discountPercent: editingProduct.discountPercent || 0,
//         description: editingProduct.description || "",
//         images: editingProduct.images?.length ? editingProduct.images : [""],
//       });
//     } else {
//       setFormData({
//         name: "",
//         brand: "",
//         model: "",
//         basePrice: "",
//         discountPercent: 0,
//         description: "",
//         images: [""],
//       });
//     }
//   }, [editingProduct]);

//   if (!isOpen) return null;

//   const handleImageChange = (index, value) => {
//     const newImages = [...formData.images];
//     newImages[index] = value;
//     setFormData({ ...formData, images: newImages });
//   };

//   const addImageField = () => setFormData({ ...formData, images: [...formData.images, ""] });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg w-[500px] p-6">
//         <h2 className="text-xl font-bold mb-4">
//           {editingProduct ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-3">
//           <input
//             type="text"
//             placeholder="Tên sản phẩm"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Thương hiệu (brand)"
//             value={formData.brand}
//             onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Model"
//             value={formData.model}
//             onChange={(e) => setFormData({ ...formData, model: e.target.value })}
//             className="w-full border p-2 rounded"
//           />
//           <input
//             type="number"
//             placeholder="Giá gốc (basePrice)"
//             value={formData.basePrice}
//             onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="number"
//             placeholder="Giảm giá (%)"
//             value={formData.discountPercent}
//             onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
//             className="w-full border p-2 rounded"
//           />
//           <textarea
//             placeholder="Mô tả sản phẩm"
//             value={formData.description}
//             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//             className="w-full border p-2 rounded h-20"
//           />

//           <div>
//             <label className="block font-medium mb-1">Ảnh sản phẩm</label>
//             {formData.images.map((img, i) => (
//               <input
//                 key={i}
//                 type="text"
//                 placeholder={`Link ảnh #${i + 1}`}
//                 value={img}
//                 onChange={(e) => handleImageChange(i, e.target.value)}
//                 className="w-full border p-2 rounded mb-2"
//               />
//             ))}
//             <button
//               type="button"
//               onClick={addImageField}
//               className="text-blue-600 text-sm mt-1 hover:underline"
//             >
//               + Thêm ảnh
//             </button>
//           </div>

//           <div className="flex justify-end gap-3 pt-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 rounded"
//             >
//               Hủy
//             </button>
//             <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
//               Lưu
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";

export default function ProductFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingProduct,
}) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    basePrice: "",
    discountPercent: 0,
    description: "",
    images: [""],
    variants: [
      {
        color: "",
        storage: "",
        ram: "",
        price: "",
        stock: 0,
        images: [""],
      },
    ],
  });

  // Load dữ liệu khi chỉnh sửa
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        ...editingProduct,
        images: editingProduct.images?.length
          ? editingProduct.images
          : [""],
        variants: editingProduct.variants?.length
          ? editingProduct.variants
          : [
              {
                color: "",
                storage: "",
                ram: "",
                price: editingProduct.basePrice,
                stock: 0,
                images: [""],
              },
            ],
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
        variants: [
          {
            color: "",
            storage: "",
            ram: "",
            price: "",
            stock: 0,
            images: [""],
          },
        ],
      });
    }
  }, [editingProduct]);

  if (!isOpen) return null;

  // =====================
  //  HANDLE IMAGE CHANGE
  // =====================
  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () =>
    setFormData({ ...formData, images: [...formData.images, ""] });

  // =====================
  //  VARIANT HANDLERS
  // =====================
  const handleVariantChange = (i, field, value) => {
    const newVariants = [...formData.variants];
    newVariants[i][field] = value;
    setFormData({ ...formData, variants: newVariants });
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        {
          color: "",
          storage: "",
          ram: "",
          price: "",
          stock: 0,
          images: [""],
        },
      ],
    });
  };

  const removeVariant = (i) => {
    const updated = [...formData.variants];
    updated.splice(i, 1);
    setFormData({ ...formData, variants: updated });
  };

  const handleVariantImageChange = (variantIndex, imgIndex, value) => {
    const updated = [...formData.variants];
    updated[variantIndex].images[imgIndex] = value;
    setFormData({ ...formData, variants: updated });
  };

  const addVariantImage = (variantIndex) => {
    const updated = [...formData.variants];
    updated[variantIndex].images.push("");
    setFormData({ ...formData, variants: updated });
  };

  // =====================
  //  SUBMIT FORM
  // =====================
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[650px] p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
          {editingProduct ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Những trường cơ bản */}
          <input
            type="text"
            placeholder="Tên sản phẩm"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Thương hiệu"
            value={formData.brand}
            onChange={(e) =>
              setFormData({ ...formData, brand: e.target.value })
            }
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Model"
            value={formData.model}
            onChange={(e) =>
              setFormData({ ...formData, model: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Giá gốc (basePrice)"
            value={formData.basePrice}
            onChange={(e) =>
              setFormData({ ...formData, basePrice: e.target.value })
            }
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="number"
            placeholder="Giảm giá (%)"
            value={formData.discountPercent}
            onChange={(e) =>
              setFormData({
                ...formData,
                discountPercent: e.target.value,
              })
            }
            className="w-full border p-2 rounded"
          />

          <textarea
            placeholder="Mô tả sản phẩm"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border p-2 rounded h-24"
          />

          {/* Ảnh tổng */}
          <div>
            <label className="font-semibold mb-2 block">Ảnh sản phẩm</label>
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
              className="text-blue-600 hover:underline text-sm"
            >
              + Thêm ảnh
            </button>
          </div>

          {/* ========================
                BIẾN THỂ (VARIANTS)
              ======================== */}
          <div>
            <h3 className="text-lg font-bold mb-2">Biến thể</h3>

            {formData.variants.map((v, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg mb-4 bg-gray-50"
              >
                <div className="grid grid-cols-2 gap-3">

                  <input
                    type="text"
                    placeholder="Màu sắc"
                    value={v.color}
                    onChange={(e) =>
                      handleVariantChange(index, "color", e.target.value)
                    }
                    className="border p-2 rounded"
                  />

                  <input
                    type="text"
                    placeholder="Dung lượng (128GB)"
                    value={v.storage}
                    onChange={(e) =>
                      handleVariantChange(index, "storage", e.target.value)
                    }
                    className="border p-2 rounded"
                  />

                  <input
                    type="text"
                    placeholder="RAM (8GB)"
                    value={v.ram}
                    onChange={(e) =>
                      handleVariantChange(index, "ram", e.target.value)
                    }
                    className="border p-2 rounded"
                  />

                  <input
                    type="number"
                    placeholder="Giá biến thể"
                    value={v.price}
                    onChange={(e) =>
                      handleVariantChange(index, "price", e.target.value)
                    }
                    className="border p-2 rounded"
                  />

                  <input
                    type="number"
                    placeholder="Tồn kho"
                    value={v.stock}
                    onChange={(e) =>
                      handleVariantChange(index, "stock", e.target.value)
                    }
                    className="border p-2 rounded"
                  />
                </div>

                {/* Ảnh của biến thể */}
                <div className="mt-3">
                  <label className="text-sm font-semibold">Ảnh biến thể</label>
                  {v.images.map((img, imgIndex) => (
                    <input
                      key={imgIndex}
                      type="text"
                      placeholder={`Ảnh #${imgIndex + 1}`}
                      value={img}
                      onChange={(e) =>
                        handleVariantImageChange(
                          index,
                          imgIndex,
                          e.target.value
                        )
                      }
                      className="w-full border p-2 rounded mt-2"
                    />
                  ))}

                  <button
                    type="button"
                    onClick={() => addVariantImage(index)}
                    className="text-blue-600 hover:underline text-sm mt-1"
                  >
                    + Thêm ảnh biến thể
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="mt-3 text-red-600 hover:underline text-sm"
                >
                  Xoá biến thể
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addVariant}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
            >
              + Thêm biến thể
            </button>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Lưu sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
