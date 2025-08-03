import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "products"));
      const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (!maxPrice || product.price <= parseInt(maxPrice)) &&
      (selectedCategory === "All" || product.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-10">
          🛍️ Muslim Outfit Store
        </h1>

        {/* 🔍 Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 justify-center">
          <input
            type="text"
            placeholder="Search by name..."
            className="px-4 py-2 border rounded-lg shadow-sm w-full sm:w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price (UGX)"
            className="px-4 py-2 border rounded-lg shadow-sm w-full sm:w-60"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        {/* 📂 Category Filters */}
        <div className="flex gap-2 flex-wrap justify-center mb-6">
          {["All", "Brother", "Sister", "Prayer"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1 rounded-full border ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 🛒 Product Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border flex flex-col transition hover:scale-[1.02]"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-blue-700 mb-1">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.shortDesc}
                  </p>
                  <p className="text-green-700 text-lg font-semibold mb-1">
                    UGX {product.price.toLocaleString()}
                  </p>
                  <p
                    className={`text-sm font-medium mb-3 ${
                      product.inStock ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {product.inStock ? "✅ Available" : "❌ Out of Stock"}
                  </p>
                  <div className="mt-auto">
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full transition font-medium"
                    >
                      More Details →
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">
              No products found. Soon We will Upload...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
