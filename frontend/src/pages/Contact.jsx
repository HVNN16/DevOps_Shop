import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import api from "../api/axios_client"; // ✅ THÊM DÒNG NÀY

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/messages", form); // ✅ Gọi API đã import
      alert("✅ " + res.data.message);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("❌ Lỗi khi gửi tin nhắn:", err);
      alert("❌ " + (err.response?.data?.message || "Gửi tin nhắn thất bại"));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-100 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Liên hệ với <span className="text-gray-800">PhoneStore</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy để lại lời nhắn hoặc liên hệ
            trực tiếp với chúng tôi qua các kênh bên dưới.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Thông tin liên hệ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Thông tin liên hệ
          </h2>
          <ul className="space-y-5 text-gray-700">
            <li className="flex items-center gap-3">
              <Phone className="text-black" size={20} />
              <span>
                Hotline: <strong>0901 234 567</strong>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-black" size={20} />
              <span>
                Email:{" "}
                <a
                  href="mailto:support@phonestore.vn"
                  className="underline hover:text-gray-900"
                >
                  support@phonestore.vn
                </a>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="text-black" size={20} />
              <span>Địa chỉ: 123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
            </li>
          </ul>

          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 mb-2">Giờ làm việc</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Thứ 2 - Thứ 7: 8:00 - 21:00
              <br />
              Chủ nhật: 9:00 - 18:00
            </p>
          </div>
        </div>

        {/* Form liên hệ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Gửi tin nhắn cho chúng tôi
          </h2>

          {submitted ? (
            <div className="text-center py-10">
              <p className="text-xl font-semibold text-green-600 mb-2">
                ✅ Cảm ơn bạn đã liên hệ!
              </p>
              <p className="text-gray-600">
                Chúng tôi sẽ phản hồi sớm nhất có thể qua email của bạn.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Nhập họ tên của bạn"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="example@email.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Nội dung
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  placeholder="Nhập nội dung tin nhắn..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-gray-800 transition"
              >
                <Send size={18} />
                <span>Gửi tin nhắn</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Google Map */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Bản đồ</h2>
        <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-sm border border-gray-200">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.502783287855!2d106.70042307480552!3d10.772215589375393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f40417bb5e5%3A0x3039b2c52e0f540!2zMTIzIE5ndXnhu4VuIEh14buDLCBRdeG6rW4gMSwgSOG7kyBDaMOtbmggTWluaCBLaMOhbmgsIFRWIEhDTQ!5e0!3m2!1svi!2s!4v1699999999999!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
