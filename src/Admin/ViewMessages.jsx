// src/admin/ViewMessages.jsx
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

const ViewMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchMessages = async () => {
    try {
      const snapshot = await getDocs(collection(db, "messages"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(data);
    } catch (error) {
      toast.error("Failed to fetch messages", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    try {
      await deleteDoc(doc(db, "messages", id));
      toast.success("Message deleted");
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (error) {
      toast.error("Error deleting message", error);
    }
  };

  const toggleReadStatus = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, "messages", id), { read: !currentStatus });
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, read: !currentStatus } : msg
        )
      );
    } catch (error) {
      toast.error("Failed to update message status", error);
    }
  };

  const filteredMessages =
    filter === "all"
      ? messages
      : messages.filter((msg) => (filter === "read" ? msg.read : !msg.read));

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          📬 Community Messages ({filteredMessages.length})
        </h1>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {["all", "read", "unread"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded text-sm font-medium shadow-sm transition ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : filteredMessages.length === 0 ? (
          <p className="text-center text-gray-500">No messages found.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className={`relative bg-white rounded-lg shadow-md p-6 border-l-4 ${
                  msg.read ? "border-green-500" : "border-yellow-500"
                } transition-all`}
              >
                <h2 className="text-lg font-semibold text-blue-700 mb-1">
                  {msg.name}{" "}
                  <span className="text-sm text-gray-500">({msg.email})</span>
                </h2>
                <p className="text-gray-700 whitespace-pre-wrap mb-3">
                  {msg.message}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <button
                    onClick={() => toggleReadStatus(msg.id, msg.read)}
                    className={`px-3 py-1 rounded ${
                      msg.read ? "bg-yellow-500" : "bg-green-600 text-white"
                    }`}
                  >
                    Mark as {msg.read ? "Unread" : "Read"}
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMessages;
