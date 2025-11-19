import { ProfileForm } from "../components/ProfileForm";
import { User } from "lucide-react";

export default function ProfilePage() {
  const mockUser = {
    id: "1",
    name: "Nguyễn Văn Nghĩa",
    email: "nghia@example.com",
    phone: "0905123456",
    address: "25 Lê Duẩn, Hải Châu, Đà Nẵng",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      
      {/* Page title */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-3 bg-blue-600 rounded-full">
          <User className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          Thông tin tài khoản
        </h1>
      </div>

      {/* Profile card */}
      <div className="bg-white shadow-lg rounded-xl p-8">
        
        {/* Avatar + basic info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
          
          {/* Avatar */}
          <img
            src={mockUser.avatar}
            alt="avatar"
            className="w-32 h-32 rounded-full shadow border object-cover"
          />

          {/* Basic info */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {mockUser.name}
            </h2>
            <p className="text-gray-500">{mockUser.email}</p>
            <p className="text-gray-500">{mockUser.phone}</p>
          </div>
        </div>

        {/* Detailed form section */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Chi tiết tài khoản
          </h3>

          <ProfileForm user={mockUser} />
        </div>
      </div>
    </div>
  );
}
