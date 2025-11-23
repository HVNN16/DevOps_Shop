import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios_client";
import ProductCard from "../components/ProductCard";
import { Range } from "react-range";

export default function Products() {
  const [searchParams] = useSearchParams();
  const urlBrand = searchParams.get("brand");

  const [products, setProducts] = useState([]);
  const [brands] = useState(["Apple", "Samsung", "Xiaomi", "OPPO", "Google", "OnePlus"]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(40000000);
  const [inStock, setInStock] = useState(false);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const params = {
        page,
        limit: 12,
        search: search || undefined,
        brand: selectedBrands.join(",") || urlBrand || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
      };

      const res = await api.get("/products", { params });

      let data = res.data.data;

      setTotalPages(res.data.pagination.totalPages);

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

  useEffect(() => {
    // Nếu có brand từ URL
    if (urlBrand && !selectedBrands.includes(urlBrand)) {
      setSelectedBrands([urlBrand]);
    }

    fetchProducts();
    // eslint-disable-next-line
  }, [selectedBrands, minPrice, maxPrice, inStock, search, urlBrand, page]);

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setPage(1); // reset về trang 1 khi đổi filter
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-2 text-gray-900">
        {urlBrand ? `Sản phẩm ${urlBrand.toUpperCase()}` : "Tất cả sản phẩm"}
      </h1>

      <p className="text-gray-500 mb-6">
        Khám phá {products.length} sản phẩm điện thoại cao cấp
      </p>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Tìm kiếm điện thoại..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Bộ lọc */}
        <aside className="md:col-span-1">
<div className="border rounded-xl p-5 bg-white shadow-sm sticky top-20">

            <h2 className="font-bold text-lg mb-4">Bộ lọc</h2>

            {/* Thương hiệu */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Thương hiệu</h3>
              {brands.map((b) => (
                <label key={b} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b)}
                    onChange={() => handleBrandChange(b)}
                  />
                  {b}
                </label>
              ))}
            </div>

            {/* Price Filter */}
            <div className="mt-6">
  <h3 className="font-semibold mb-2">Khoảng giá</h3>

  <Range
    step={500000}
    min={0}
    max={40000000}
    values={[minPrice, maxPrice]}
    onChange={(values) => {
      setMinPrice(values[0]);
      setMaxPrice(values[1]);
      setPage(1);
    }}
    renderTrack={({ props, children }) => (
      <div
        {...props}
        className="h-2 bg-gray-200 rounded relative"
        style={{ marginTop: "20px" }}
      >
        <div
          className="bg-blue-500 h-2 rounded absolute"
          style={{
            left: `${(minPrice / 40000000) * 100}%`,
            right: `${100 - (maxPrice / 40000000) * 100}%`,
          }}
        />
        {children}
      </div>
    )}
    renderThumb={({ props }) => (
      <div
        {...props}
        className="w-5 h-5 bg-blue-500 rounded-full shadow cursor-pointer"
      />
    )}
  />

  {/* Hiển thị giá */}
  <div className="flex justify-between text-sm mt-3">
    <span>{minPrice.toLocaleString()} ₫</span>
    <span>{maxPrice.toLocaleString()} ₫</span>
  </div>

  <button
    onClick={() => {
      fetchProducts();
      setPage(1);
    }}
    className="mt-3 w-full bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 transition"
  >
    Áp dụng
  </button>
</div>
            {/* In stock */}
            <div className="mt-4">
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

        {/* Danh sách sản phẩm */}
        <section className="md:col-span-3">

          {loading ? (
            <p className="text-center text-gray-500 mt-10">Đang tải...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Không có sản phẩm</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
{/* Pagination */}
              <div className="flex justify-center gap-3 mt-10">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  ⬅ Prev
                </button>

                <span className="px-4 py-2 font-bold">
                  Trang {page}/{totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next ➡
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}