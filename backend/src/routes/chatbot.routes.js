import express from "express";
import axios from "axios";
import Product from "../models/Product.js";

const router = express.Router();
const GROQ_KEY = process.env.GROQ_API_KEY;
const CLIENT_URL = "http://44.222.231.16:3000/";

router.post("/smart", async (req, res) => {
  try {
    const { message } = req.body;
    const text = message.toLowerCase();

    // ============================
    // 🧠 1) Xác định intent
    // ============================
    const intents = {
      highest: ["đắt nhất", "cao nhất", "flagship", "xịn nhất"],
      lowest: ["rẻ nhất", "thấp nhất", "giá thấp"],
      mid: ["tầm trung", "vừa tiền"],
      cheap: ["giá rẻ", "bình dân"],
    };

    const isHighest = intents.highest.some((k) => text.includes(k));
    const isLowest = intents.lowest.some((k) => text.includes(k));

    // ============================
    // 🧠 2) Lọc theo thương hiệu
    // ============================
    const brandMap = {
      iphone: "Apple",
      apple: "Apple",
      samsung: "Samsung",
      xiaomi: "Xiaomi",
      oppo: "OPPO",
      vivo: "Vivo",
      realme: "Realme",
    };

    const query = {};
    for (const key in brandMap) {
      if (text.includes(key)) query.brand = brandMap[key];
    }

    // ============================
    // 🧠 3) Lọc theo giá (text)
    // ============================
    const priceRules = [
      { kw: ["dưới 5", "5 triệu"], max: 5000000 },
      { kw: ["dưới 7", "7 triệu"], max: 7000000 },
      { kw: ["dưới 10", "10 triệu"], max: 10000000 },
      { kw: ["dưới 15", "15 triệu"], max: 15000000 },
      { kw: ["dưới 20", "20 triệu"], max: 20000000 },
    ];

    for (const rule of priceRules) {
      if (rule.kw.some((k) => text.includes(k))) {
        query.basePrice = { $lte: rule.max };
      }
    }

    // ============================
    // 🧠 4) Sort theo Intent
    // ============================
    let sort = {};

    if (isHighest) sort.basePrice = -1; // Desc
    else if (isLowest) sort.basePrice = 1; // Asc

    // ============================
    // 🧠 5) Query database thông minh
    // ============================
    const products = await Product.find(query)
      .sort(sort)
      .limit(3)
      .lean();

    // Nếu query rỗng (không tìm thấy) → lấy sản phẩm random
    const productText = products.length
      ? JSON.stringify(products, null, 2)
      : "Không tìm thấy sản phẩm phù hợp.";

    // ============================
    // 🧠 6) Chuẩn dữ liệu gửi AI
    // ============================
    const formattedProducts = products
      .map((p) => {
        return `
<div class="chat-product-card">
  <img class="chat-product-image" src="${p.images?.[0] || "https://via.placeholder.com/150"}" />

  <div class="chat-product-info">
    <div class="chat-product-title">${p.name}</div>
    <div class="chat-product-price">${(p.finalPrice || p.basePrice).toLocaleString("vi-VN")}₫</div>
    <div class="chat-product-desc">${p.specs?.camera || "Camera đẹp"}, ${p.specs?.battery || "Pin tốt"}</div>

    <a class="chat-product-btn" target="_blank" href="${CLIENT_URL}/product/${p._id}">
      Xem chi tiết
    </a>
  </div>
</div>
`;
      })
      .join("\n");

    // ============================
    // 🧠 7) Prompt trả HTML
    // ============================
    const prompt = `
Bạn là trợ lý bán hàng PhoneStore, hãy tư vấn thật tự nhiên.

Người dùng hỏi: "${message}"

Yêu cầu trả lời:
1. Trước tiên hãy nói 1–2 câu tư vấn thân thiện bằng tiếng Việt
   (ví dụ: "Với nhu cầu của bạn, em chọn giúp mình 3 mẫu phù hợp nhất ạ!")
2. Sau đó HIỂN THỊ HTML THUẦN các sản phẩm ngay bên dưới
3. KHÔNG bọc HTML bằng markdown, không dùng \`\`\`
4. Tuyệt đối không thêm chữ nào SAU HTML

HTML sản phẩm (đã được chuẩn bị sẵn):

${formattedProducts}

Bắt đầu trả lời theo đúng format yêu cầu:
- Đoạn tư vấn tiếng Việt ở trên
- HTML sản phẩm ở dưới
`;

    // ============================
    // CALL GROQ
    // ============================
    const aiRes = await axios({
      method: "POST",
      url: "https://api.groq.com/openai/v1/chat/completions",
      headers: {
        Authorization: `Bearer ${GROQ_KEY}`,
        "Content-Type": "application/json",
      },
      data: {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "Bạn là trợ lý bán hàng chuyên nghiệp." },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
      },
    });

    return res.json({ reply: aiRes.data.choices[0].message.content });

  } catch (err) {
    console.log("CHATBOT ERROR:", err.response?.data || err);
    return res.status(500).json({ error: "AI error" });
  }
});

export default router;
