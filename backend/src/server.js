import "./config/env.js";
import { connectDB } from "./config/db.js";
import app from "./app.js";
import bcrypt from "bcryptjs";
import User from "./models/user_model.js"; 

const PORT = process.env.PORT || 8081;

// 🧠 Hàm kiểm tra & tạo admin nếu chưa có
async function ensureAdminAccount() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "123456";
    const adminName = process.env.ADMIN_NAME || "Super Admin";

    // Kiểm tra xem đã có admin chưa
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log(`ℹ️ Admin đã tồn tại: ${existingAdmin.email}`);
      return;
    }

    // Hash mật khẩu rồi tạo admin mới
    const hashed = await bcrypt.hash(adminPassword, 10);
    const newAdmin = await User.create({
      name: adminName,
      email: adminEmail,
      password: hashed,
      role: "admin",
    });

    console.log("✅ Tạo tài khoản admin mặc định thành công:");
    console.log({
      email: newAdmin.email,
      password: adminPassword,
      role: newAdmin.role,
    });
  } catch (error) {
    console.error("❌ Lỗi khi tạo admin:", error);
  }
}

(async () => {
  await connectDB();          
  await ensureAdminAccount(); 
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📚 Swagger UI: http://localhost:${PORT}/api-docs`);
  });
})();
