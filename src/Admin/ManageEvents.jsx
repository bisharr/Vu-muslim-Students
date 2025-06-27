// src/admin/ManageEvents.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { toast } from "react-toastify";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsRef = collection(db, "events");
      const q = query(eventsRef, orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const fetchedEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(fetchedEvents);
    } catch (err) {
      toast.error("Failed to fetch events");
    }
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteDoc(doc(db, "events", id));
      toast.success("Event deleted");
      fetchEvents();
    }
  };

  const handleSave = async (id) => {
    try {
      await updateDoc(doc(db, "events", id), formData);
      toast.success("Event updated");
      setEditingId(null);
      fetchEvents();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-10">
        Manage Events
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
          >
            {event.imageUrl && (
              <img
                src={event.imageUrl}
                alt="Event Poster"
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-5">
              {editingId === event.id ? (
                <div className="space-y-2">
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-1"
                  />
                  <input
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-1"
                  />
                  <input
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-1"
                  />
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-1"
                  />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-1"
                  />

                  <div className="flex justify-between mt-3">
                    <button
                      onClick={() => handleSave(event.id)}
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-blue-700 mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">
                    📅 {event.date} • 🕒 {event.time} • 📍 {event.location}
                  </p>
                  <p className="text-gray-700 text-sm mb-3">
                    {event.description}
                  </p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleEdit(event)}
                      className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageEvents;
