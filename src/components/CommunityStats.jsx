import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { useAuth } from "../context/AuthContext"; // ✅ Add this line

const CommunityStats = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // ✅ get the user

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        setCount(snapshot.size);
      } catch (error) {
        console.error("Error fetching user count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div
      className="bg-cover bg-center py-16 px-4 sm:px-8"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-xl max-w-3xl mx-auto p-6 sm:p-10 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/logo-new.png"
            alt="MCV Logo"
            className="h-13 w-20 object-contain"
          />
        </div>

        {/* Heading */}
        {/* <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4">
          (VUMSA)
        </h2> */}

        {/* Animated Count */}
        <p className="text-lg sm:text-xl text-gray-700">
          Together, we are{" "}
          <span className="font-extrabold text-blue-900 text-3xl sm:text-4xl">
            {loading ? "..." : <CountUp end={count} duration={2} />}
          </span>{" "}
          and counting, strong — united by faith, purpose, students, and
          community.
        </p>

        {/* Show call to action only if not signed in */}
        {!user && (
          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            To be counted and strengthen our community, please{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium underline hover:text-blue-800"
            >
              sign up
            </Link>
            .
          </p>
        )}

        {/* Islamic Quote */}
        <div className="mt-6 italic text-gray-700 text-sm sm:text-base">
          <p>
            “The believers are but brothers, so make settlement between your
            brothers.” — <span className="font-medium">Qur’an 49:10</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityStats;
