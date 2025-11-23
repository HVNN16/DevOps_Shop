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

//     // 🔄 Cập nhật trạng thái
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
//             <AdminSidebar />

//             <div className="flex-1 p-6">
//                 <h1 className="text-3xl font-bold mb-6">📦 Quản lý đơn hàng</h1>

//                 <div className="bg-white rounded-lg shadow-lg p-4">
//                     <table className="w-full border-collapse text-sm text-gray-700">
//                         <thead>
//                         <tr className="bg-gray-200 text-left">
//                             <th className="p-2 border">Mã đơn</th>
//                             <th className="p-2 border">Địa chỉ</th>
//                             <th className="p-2 border">Điện thoại</th>
//                             <th className="p-2 border">Tổng</th>
//                             <th className="p-2 border">Phương thức</th>
//                             <th className="p-2 border">Trạng thái</th>
//                             <th className="p-2 border">Ngày đặt</th>
//                             <th className="p-2 border">Hành động</th>
//                             <th className="p-2 border">Cập nhật</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {orders.length > 0 ? (
//                             orders.map((order) => (
//                                 <tr key={order._id} className="hover:bg-gray-50 transition">
//                                     <td className="border p-2">{order._id.slice(-6).toUpperCase()}</td>
//                                     <td className="border p-2">{order.address}</td>
//                                     <td className="border p-2">{order.phone}</td>
//                                     <td className="border p-2">{order.totalAmount.toLocaleString()} ₫</td>
//                                     <td className="border p-2">{order.paymentMethod}</td>

//                                     <td className="border p-2">
//                                         <span
//                                             className={`px-3 py-1 rounded-full text-xs font-bold ${
//                                                 order.status === "pending"
//                                                     ? "bg-yellow-200 text-yellow-800"
//                                                     : order.status === "delivered"
//                                                     ? "bg-green-200 text-green-800"
//                                                     : order.status === "cancelled"
//                                                     ? "bg-red-200 text-red-800"
//                                                     : "bg-gray-200"
//                                             }`}
//                                         >
//                                             {order.status}
//                                         </span>
//                                     </td>

//                                     <td className="border p-2">
//                                         {new Date(order.createdAt).toLocaleDateString("vi-VN")}
//                                     </td>

//                                     <td className="border p-2 text-center">
//                                         <button
//                                             onClick={() => handleViewDetails(order)}
//                                             className="bg-blue-500 text-white px-3 py-1 rounded"
//                                         >
//                                             Xem chi tiết
//                                         </button>
//                                     </td>

//                                     <td className="border p-2 text-center space-x-2">
//                                         {order.status !== "delivered" && (
//                                             <button
//                                                 onClick={() => handleUpdateStatus(order._id, "delivered")}
//                                                 className="bg-green-500 text-white px-3 py-1 rounded"
//                                             >
//                                                 Hoàn tất
//                                             </button>
//                                         )}

//                                         {order.status !== "cancelled" && (
//                                             <button
//                                                 onClick={() => handleUpdateStatus(order._id, "cancelled")}
//                                                 className="bg-red-500 text-white px-3 py-1 rounded"
//                                             >
//                                                 Hủy
//                                             </button>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="9" className="text-center py-6">Không có đơn nào</td>
//                             </tr>
//                         )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Modal */}
//                 {showModal && selectedOrder && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//                         <div className="bg-white p-6 rounded-lg w-[600px]">
//                             <h3 className="text-xl font-semibold mb-4">Chi tiết đơn #{selectedOrder._id}</h3>

//                             <p><b>Người mua:</b> {selectedOrder.user?.name}</p>
//                             <p><b>Email:</b> {selectedOrder.user?.email}</p>
//                             <p><b>Địa chỉ:</b> {selectedOrder.address}</p>
//                             <p><b>SĐT:</b> {selectedOrder.phone}</p>

//                             <h4 className="font-semibold mt-4">Sản phẩm:</h4>
//                             <ul className="list-disc pl-6">
//                                 {selectedOrder.items.map((item, i) => (
//                                     <li key={i}>{item.nameSnapshot} - SL: {item.quantity}</li>
//                                 ))}
//                             </ul>

//                             <div className="mt-4 text-right">
//                                 <button
//                                     onClick={() => setShowModal(false)}
//                                     className="bg-gray-500 text-white px-4 py-2 rounded"
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

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    const fetchOrders = async (page = 1) => {
        try {
            const res = await api.get(`/orders/all?page=${page}&limit=${limit}`);
            setOrders(res.data.data);
            setTotalPages(res.data.pagination.totalPages);
        } catch (error) {
            console.error("❌ Lỗi khi tải danh sách đơn hàng:", error);
        }
    };

    useEffect(() => {
        fetchOrders(page);
    }, [page]);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status: newStatus });
            alert("✅ Cập nhật trạng thái thành công!");
            fetchOrders(page);
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
                                <th className="p-2 border">Xem</th>
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
                                                Xem
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

                    {/* PHÂN TRANG */}
                    <div className="flex justify-center mt-4 space-x-3">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                        >
                            ⬅ Prev
                        </button>

                        <span className="px-4 py-1 font-bold">
                            Trang {page}/{totalPages}
                        </span>

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Next ➡
                        </button>
                    </div>
                </div>

                {/* Modal hiển thị chi tiết */}
                {showModal && selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg w-[600px]">
                            <h3 className="text-xl font-semibold mb-4">
                                Chi tiết đơn #{selectedOrder._id}
                            </h3>

                            <p><b>Người mua:</b> {selectedOrder.user?.name}</p>
                            <p><b>Email:</b> {selectedOrder.user?.email}</p>
                            <p><b>Địa chỉ:</b> {selectedOrder.address}</p>
                            <p><b>SĐT:</b> {selectedOrder.phone}</p>

                            <h4 className="font-semibold mt-4">Sản phẩm:</h4>
                            <ul className="list-disc pl-6">
                                {selectedOrder.items.map((item, i) => (
                                    <li key={i}>
                                        {item.nameSnapshot} — SL: {item.quantity}
                                    </li>
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
