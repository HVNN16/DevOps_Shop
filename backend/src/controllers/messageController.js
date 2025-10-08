import Message from "../models/Message.js";

// ✅ Gửi tin nhắn (từ trang liên hệ)
export const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin." });
    }

    const newMessage = await Message.create({ name, email, message });
    res.status(201).json({ message: "Tin nhắn đã được gửi thành công!", data: newMessage });
  } catch (err) {
    console.error("❌ Lỗi khi lưu tin nhắn:", err);
    res.status(500).json({ message: "Lỗi máy chủ." });
  }
};

// ✅ (Tuỳ chọn) Lấy danh sách tin nhắn - dành cho admin
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ." });
  }
};
