export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Trang quản trị</h1>
      <p>Xin chào, {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Vai trò: {user?.role}</p>
    </div>
  );
}
