// src/admin/PostEvent.jsx
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { db, storage } from "../../firebase/firebaseConfig";
import { db, storage } from "../firebase/firebaseConfig";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

const PostEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      if (formData.image) {
        const storageRef = ref(
          storage,
          `events/${Date.now()}-${formData.image.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, formData.image);

        await new Promise((resolve, reject) => {
          uploadTask.on("state_changed", null, reject, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              imageUrl = downloadURL;
              resolve();
            });
          });
        });
      }

      await addDoc(collection(db, "events"), {
        title: formData.title,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        description: formData.description,
        imageUrl,
        timestamp: serverTimestamp(),
      });

      toast.success("Event posted successfully");
      setFormData({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        image: null,
      });
    } catch (error) {
      console.error("Error posting event:", error);
      toast.error("Failed to post event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-600">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          📢 Post a New Event
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Eid Celebration at Beacon Hill Park"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Date
              </label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="June 28, 2025"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Time
              </label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="8:00 AM"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Beacon Hill Park, Victoria"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Join us for a joyful gathering with food, fun, and prayers."
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Event Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
              className="w-full text-sm text-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostEvent;
