import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newSize, setNewSize] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const ref = doc(db, "products", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProduct(snap.data());
        } else {
          toast.error("Product not found");
          navigate("/admin/manageProduc");
        }
      } catch (err) {
        toast.error("Failed to fetch product", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSize = () => {
    const size = newSize.trim();
    if (!size) return toast.warning("Size cannot be empty");
    if (product.sizes.includes(size)) {
      return toast.warning("Size already exists");
    }

    setProduct((prev) => ({
      ...prev,
      sizes: [...prev.sizes, size],
    }));
    setNewSize("");
  };

  const handleRemoveSize = (sizeToRemove) => {
    setProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s !== sizeToRemove),
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const ref = doc(db, "products", id);
      await updateDoc(ref, {
        ...product,
        price: parseFloat(product.price),
      });
      toast.success("✅ Product updated");
      navigate("/admin/manageProduct");
    } catch (error) {
      toast.error("❌ Update failed", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-10 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          ✏️ Edit Product
        </h1>

        <form onSubmit={handleUpdate} className="grid gap-4">
          <input
            type="text"
            name="name"
            value={product.name || ""}
            onChange={handleChange}
            className="px-4 py-2 border rounded"
            placeholder="Product Name"
            required
          />
          <input
            type="number"
            name="price"
            value={product.price || ""}
            onChange={handleChange}
            className="px-4 py-2 border rounded"
            placeholder="Price"
            required
          />
          <input
            type="text"
            name="shortDesc"
            value={product.shortDesc || ""}
            onChange={handleChange}
            className="px-4 py-2 border rounded"
            placeholder="Short Description"
            required
          />
          <textarea
            name="longDesc"
            value={product.longDesc || ""}
            onChange={handleChange}
            className="px-4 py-2 border rounded"
            placeholder="Long Description"
            rows="3"
            required
          />
          <input
            type="text"
            name="category"
            value={product.category || ""}
            onChange={handleChange}
            className="px-4 py-2 border rounded"
            placeholder="Category (e.g. brother, sister, prayer)"
            required
          />

          {/* ✅ Stock toggle */}
          <select
            name="inStock"
            value={product.inStock ? "true" : "false"}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                inStock: e.target.value === "true",
              }))
            }
            className="px-4 py-2 border rounded"
          >
            <option value="true">Available</option>
            <option value="false">Out of Stock</option>
          </select>

          {/* ✅ Size management */}
          <div className="bg-gray-50 p-4 rounded border">
            <h2 className="font-semibold text-blue-600 mb-2">Sizes</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.sizes?.map((size, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {size}
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(size)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                className="flex-1 px-3 py-2 border rounded"
                placeholder="Enter new size (e.g. M, L, XL)"
              />
              <button
                type="button"
                onClick={handleAddSize}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Add Size
              </button>
            </div>
          </div>

          {/* ✅ Submit */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            💾 Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
