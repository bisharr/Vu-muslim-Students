import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const backtoShop = () => {
    navigate("/halalStyle");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          🛒 Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-lg font-medium">
              🧺 Your cart is currently empty.
            </p>
            <button
              onClick={backtoShop}
              className="mt-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
            >
              🛍️ Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* 🧾 Cart Items */}
            <div className="space-y-6 mb-8">
              {cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white p-4 rounded-xl shadow border gap-4 flex-col sm:flex-row"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border hover:scale-105 transition"
                    />
                    <div className="flex flex-col gap-1">
                      <h2 className="font-semibold text-blue-700 text-lg">
                        {item.name}{" "}
                        <span className="text-sm">({item.size})</span>
                      </h2>
                      <p className="text-sm text-gray-600">
                        UGX {item.price.toLocaleString()} each
                      </p>
                      <div className="flex items-center mt-2 gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="px-3 py-1 text-lg bg-gray-200 rounded hover:bg-gray-300"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="text-md font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="px-3 py-1 text-lg bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-center sm:text-right">
                    <p className="text-green-700 font-semibold mb-1">
                      UGX {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 💳 Total & Buttons */}
            <div className="bg-white p-6 rounded-xl shadow text-center border">
              <h2 className="text-2xl font-bold mb-4 text-blue-800">
                🧾 Total: UGX {total.toLocaleString()}
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                <button
                  onClick={clearCart}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-medium"
                >
                  🧹 Clear Cart
                </button>
                <button
                  onClick={() => navigate("/checkout")}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium"
                >
                  ✅ Proceed to Checkout
                </button>
                <button
                  onClick={backtoShop}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium"
                >
                  🛍️ Back to Shop
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
