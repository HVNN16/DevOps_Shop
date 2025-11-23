// import { Link, useNavigate } from "react-router-dom";
// import { Phone, Search, ShoppingCart, User } from "lucide-react";
//
// export default function Header() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };
//
//   return (
//     <header className="bg-white border-b border-gray-200 shadow-sm">
//       <div className="max-w-7xl mx-auto px-6 py-4">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <div
//             onClick={() => navigate("/")}
//             className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
//           >
//             <Phone className="w-6 h-6 text-gray-800" />
//             <h1 className="text-xl font-bold text-gray-800">PhoneStore</h1>
//           </div>
//
//           {/* Navigation Menu */}
//           <nav className="flex items-center gap-8">
//             <Link
//               to="/"
//               className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
//             >
//               Trang chủ
//             </Link>
//             <Link
//               to="/products"
//               className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
//             >
//               Sản phẩm
//             </Link>
//             <Link
//               to="/about"
//               className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
//             >
//               Giới thiệu
//             </Link>
//             <Link
//               to="/contact"
//               className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
//             >
//               Liên hệ
//             </Link>
//           </nav>
//
//           {/* Right Side Icons */}
//           <div className="flex items-center gap-6">
//
//             {/* Cart Icon */}
//             <Link
//               to="/cart"
//               className="text-gray-700 hover:text-gray-900 transition-colors relative"
//             >
//               <ShoppingCart className="w-5 h-5" />
//             </Link>
//
//             {/* Profile/Login Icon */}
//             {user ? (
//               <div className="relative group">
//                 <button className="text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2">
//                   <User className="w-5 h-5" />
//                   <span className="text-sm font-medium">{user.name}</span>
//                 </button>
//
//                 {/* Dropdown Menu */}
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                   <div className="py-2">
//                     <Link
//                       to="/profile"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                     >
//                       Thông tin cá nhân
//                     </Link>
//                     <Link
//                       to="/orders"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                     >
//                       Đơn hàng của tôi
//                     </Link>
//                     {user.role === "admin" && (
//                       <Link
//                         to="/admin"
//                         className="block px-4 py-2 text-sm text-amber-600 hover:bg-amber-50 font-medium"
//                       >
//                         Trang quản trị
//                       </Link>
//                     )}
//                     <hr className="my-2" />
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//                     >
//                       Đăng xuất
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 className="text-gray-700 hover:text-gray-900 transition-colors"
//               >
//                 <User className="w-5 h-5" />
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import { Phone, ShoppingCart, User, Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import api from "../api/axios_client";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // 🔹 Lấy số lượng giỏ hàng
  const fetchCartCount = async () => {
    try {
      const res = await api.get("/cart");
      const items = res.data?.items || [];
      const total = items.reduce((sum, i) => sum + i.quantity, 0);
      setCartCount(total);
    } catch (err) {
      console.error("GET /cart error:", err.response?.data || err.message);
    }
  };

  // 🔹 Lấy số lượng wishlist
  const fetchWishlistCount = async () => {
    try {
      const res = await api.get("/wishlist");
      setWishlistCount(res.data.length);
    } catch (err) {
      console.error("GET /wishlist error:", err.response?.data || err.message);
    }
  };

  // 🔹 Lắng nghe sự kiện cartUpdated & wishlistUpdated
  useEffect(() => {
    fetchCartCount();
    fetchWishlistCount();

    window.addEventListener("cartUpdated", fetchCartCount);
    window.addEventListener("wishlistUpdated", fetchWishlistCount);

    return () => {
      window.removeEventListener("cartUpdated", fetchCartCount);
      window.removeEventListener("wishlistUpdated", fetchWishlistCount);
    };
  }, []);

  // 🔹 Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Phone className="w-6 h-6 text-gray-800" />
            <h1 className="text-xl font-bold text-gray-800">PhoneStore</h1>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Sản phẩm
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Giới thiệu
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Liên hệ
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            {/* ❤️ Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* 🛒 Cart Icon */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile/Login */}
            {user ? (
              <div className="relative group">
                <button className="text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Thông tin cá nhân
                    </Link>

                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Đơn hàng của tôi
                    </Link>

                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-amber-600 hover:bg-amber-50 font-medium"
                      >
                        Trang quản trị
                      </Link>
                    )}

                    <hr className="my-2" />

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
