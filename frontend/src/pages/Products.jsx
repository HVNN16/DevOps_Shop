import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios_client";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [searchParams] = useSearchParams();
  const urlBrand = searchParams.get("brand"); // ✅ lấy brand từ query param

  const [products, setProducts] = useState([]);
  const [brands] = useState(["Apple", "Samsung", "Xiaomi", "OPPO", "Google", "OnePlus"]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(40000000);
  const [inStock, setInStock] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Lấy dữ liệu sản phẩm từ backend
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const params = {
        search: search || undefined,
        brand: selectedBrands.join(",") || urlBrand || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        limit: 12,
      };

      const res = await api.get("/products", { params });
      let data = res.data.data;

      // ✅ Lọc theo hàng còn tồn kho
      if (inStock) {
        data = data.filter((p) => p.variants?.some((v) => v.stock > 0));
      }

      setProducts(data);
    } catch (err) {
      console.error("❌ Lỗi khi tải sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch lại khi có thay đổi bộ lọc hoặc query URL
  useEffect(() => {
    // Nếu có brand từ URL (vd: /products?brand=samsung)
    if (urlBrand && !selectedBrands.includes(urlBrand)) {
      setSelectedBrands([urlBrand]);
    }
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBrands, minPrice, maxPrice, inStock, search, urlBrand]);

  // ✅ Thay đổi chọn thương hiệu
  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Tiêu đề & mô tả */}
      <h1 className="text-3xl font-bold mb-2 text-gray-900">
        {urlBrand
          ? `Sản phẩm ${urlBrand.toUpperCase()}`
          : "Tất cả sản phẩm"}
      </h1>
      <p className="text-gray-500 mb-6">
        Khám phá {products.length} sản phẩm điện thoại cao cấp
      </p>

      {/* Ô tìm kiếm */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm điện thoại..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 🧭 Cột bên trái: Bộ lọc */}
        <aside className="md:col-span-1">
          <div className="border rounded-xl p-5 bg-white shadow-sm sticky top-20">
            <h2 className="font-bold text-lg mb-4">Bộ lọc</h2>

            {/* Thương hiệu */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Thương hiệu</h3>
              <div className="flex flex-col gap-1 text-sm">
                {brands.map((b) => (
                  <label key={b} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(b)}
                      onChange={() => handleBrandChange(b)}
                    />
                    {b}
                  </label>
                ))}
              </div>
            </div>

            {/* Khoảng giá */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Khoảng giá</h3>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-24 border border-gray-300 rounded px-2 py-1 text-sm"
                  placeholder="Từ"
                  min={0}
                />
                <span>-</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-24 border border-gray-300 rounded px-2 py-1 text-sm"
                  placeholder="Đến"
                  min={minPrice}
                />
              </div>

              <button
                onClick={fetchProducts}
                className="mt-3 w-full bg-black text-white text-sm font-medium py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Áp dụng
              </button>
            </div>

            {/* Hàng còn */}
            <div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={() => setInStock(!inStock)}
                />
                Chỉ hiển thị hàng còn
              </label>
            </div>
          </div>
        </aside>

        {/* 🛍️ Cột bên phải: Danh sách sản phẩm */}
        <section className="md:col-span-3">
          <h2 className="font-semibold text-gray-700 mb-4">
            Hiển thị {products.length} sản phẩm
          </h2>

          {loading ? (
            <p className="text-center text-gray-500 mt-10">Đang tải sản phẩm...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              Không tìm thấy sản phẩm nào.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
