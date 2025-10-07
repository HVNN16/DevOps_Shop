import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import ProductList from "./pages/ProductList";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/ProductDetails";

import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";


import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
function App() {
  return (
    <BrowserRouter>
        <Header />
        <main className="min-h-[80vh]">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFound />} />
            <Route
                  path="/admin"
                  element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                  }
            />
          </Routes>
        </main>
        <Footer />
    </BrowserRouter>
  );
}
export default App;
