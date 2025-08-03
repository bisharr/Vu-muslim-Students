import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage, auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UploadProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    sizes: "",
    shortDesc: "",
    longDesc: "",
    category: "Brother",
    inStock: true,
  });
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !product.name ||
      !product.price ||
      !product.sizes ||
      !product.shortDesc ||
      !product.longDesc ||
      images.length === 0
    ) {
      toast.error("Please fill all fields and upload images.");
      return;
    }

    setUploading(true);
    try {
      const imageUrls = await Promise.all(
        images.map(async (img) => {
          const storageRef = ref(storage, `products/${Date.now()}_${img.name}`);
          const uploadTask = await uploadBytesResumable(storageRef, img);
          const url = await getDownloadURL(uploadTask.ref);
          return url;
        })
      );

      const user = auth.currentUser;
      const sizesArray = product.sizes.split(",").map((s) => s.trim());

      await addDoc(collection(db, "products"), {
        name: product.name,
        price: Number(product.price),
        sizes: sizesArray,
        shortDesc: product.shortDesc,
        longDesc: product.longDesc,
        images: imageUrls,
        category: product.category,
        inStock: product.inStock,
        timestamp: serverTimestamp(),
        userRef: user.uid,
      });

      toast.success("✅ Product uploaded successfully!");
      navigate("/halalStyle");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to upload product.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 px-6 py-12">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          📤 Upload New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="w-full border px-4 py-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price (UGX)"
            className="w-full border px-4 py-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="sizes"
            placeholder="Sizes (comma separated e.g., S,M,L)"
            className="w-full border px-4 py-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="shortDesc"
            placeholder="Short Description"
            className="w-full border px-4 py-2 rounded"
            onChange={handleChange}
            required
          />
          <textarea
            name="longDesc"
            placeholder="Long Description"
            rows="4"
            className="w-full border px-4 py-2 rounded"
            onChange={handleChange}
            required
          ></textarea>

          {/* 🏷️ Category */}
          <select
            name="category"
            className="w-full border px-4 py-2 rounded"
            onChange={handleChange}
            value={product.category}
            required
          >
            <option value="Brother">Brother</option>
            <option value="Sister">Sister</option>
            <option value="Prayer">Prayer</option>
          </select>

          {/* ✅ Stock Availability */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={product.inStock}
              onChange={() =>
                setProduct((prev) => ({ ...prev, inStock: !prev.inStock }))
              }
            />
            <span className="text-gray-700">Product in stock?</span>
          </label>

          {/* 📷 Images */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            {uploading ? "Uploading..." : "Upload Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
