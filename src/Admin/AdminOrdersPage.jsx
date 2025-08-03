import { useEffect, useState, useRef } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { deleteDoc } from "firebase/firestore"; // ⬅️ add to top with other imports

import { db } from "../firebase/firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { transportMoney } from "../pages/Checkout";

// ...import statements remain unchanged

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const initialized = useRef(false);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (initialized.current && newOrders.length > orders.length) {
        toast.info("🛎️ New order received!");
      }

      setOrders(newOrders);
      initialized.current = true;
    });

    return () => unsubscribe();
  }, [orders.length]);

  useEffect(() => {
    let filtered = [...orders];

    if (statusFilter !== "All") {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.fullName?.toLowerCase().includes(q) ||
          o.email?.toLowerCase().includes(q) ||
          o.phone?.toLowerCase().includes(q) ||
          o.address?.toLowerCase().includes(q)
      );
    }

    setFilteredOrders(filtered);
  }, [orders, statusFilter, searchQuery]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });
      toast.success(`Status updated to "${newStatus}"`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (
      window.confirm("Are you sure you want to permanently delete this order?")
    ) {
      try {
        await deleteDoc(doc(db, "orders", orderId));
        toast.success("🗑️ Order deleted successfully");
      } catch (error) {
        toast.error("❌ Failed to delete order", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-10 px-4 sm:px-8">
      <ToastContainer />
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-6 text-center">
        📦 Admin Orders Management
      </h1>

      {/* 🔍 Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
        <input
          type="text"
          placeholder="Search by name, email, phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 rounded border shadow-sm w-full sm:w-96"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded border shadow-sm"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500">No matching orders found.</p>
      ) : (
        <div className="grid gap-6">
          {filteredOrders.map((order) => {
            const firstItem = order.cartItems?.[0];
            return (
              <div
                key={order.id}
                className="bg-white p-6 rounded-xl shadow border border-blue-100 flex flex-col gap-3 sm:gap-4"
              >
                {/* 👤 Customer Info + Timestamp */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <h2 className="text-lg font-bold text-blue-700">
                    {order.fullName}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {order.timestamp instanceof Timestamp
                      ? order.timestamp.toDate().toLocaleString()
                      : ""}
                  </span>
                </div>

                {/* 🛍️ Product Preview */}
                {firstItem && (
                  <div className="flex items-center gap-4 border p-2 rounded-md bg-blue-50">
                    <img
                      src={firstItem.images?.[0]}
                      alt={firstItem.name}
                      className="w-16 h-16 object-cover rounded shadow"
                    />
                    <p className="font-medium text-blue-800 text-sm sm:text-base">
                      {firstItem.name}
                    </p>
                  </div>
                )}

                {/* 📋 Order Meta Info */}
                <div className="grid gap-2 text-sm sm:grid-cols-2 md:grid-cols-3">
                  <p>
                    📍 <strong>Address:</strong> {order.address}
                  </p>
                  <p>
                    ☎️ <strong>Phone:</strong> {order.phone}
                  </p>
                  <p>
                    📧 <strong>Email:</strong> {order.email}
                  </p>
                  <p>
                    📧 <strong>UserName:</strong> {order.name}
                  </p>
                  <p>
                    🚲 <strong>Transport:</strong> : UGX{" "}
                    {transportMoney.toLocaleString()}
                  </p>
                  <p>
                    💰 <strong>Total:</strong>{" "}
                    <span className="text-green-700 font-semibold">
                      UGX {(order.total + transportMoney).toLocaleString()}
                    </span>
                  </p>
                  <p>
                    💳 <strong>Payment:</strong> {order.paymentMethod}
                  </p>
                  <p>
                    📦 <strong>Status:</strong>{" "}
                    <span
                      className={`font-medium ${
                        order.status === "Pending"
                          ? "text-yellow-500"
                          : order.status === "Shipped"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </p>
                </div>

                {/* 🛠️ Status Controls */}
                <div className="flex flex-wrap gap-3 mt-2">
                  <button
                    onClick={() => handleStatusChange(order.id, "Pending")}
                    className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded hover:bg-yellow-200 text-sm"
                  >
                    Set as Pending
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id, "Shipped")}
                    className="bg-green-100 text-green-800 px-4 py-2 rounded hover:bg-green-200 text-sm"
                  >
                    Mark as Shipped
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id, "Cancelled")}
                    className="bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200 text-sm"
                  >
                    Cancel Order
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 text-sm"
                  >
                    🗑️ Delete Order
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
