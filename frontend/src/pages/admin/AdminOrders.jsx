// import React, { useEffect, useState } from "react";
// import api from "../../api/axios_client";
// import AdminSidebar from "../../components/AdminSidebar";

// export default function AdminOrders() {
//     const [orders, setOrders] = useState([]);
//     const [selectedOrder, setSelectedOrder] = useState(null);
//     const [showModal, setShowModal] = useState(false);

//     // 🧭 Lấy tất cả đơn hàng
//     const fetchOrders = async () => {
//         try {
//             const res = await api.get("/orders/all");
//             setOrders(res.data);
//         } catch (error) {
//             console.error("❌ Lỗi khi tải danh sách đơn hàng:", error);
//         }
//     };

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     // 📄 Xem chi tiết đơn hàng
//     const handleViewDetails = (order) => {
//         setSelectedOrder(order);
//         setShowModal(true);
//     };

//     // 🔄 Cập nhật trạng thái đơn hàng
//     const handleUpdateStatus = async (orderId, newStatus) => {
//         try {
//             await api.put(`/orders/${orderId}/status`, { status: newStatus });
//             alert("✅ Cập nhật trạng thái thành công!");
//             fetchOrders();
//         } catch (error) {
//             console.error("❌ Lỗi khi cập nhật trạng thái:", error);
//             alert("❌ Cập nhật thất bại!");
//         }
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             {/* Sidebar trái */}
//             <AdminSidebar />

//             {/* Nội dung chính */}
//             <div className="flex-1 p-6">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-3xl font-bold text-gray-800">📦 Quản lý đơn hàng</h1>
//                 </div>

//                 {/* Bảng danh sách đơn hàng */}
//                 <div className="bg-white rounded-lg shadow-lg p-4">
//                     <table className="w-full border-collapse text-sm text-gray-700">
//                         <thead>
//                         <tr className="bg-gray-200 text-left">
//                             <th className="p-2 border">Mã đơn</th>
//                             <th className="p-2 border">Địa chỉ</th>
//                             <th className="p-2 border">Số điện thoại</th>
//                             <th className="p-2 border">Tổng tiền</th>
//                             <th className="p-2 border">Phương thức</th>
//                             <th className="p-2 border">Trạng thái</th>
//                             <th className="p-2 border">Ngày đặt</th>
//                             <th className="p-2 border text-center">Hành động</th>
//                             <th className="p-2 border text-center">Cập nhật trạng thái</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {orders.length > 0 ? (
//                             orders.map((order) => (
//                                 <tr key={order._id} className="hover:bg-gray-50 transition">
//                                     <td className="p-2 border text-sm text-gray-800">
//                                         {order._id.slice(-6).toUpperCase()}
//                                     </td>
//                                     <td className="p-2 border">{order.address || "Không có"}</td>
//                                     <td className="p-2 border">{order.phone || "Không có"}</td>
//                                     <td className="p-2 border font-medium text-gray-900">
//                                         {order.totalAmount?.toLocaleString("vi-VN")} ₫
//                                     </td>
//                                     <td className="p-2 border">{order.paymentMethod}</td>
//                                     <td className="p-2 border">
//                       <span
//                           className={`px-3 py-1 rounded-full text-xs font-medium ${
//                               order.status === "pending"
//                                   ? "bg-yellow-200 text-yellow-800"
//                                   : order.status === "completed"
//                                       ? "bg-green-200 text-green-800"
//                                       : "bg-red-200 text-red-800"
//                           }`}
//                       >
//                         {order.status}
//                       </span>
//                                     </td>
//                                     <td className="p-2 border">
//                                         {new Date(order.createdAt).toLocaleDateString("vi-VN")}
//                                     </td>
//                                     <td className="p-2 border text-center">
//                                         <button
//                                             onClick={() => handleViewDetails(order)}
//                                             className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
//                                         >
//                                             Xem chi tiết
//                                         </button>
//                                     </td>
//                                     <td className="p-2 border text-center space-x-2">
//                                         {order.status !== "completed" && (
//                                             <button
//                                                 onClick={() => handleUpdateStatus(order._id, "completed")}
//                                                 className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
//                                             >
//                                                 Hoàn tất
//                                             </button>
//                                         )}
//                                         {order.status !== "cancelled" && (
//                                             <button
//                                                 onClick={() => handleUpdateStatus(order._id, "cancelled")}
//                                                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
//                                             >
//                                                 Hủy
//                                             </button>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="9" className="text-center py-6 text-gray-500 italic">
//                                     Không có đơn hàng nào.
//                                 </td>
//                             </tr>
//                         )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Modal xem chi tiết đơn hàng */}
//                 {showModal && selectedOrder && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//                         <div className="bg-white rounded-lg shadow-lg w-[600px] p-6 relative">
//                             <h3 className="text-xl font-semibold mb-4">
//                                 🧾 Chi tiết đơn hàng #{selectedOrder._id}
//                             </h3>

//                             {/* 🧍 Thông tin người mua */}
//                             <p className="text-gray-700 mb-2">
//                                 <strong>👤 Người mua:</strong>{" "}
//                                 {selectedOrder.user?.name || "Không có thông tin"}
//                             </p>
//                             <p className="text-gray-700 mb-2">
//                                 <strong>📧 Email:</strong>{" "}
//                                 {selectedOrder.user?.email || "Không có email"}
//                             </p>

//                             <p className="text-gray-700 mb-2">
//                                 <strong>Địa chỉ:</strong> {selectedOrder.address}
//                             </p>
//                             <p className="text-gray-700 mb-2">
//                                 <strong>Số điện thoại:</strong> {selectedOrder.phone}
//                             </p>
//                             <p className="text-gray-700 mb-2">
//                                 <strong>Tổng tiền:</strong>{" "}
//                                 {selectedOrder.totalAmount?.toLocaleString("vi-VN")} ₫
//                             </p>
//                             <p className="text-gray-700 mb-2">
//                                 <strong>Phương thức:</strong> {selectedOrder.paymentMethod}
//                             </p>

//                             <h4 className="font-semibold mt-4 mb-2">🛒 Sản phẩm trong đơn:</h4>
//                             <ul className="list-disc pl-5 text-gray-700 space-y-1">
//                                 {selectedOrder.items?.map((item, index) => (
//                                     <li key={index}>
//                                         {item.nameSnapshot || "Sản phẩm"} — SL: {item.quantity || 1}
//                                     </li>
//                                 ))}
//                             </ul>

//                             <div className="mt-6 flex justify-end space-x-3">
//                                 <button
//                                     onClick={() => setShowModal(false)}
//                                     className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
//                                 >
//                                     Đóng
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
import React, { useEffect, useState } from "react";
import api from "../../api/axios_client";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // 🧭 Lấy tất cả đơn hàng
    const fetchOrders = async () => {
        try {
            const res = await api.get("/orders/all");
            setOrders(res.data);
        } catch (error) {
            console.error("❌ Lỗi khi tải danh sách đơn hàng:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // 📄 Xem chi tiết đơn hàng
    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    // 🔄 Cập nhật trạng thái
    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status: newStatus });
            alert("✅ Cập nhật trạng thái thành công!");
            fetchOrders();
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật trạng thái:", error);
            alert("❌ Cập nhật thất bại!");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />

            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6">📦 Quản lý đơn hàng</h1>

                <div className="bg-white rounded-lg shadow-lg p-4">
                    <table className="w-full border-collapse text-sm text-gray-700">
                        <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-2 border">Mã đơn</th>
                            <th className="p-2 border">Địa chỉ</th>
                            <th className="p-2 border">Điện thoại</th>
                            <th className="p-2 border">Tổng</th>
                            <th className="p-2 border">Phương thức</th>
                            <th className="p-2 border">Trạng thái</th>
                            <th className="p-2 border">Ngày đặt</th>
                            <th className="p-2 border">Hành động</th>
                            <th className="p-2 border">Cập nhật</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition">
                                    <td className="border p-2">{order._id.slice(-6).toUpperCase()}</td>
                                    <td className="border p-2">{order.address}</td>
                                    <td className="border p-2">{order.phone}</td>
                                    <td className="border p-2">{order.totalAmount.toLocaleString()} ₫</td>
                                    <td className="border p-2">{order.paymentMethod}</td>

                                    <td className="border p-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                order.status === "pending"
                                                    ? "bg-yellow-200 text-yellow-800"
                                                    : order.status === "delivered"
                                                    ? "bg-green-200 text-green-800"
                                                    : order.status === "cancelled"
                                                    ? "bg-red-200 text-red-800"
                                                    : "bg-gray-200"
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>

                                    <td className="border p-2">
                                        {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                                    </td>

                                    <td className="border p-2 text-center">
                                        <button
                                            onClick={() => handleViewDetails(order)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            Xem chi tiết
                                        </button>
                                    </td>

                                    <td className="border p-2 text-center space-x-2">
                                        {order.status !== "delivered" && (
                                            <button
                                                onClick={() => handleUpdateStatus(order._id, "delivered")}
                                                className="bg-green-500 text-white px-3 py-1 rounded"
                                            >
                                                Hoàn tất
                                            </button>
                                        )}

                                        {order.status !== "cancelled" && (
                                            <button
                                                onClick={() => handleUpdateStatus(order._id, "cancelled")}
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Hủy
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-6">Không có đơn nào</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {showModal && selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg w-[600px]">
                            <h3 className="text-xl font-semibold mb-4">Chi tiết đơn #{selectedOrder._id}</h3>

                            <p><b>Người mua:</b> {selectedOrder.user?.name}</p>
                            <p><b>Email:</b> {selectedOrder.user?.email}</p>
                            <p><b>Địa chỉ:</b> {selectedOrder.address}</p>
                            <p><b>SĐT:</b> {selectedOrder.phone}</p>

                            <h4 className="font-semibold mt-4">Sản phẩm:</h4>
                            <ul className="list-disc pl-6">
                                {selectedOrder.items.map((item, i) => (
                                    <li key={i}>{item.nameSnapshot} - SL: {item.quantity}</li>
                                ))}
                            </ul>

                            <div className="mt-4 text-right">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
