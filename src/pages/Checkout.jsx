import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
// import emailjs from "@emailjs/browser";
export const transportMoney = 4000;
const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [form, setForm] = useState({
    name: auth.currentUser?.displayName || "",
    email: auth.currentUser?.email || "",
    phone: "",
    address: "",
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      return toast.error("Please fill all fields.");
    }

    if (paymentMethod === "online") {
      return toast.info("🛠️ Online Payment coming soon.");
    }

    try {
      const orderData = {
        ...form,
        cartItems,
        total,
        paymentMethod,
        userId: auth.currentUser?.uid || null,
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), orderData);

      // Send confirmation email
      // await emailjs.send(
      //   "service_zpxv5nn",
      //   "YOUR_TEMPLATE_ID",
      //   {
      //     user_name: form.name,
      //     user_email: form.email,
      //     order_total: total.toLocaleString(),
      //   },
      //   "YOUR_PUBLIC_KEY"
      // );

      toast.success("✅ Order placed! Confirmation sent.");
      clearCart();
      navigate("/order-success");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded shadow">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-700 mb-6 text-center">
          🧾 Checkout
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="space-y-4 text-sm sm:text-base">
            {cartItems.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <span className="font-medium">
                    {item.name} ({item.size})
                  </span>{" "}
                  × {item.quantity}
                </div>
                <span className="text-green-700 font-semibold">
                  UGX {(item.price * item.quantity).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
          <div className="text-right font-bold text-lg sm:text-xl mt-4">
            TransPort: UGX {transportMoney.toLocaleString()}
          </div>
          <div className="text-right font-bold text-lg sm:text-xl mt-4">
            Total: UGX {(total + transportMoney).toLocaleString()}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Customer Info</h2>
          <form className="grid gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-4 py-2 border rounded"
              required
            />
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Delivery Address"
              className="w-full px-4 py-2 border rounded"
              rows="3"
              required
            />
          </form>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
              <input type="radio" name="payment" value="online" disabled />
              Online Payment (Coming Soon)
            </label>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handlePlaceOrder}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto"
          >
            ✅ Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
