import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [suggested, setSuggested] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // 🔄 Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      const ref = doc(db, "products", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setProduct({ ...data, id: snap.id });
        setActiveImage(data.images?.[0]);
      } else {
        toast.error("Product not found.");
      }
    };
    fetchProduct();
  }, [id]);

  // 🧠 Suggested products
  useEffect(() => {
    const fetchSuggested = async () => {
      const querySnap = await getDocs(collection(db, "products"));
      const items = querySnap.docs
        .filter((docSnap) => docSnap.id !== id)
        .map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      setSuggested(items);
    };
    fetchSuggested();
  }, [id]);

  if (!product) {
    return (
      <div className="text-center mt-20 text-red-500 font-semibold">
        Loading product...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* 🖼️ Image Gallery */}
          <div>
            <img
              src={activeImage}
              alt="Selected Product"
              className="w-full h-[400px] object-cover rounded-xl shadow"
            />
            <div className="flex gap-4 mt-4">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    activeImage === img ? "border-blue-500" : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ℹ️ Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-blue-700 mb-2">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500 mb-1">
              Category: {product.category}
            </p>
            <p
              className={`text-sm font-medium mb-3 ${
                product.inStock ? "text-green-600" : "text-red-500"
              }`}
            >
              {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
            </p>

            <p className="text-gray-700 mb-4">{product.longDesc}</p>
            <p className="text-2xl text-green-700 font-semibold mb-6">
              UGX {product.price.toLocaleString()}
            </p>

            {/* 📏 Size Selector */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Choose Size:</h3>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border ${
                      selectedSize === size
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ➕ Add to Cart Button */}
            <button
              disabled={!selectedSize || !product.inStock}
              onClick={() => {
                addToCart(product, selectedSize);
                navigate("/cart");
              }}
              className={`w-full py-3 rounded text-white font-semibold transition ${
                selectedSize && product.inStock
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {selectedSize
                ? product.inStock
                  ? `Add ${selectedSize} to Cart`
                  : "Out of Stock"
                : "Select Size"}
            </button>
          </div>
        </div>

        {/* 🔙 Back to Shop Button */}
        <button
          onClick={() => navigate("/halalStyle")}
          className="mb-10 mt-10 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded hover:bg-blue-200 transition"
        >
          ← Back to Shop
        </button>

        {/* ⭐ Suggested Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
            🧕 You May Also Like
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {suggested.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow border overflow-hidden transition hover:scale-[1.02]"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-blue-700 font-bold text-lg mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{item.shortDesc}</p>
                  <p className="text-green-700 font-semibold text-sm mb-4">
                    UGX {item.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full text-sm"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
