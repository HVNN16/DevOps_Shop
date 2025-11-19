import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import ProductList from "./pages/ProductList";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";

import CheckoutPage from "./pages/CheckoutPage";
import OrderList from "./pages/OrderList";
import VNPayReturn from "./pages/VNPayReturn";

import ProfilePage from "./pages/ProfilePage";


import { CartProvider } from "./context/CartContext"; // BỌC TOÀN ỨNG DỤNG

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />

        <main className="min-h-[80vh]">
          <Routes>
            {/* 🌐 PUBLIC ROUTES */}
            <Route path="/" element={<ProductList />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* 🧾 CHECKOUT + ORDERS */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/vnpay-return" element={<VNPayReturn />} />

            {/* 👤 AUTH */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ⚙️ ADMIN ROUTES */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              }
            />

            {/* ❌ 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
