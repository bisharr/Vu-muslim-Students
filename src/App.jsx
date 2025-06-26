import "./index.css";

// App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrayerTimes from "./pages/PrayerTimes";
import PrivateRoute from "./components/PrivateRoute";
import Events from "./pages/Events";
import Recources from "./pages/Resources";
import Contact from "./pages/Contact";
import Header from "./components/Navbar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Protected Routes */}
        <Route
          path="/prayer-times"
          element={
            <PrivateRoute>
              <PrayerTimes />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <Events />
            </PrivateRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PrivateRoute>
              <ForgotPassword />
            </PrivateRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <PrivateRoute>
              <Recources />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
