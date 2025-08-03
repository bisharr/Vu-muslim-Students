import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4 py-10">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 text-center border border-green-200">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          🎉 Congratulations!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Your order has been placed successfully.
        </p>
        <p className="text-gray-600 mb-6">
          One of our staff will give you a phone call shortly to confirm your
          address. After confirmation, your package will be delivered right to
          your door 🚪📦
        </p>
        <button
          onClick={() => navigate("/halalStyle")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          🛍️ Back to Shop
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
