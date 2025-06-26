import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setForm({ name: data.name || "", phone: data.phone || "" });
      }
    };
    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name: form.name,
        phone: form.phone,
      });
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!user)
    return (
      <p className="text-center mt-20">Please sign in to edit your profile.</p>
    );

  return (
    <div className="max-w-lg mx-auto mt-20 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        Edit Profile
      </h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
