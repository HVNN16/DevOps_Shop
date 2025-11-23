import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  // ✅ Hàm điều hướng kèm query brand
  const handleNavigateBrand = (brand) => {
    navigate(`/products?brand=${brand}`);
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Newsletter Section */}
      {/* <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Đăng ký nhận thông tin khuyến mãi
          </h2>
          <p className="text-gray-300 mb-6">
            Nhận ngay ưu đãi 10% cho đơn hàng đầu tiên
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Đăng ký
          </button>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-800">PhoneStore</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Cửa hàng điện thoại uy tín, chất lượng hàng đầu Việt Nam
            </p>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Sản phẩm</h4>
            <ul className="space-y-2 text-sm">
              {["Apple", "Samsung", "Xiaomi", "OPPO"].map((brand) => (
                <li key={brand}>
                  <button
                    onClick={() => handleNavigateBrand(brand)}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {brand.charAt(0).toUpperCase() + brand.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate("/warranty")}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Chính sách bảo hành
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/shipping")}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Vận chuyển
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/return")}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Đổi trả
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/faq")}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-600">
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>1900 xxxx</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>support@phonestore.vn</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
