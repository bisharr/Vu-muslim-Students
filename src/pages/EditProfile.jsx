import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db, storage } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const EditProfile = () => {
  const { user } = useAuth();

  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", photoURL: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchUser = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        const data = snap.data();
        setForm({
          name: data.name || "",
          phone: data.phone || "",
          photoURL: data.photoURL || "",
        });
        setPreview(data.photoURL || null);
      }
    };
    fetchUser();
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    // Validate phone format (basic: 10 digits)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(form.phone)) {
      toast.error("Phone number must be 10 to 15 digits.");
      return;
    }

    try {
      setLoading(true);

      let photoURL = form.photoURL;

      // Upload profile picture if changed
      if (image) {
        const imageRef = ref(storage, `profiles/${user.uid}-${uuidv4()}`);
        await uploadBytes(imageRef, image);
        photoURL = await getDownloadURL(imageRef);
      }

      await updateDoc(doc(db, "users", user.uid), {
        name: form.name,
        phone: form.phone,
        photoURL,
      });

      toast.success("Profile updated!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Current user info:", user);
  }, [user]);

  if (!user)
    return (
      <p className="text-center mt-20">Please sign in to edit your profile.</p>
    );

  return (
    <div className="max-w-lg mx-auto mt-20 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        Edit Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-24 h-24 rounded-full object-cover border mt-2"
          />
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
