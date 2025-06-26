import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { FaUser } from "react-icons/fa"; // make sure path is correct
import DonationInfo from "../components/DonationInfo";

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Load Firestore user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const docSnap = await getDoc(ref);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    await signOut(getAuth());
    navigate("/signin");
  };

  if (!user) return <p className="text-center mt-20">You must be signed in.</p>;

  return (
    <>
      <div className="max-w-lg mx-auto mt-20 bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">
          Your Profile
        </h2>
        <img
          src={user.photoURL || <FaUser />}
          alt="Profile"
          className="w-24 h-24 mx-auto rounded-full border mb-4"
        />
        <p className="text-gray-800">
          <strong>Name:</strong> {userData?.name || "Not provided"}
        </p>
        <p className="text-gray-800">
          <strong>Phone:</strong> {userData?.phone || "N/A"}
        </p>
        <p className="text-gray-800">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-600 text-sm mt-2">
          <strong>UID:</strong> {user.uid}
        </p>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition"
        >
          Sign Out
        </button>
        <Link
          to="/edit-profile"
          className="mt-4 block text-white bg-blue-500 hover:bg-blue-700 transition-all duration-200 ease-in-out text-sm p-4 "
        >
          Edit Profile
        </Link>
      </div>
      <DonationInfo />
    </>
  );
};

export default Profile;
