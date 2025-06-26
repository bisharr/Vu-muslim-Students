import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import GoogleButton from "../components/GoogleButton";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { email, password } = form;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("Signed in successfully!");
      setForm({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      console.error("Sign-in error:", error);
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Sign In
        </h2>

        <form className="space-y-4" onSubmit={handleSignIn}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-3 text-right">
          <Link
            to="/forgot-password"
            className="text-blue-600 text-sm hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </div>

        <div className="my-4 text-center text-gray-500">or</div>

        <GoogleButton text="Continue with Google" />
      </div>
    </div>
  );
};

export default SignIn;
