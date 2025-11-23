import { useEffect, useState } from "react";
import api from "../api/axios_client";
import { User as UserIcon } from "lucide-react";
import { ProfileForm } from "../components/ProfileForm";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("❌ Lỗi tải thông tin user:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user)
    return <p className="text-center mt-20 text-gray-500">Đang tải thông tin tài khoản...</p>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      {/* Title */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-3 bg-blue-600 rounded-full">
          <UserIcon className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Thông tin tài khoản</h1>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-8">
        {/* Avatar & Basic Info */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <img
            src={user.avatar || "https://i.pravatar.cc/150"}
            alt="avatar"
            className="w-32 h-32 rounded-full shadow border object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500">{user.phone}</p>
          </div>
        </div>

        {/* Form */}
        <div className="border-t pt-6">
          <ProfileForm
            user={user}
            onUpdated={(updatedUser) => setUser(updatedUser)} 
          />
        </div>
      </div>
    </div>
  );
}
