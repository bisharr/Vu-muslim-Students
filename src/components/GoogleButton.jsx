import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = ({ text = "Continue with Google" }) => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        // Add new user to Firestore
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
          fromGoogle: true,
        });
      }

      toast.success("Signed in with Google!");
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google sign-in failed.");
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full border border-gray-300 py-2 rounded flex items-center justify-center space-x-2 hover:bg-gray-100 transition"
    >
      <FcGoogle className="h-4 w-4" />
      <span className="text-sm text-gray-700 font-medium">{text}</span>
    </button>
  );
};

export default GoogleButton;
