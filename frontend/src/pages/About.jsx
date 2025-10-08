import React from "react";
import { ShieldCheck, Truck, Star, Phone, Users } from "lucide-react";

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-100 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Giới thiệu về <span className="text-gray-800">PhoneStore</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            PhoneStore là hệ thống bán lẻ điện thoại chính hãng hàng đầu, mang đến cho bạn
            những sản phẩm công nghệ mới nhất từ các thương hiệu nổi tiếng thế giới.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
            alt="About PhoneStore"
            className="rounded-2xl shadow-md border border-gray-200 object-cover w-full h-[380px]"
          />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Chúng tôi là ai?
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Được thành lập từ năm 2020, <strong>PhoneStore</strong> hướng tới mục tiêu trở thành
            chuỗi cửa hàng điện thoại và thiết bị thông minh hàng đầu Việt Nam.
            Với tiêu chí <em>“Chính hãng – Uy tín – Tận tâm”</em>, chúng tôi luôn đặt trải nghiệm
            của khách hàng lên hàng đầu.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Chúng tôi cung cấp đa dạng sản phẩm từ các thương hiệu lớn như
            <span className="font-semibold"> Apple, Samsung, Xiaomi, OPPO, OnePlus</span>...
            cùng nhiều chương trình ưu đãi hấp dẫn và chính sách hậu mãi tốt nhất.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-y border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Vì sao khách hàng chọn PhoneStore?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-center w-14 h-14 bg-black text-white rounded-full mb-4">
                <ShieldCheck size={26} />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Chính hãng 100%
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Toàn bộ sản phẩm được nhập chính ngạch từ nhà phân phối uy tín, đảm bảo nguồn gốc rõ ràng.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-center w-14 h-14 bg-black text-white rounded-full mb-4">
                <Truck size={26} />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Giao hàng toàn quốc
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Hỗ trợ giao hàng nhanh chóng đến 63 tỉnh thành, miễn phí vận chuyển cho đơn hàng đủ điều kiện.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-center w-14 h-14 bg-black text-white rounded-full mb-4">
                <Star size={26} />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Dịch vụ tận tâm
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Đội ngũ nhân viên tư vấn nhiệt tình, hỗ trợ khách hàng 24/7 với thái độ chuyên nghiệp và tận tâm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tầm nhìn & Sứ mệnh
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Chúng tôi mong muốn trở thành hệ thống bán lẻ điện thoại được khách hàng tin tưởng và yêu thích nhất tại Việt Nam.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>PhoneStore</strong> cam kết không ngừng cải tiến, nâng cao chất lượng sản phẩm và dịch vụ, mang lại giá trị bền vững cho người dùng.
          </p>
        </div>

        {/* Image */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=800&q=80"
            alt="Vision & Mission"
            className="rounded-2xl shadow-md border border-gray-200 object-cover w-full h-[350px]"
          />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-black text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-3">Liên hệ với chúng tôi</h2>
        <p className="text-gray-300 mb-8">
          Cần tư vấn hoặc hỗ trợ? Đội ngũ PhoneStore luôn sẵn sàng phục vụ bạn 24/7.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          <Phone size={18} />
          <span>Liên hệ ngay</span>
        </a>
      </section>

      {/* Team section (optional but nice touch) */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Đội ngũ của chúng tôi</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Đằng sau mỗi sản phẩm là một đội ngũ trẻ trung, năng động, luôn không ngừng học hỏi và sáng tạo để mang đến trải nghiệm tốt nhất cho khách hàng.
        </p>
        <div className="flex justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center w-64">
            <Users size={40} className="text-gray-900 mb-4" />
            <p className="font-semibold text-gray-900">Đội ngũ PhoneStore</p>
            <p className="text-gray-500 text-sm">Tận tâm - Nhiệt huyết - Sáng tạo</p>
          </div>
        </div>
      </section>
    </div>
  );
}
