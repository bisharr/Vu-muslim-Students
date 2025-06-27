import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { FaTrash, FaUserEdit, FaUserShield } from "react-icons/fa";
import { toast } from "react-toastify";
import Papa from "papaparse";

const PAGE_SIZE = 5;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "" });
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const fetchUsers = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "users"));
    const userList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(userList);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", id));
    toast.success("User deleted");
    fetchUsers();
  };

  const handleDeleteAll = async () => {
    for (let user of users) {
      await deleteDoc(doc(db, "users", user.id));
    }
    toast.success("All users deleted");
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = async () => {
    if (!editingUser.name || !editingUser.email) return;
    await updateDoc(doc(db, "users", editingUser.id), editingUser);
    toast.success("User updated");
    setEditingUser(null);
    fetchUsers();
  };

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email) return;
    await addDoc(collection(db, "users"), newUser);
    toast.success("User added");
    setNewUser({ name: "", email: "", phone: "" });
    fetchUsers();
  };

  const toggleAdmin = async (user) => {
    const updatedRole = user.role === "admin" ? "user" : "admin";
    await updateDoc(doc(db, "users", user.id), { role: updatedRole });
    toast.info(`User role updated to ${updatedRole}`);
    fetchUsers();
  };

  const exportCSV = () => {
    const csv = Papa.unparse(users);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "users.csv";
    link.click();
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">User Management</h2>

      {/* Add User */}
      <div className="mb-6 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border px-3 py-2 rounded w-full sm:w-1/4"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border px-3 py-2 rounded w-full sm:w-1/4"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          className="border px-3 py-2 rounded w-full sm:w-1/4"
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
        <button
          onClick={exportCSV}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export CSV
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 border px-3 py-2 rounded"
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Role</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className={
                    user.role === "admin"
                      ? "bg-yellow-50"
                      : "bg-white hover:bg-gray-100"
                  }
                >
                  <td className="p-2">
                    {editingUser?.id === user.id ? (
                      <input
                        type="text"
                        value={editingUser.name}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            name: e.target.value,
                          })
                        }
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="p-2">
                    {editingUser?.id === user.id ? (
                      <input
                        type="email"
                        value={editingUser.email}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            email: e.target.value,
                          })
                        }
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="p-2">
                    {editingUser?.id === user.id ? (
                      <input
                        type="tel"
                        value={editingUser.phone}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            phone: e.target.value,
                          })
                        }
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      user.phone || "—"
                    )}
                  </td>
                  <td className="p-2 capitalize">{user.role || "user"}</td>
                  <td className="p-2 flex gap-2">
                    {editingUser?.id === user.id ? (
                      <button
                        onClick={handleUpdate}
                        className="text-sm px-2 py-1 bg-blue-600 text-white rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaUserEdit />
                      </button>
                    )}
                    <button
                      onClick={() => toggleAdmin(user)}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      <FaUserShield />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">
              Page {currentPage} of{" "}
              {Math.ceil(filteredUsers.length / PAGE_SIZE)}
            </span>
            <div className="space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <button
                disabled={
                  currentPage === Math.ceil(filteredUsers.length / PAGE_SIZE)
                }
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete All */}
      <div className="text-right mt-4">
        <button
          onClick={handleDeleteAll}
          className="text-sm text-red-700 underline hover:text-red-900"
        >
          Delete All Users
        </button>
      </div>
    </div>
  );
};

export default UserList;
