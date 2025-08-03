import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AdminManageProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "products", id));
      toast.success("Product deleted");
    } catch (err) {
      toast.error("Failed to delete product", err);
    }
  };

  const toggleStockStatus = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, "products", id), {
        inStock: !currentStatus,
      });
      toast.info(`Marked as ${!currentStatus ? "Available" : "Out of Stock"}`);
    } catch {
      toast.error("Failed to update stock status");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-10 px-4 sm:px-8">
      <ToastContainer />
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-6 text-center">
        🛠 Manage Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md border p-4 flex flex-col justify-between"
            >
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="h-40 w-full object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-bold text-blue-700">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm">{product.shortDesc}</p>
              <p className="text-green-600 font-semibold mt-2">
                UGX {product.price?.toLocaleString()}
              </p>
              <p
                className={`mt-1 text-sm ${
                  product.inStock ? "text-green-700" : "text-red-600"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => navigate(`/admin/edit-product/${product.id}`)}
                  className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200 text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 text-sm"
                >
                  🗑️ Delete
                </button>
                <button
                  onClick={() => toggleStockStatus(product.id, product.inStock)}
                  className={`${
                    product.inStock
                      ? "bg-gray-100 text-gray-800"
                      : "bg-green-100 text-green-700"
                  } px-3 py-1 rounded hover:opacity-80 text-sm`}
                >
                  {product.inStock ? "Mark Out of Stock" : "Mark Available"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminManageProducts;
