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

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prayer-times" element={<PrayerTimes />} />
        <Route path="/events" element={<Events />} />
        <Route path="/resources" element={<Recources />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
