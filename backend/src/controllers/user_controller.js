// import bcrypt from "bcryptjs";
// import User from "../models/user_model.js";

// // 🟢 Lấy danh sách người dùng
// // export const getUsers = async (req, res) => {
// //   try {
// //     const users = await User.find().select("-password");
// //     res.json(users);
// //   } catch (err) {
// //     res.status(500).json({ message: "Lỗi server" });
// //   }
// // };

// // 🟢 Lấy danh sách người dùng + phân trang
// export const getUsers = async (req, res) => {
//   try {
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const total = await User.countDocuments();

//     const users = await User.find()
//       .select("-password")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     res.json({
//       success: true,
//       data: users,
//       pagination: {
//         total,
//         page,
//         totalPages: Math.ceil(total / limit),
//       }
//     });
//   } catch (err) {
//     console.error("❌ Lỗi server:", err);
//     res.status(500).json({ message: "Lỗi server" });
//   }
// };


// // 🟢 Thêm người dùng mới
// export const createUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     if (!name || !email || !password)
//       return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });

//     const existing = await User.findOne({ email });
//     if (existing)
//       return res.status(400).json({ message: "Email đã tồn tại" });

//     const hashed = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       name,
//       email,
//       password: hashed,
//       role: role || "user",
//     });

//     await newUser.save();
//     res.status(201).json({ message: "Thêm người dùng thành công" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Lỗi server" });
//   }
// };

// // 🟡 Cập nhật người dùng
// export const updateUser = async (req, res) => {
//   try {
//     const { name, email, role, password } = req.body;
//     const user = await User.findById(req.params.id);

//     if (!user)
//       return res.status(404).json({ message: "Không tìm thấy người dùng" });

//     user.name = name || user.name;
//     user.email = email || user.email;
//     user.role = role || user.role;

//     if (password) {
//       user.password = await bcrypt.hash(password, 10);
//     }

//     await user.save();
//     res.json({ message: "Cập nhật thành công" });
//   } catch (err) {
//     res.status(500).json({ message: "Lỗi server" });
//   }
// };

// // 🔴 Xóa người dùng
// export const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user)
//       return res.status(404).json({ message: "Không tìm thấy người dùng" });

//     await User.findByIdAndDelete(req.params.id);
//     res.json({ message: "Xóa người dùng thành công" });
//   } catch (err) {
//     res.status(500).json({ message: "Lỗi server" });
//   }
// };


import bcrypt from "bcryptjs";
import User from "../models/user_model.js";

// 🟢 ADMIN – Lấy danh sách người dùng + phân trang
export const getUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments();

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: users,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      }
    });
  } catch (err) {
    console.error("❌ Lỗi server:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// 🟢 ADMIN – Thêm user
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email đã tồn tại" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashed,
      role: role || "user",
    });

    await newUser.save();
    res.status(201).json({ message: "Thêm người dùng thành công" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// 🟡 ADMIN – Cập nhật user (bao gồm cập nhật mật khẩu)
export const updateUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ message: "Cập nhật thành công" });

  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// 🔴 ADMIN – Xóa user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa người dùng thành công" });

  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};


// ============================================================================
// ⭐⭐ PHẦN QUAN TRỌNG — API DÀNH CHO USER (Profile Page)
// ============================================================================


// 🟢 USER – Lấy thông tin tài khoản
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// 🟢 USER – Cập nhật thông tin cá nhân
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, email, phone, address, avatar } = req.body;

    const updated = await User.findByIdAndUpdate(
      userId,
      { name, email, phone, address, avatar },
      { new: true }
    ).select("-password");

    res.json({ message: "Cập nhật hồ sơ thành công!", user: updated });

  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật hồ sơ" });
  }
};

// 🟡 USER – Đổi mật khẩu
export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;

    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(userId);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Mật khẩu cũ không đúng!" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Đổi mật khẩu thành công!" });

  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

