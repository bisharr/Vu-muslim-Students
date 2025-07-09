import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { FaRegUserCircle } from "react-icons/fa";
import { db } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import DonationInfo from "../components/DonationInfo";
import Contact from "../pages/Contact";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  if (!user) return <p className="text-center mt-20">Please sign in first.</p>;
  if (loading) return <p className="text-center mt-20">Loading profile...</p>;

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10 text-center">
        <img
          src={
            profile?.photoURL ||
            "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff&rounded=true"
          }
          alt="."
          className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-blue-500 shadow"
        />
        <h2 className="text-2xl font-bold mt-4 text-blue-800">
          {profile?.name || "No Name"}
        </h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="mt-2 text-gray-700">
          📞 {profile?.phone || "No phone number"}
        </p>

        <Link
          to="/edit-profile"
          className="inline-block w-full mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition shadow"
        >
          Edit Profile
        </Link>
      </div>
      <Contact />
      <DonationInfo />
    </section>
  );
};

export default Profile;
