// src/pages/admin/UserList.jsx
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", role: "user" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleDeleteAll = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const deletes = snapshot.docs.map((docRef) =>
        deleteDoc(doc(db, "users", docRef.id))
      );
      await Promise.all(deletes);
      setUsers([]);
      toast.success("All users deleted");
    } catch (error) {
      toast.error("Failed to delete all");
    }
  };

  const startEdit = (user) => {
    setEditingUser(user.id);
    setForm({
      name: user.name || "",
      phone: user.phone || "",
      role: user.role || "user",
    });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setForm({ name: "", phone: "", role: "user" });
  };

  const handleUpdate = async () => {
    try {
      const userRef = doc(db, "users", editingUser);
      await updateDoc(userRef, form);
      toast.success("User updated");
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Users</h2>
        <button
          onClick={handleDeleteAll}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="border p-2">
                    {editingUser === user.id ? (
                      <input
                        type="text"
                        className="w-full border rounded px-2"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    ) : (
                      user.name || "—"
                    )}
                  </td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">
                    {editingUser === user.id ? (
                      <input
                        type="text"
                        className="w-full border rounded px-2"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                      />
                    ) : (
                      user.phone || "—"
                    )}
                  </td>
                  <td className="border p-2">
                    {editingUser === user.id ? (
                      <select
                        className="border rounded px-2"
                        value={form.role}
                        onChange={(e) =>
                          setForm({ ...form, role: e.target.value })
                        }
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      user.role || "user"
                    )}
                  </td>
                  <td className="border p-2 space-x-2">
                    {editingUser === user.id ? (
                      <>
                        <button
                          onClick={handleUpdate}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(user)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
