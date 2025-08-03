import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { transportMoney } from "../pages/Checkout";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = auth.currentUser?.uid;

  const fetchOrders = async () => {
    try {
      const q = query(collection(db, "orders"), where("userId", "==", userId));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: "cancelled by user",
        cancelledByUser: true,
      });
      toast.info("Order has been cancelled.");
      fetchOrders(); // refresh
    } catch (err) {
      console.error("Error cancelling order:", err);
      toast.error("Failed to cancel order.");
    }
  };

  useEffect(() => {
    if (userId) fetchOrders();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          📦 My Orders
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-600">
            You haven't placed any orders yet.
          </p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const firstItem = order.cartItems?.[0];
              const totalAmount = order.cartItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    {firstItem?.images?.[0] && (
                      <img
                        src={firstItem.images[0]}
                        alt={firstItem.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
                    <div>
                      <h2 className="text-lg font-semibold text-blue-800">
                        {firstItem?.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Total: UGX{" "}
                        {(totalAmount + transportMoney).toLocaleString()}
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          order.status === "cancelled by user"
                            ? "text-red-500"
                            : "text-green-700"
                        }`}
                      >
                        Status: {order.status}
                      </p>
                    </div>
                  </div>

                  {order.status !== "cancelled by user" && (
                    <button
                      onClick={() => handleCancel(order.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
                    >
                      Cancel Order
                    </button>
                  )}

                  {order.status === "cancelled by user" && (
                    <p className="text-sm text-red-500 font-semibold">
                      ❌ You cancelled this order
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
