import "./index.css";

// App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrayerTimes from "./pages/PrayerTimes";
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
        <Route path="/prayer-times" element={<PrayerTimes />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/events" element={<Events />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/resources" element={<Recources />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
