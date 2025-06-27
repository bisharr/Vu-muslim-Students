import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Contact = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        userId: user?.uid || null,
        createdAt: serverTimestamp(),
      });
      toast.success("Message sent successfully!");
      setFormData((prev) => ({
        ...prev,
        message: "",
      }));
    } catch (err) {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-6 sm:p-10">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">
            📩 Reach Out to the MCV Team
          </h2>
          <p className="text-gray-700 text-md sm:text-lg">
            Whether you’re a student or a community member, we welcome your
            thoughts. Questions, ideas, or support needs? Send us a message!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 bg-gray-100 text-gray-700"
            readOnly={!!user}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 bg-gray-100 text-gray-700"
            readOnly={!!user}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
