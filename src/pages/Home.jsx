// src/pages/Home.jsx
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import PrayerReminder from "../components/PrayerReminder";
import DonationInfo from "../components/DonationInfo";
import CommunityStats from "../components/CommunityStats";
import Gallery from "../components/Gallery";
import { useAuth } from "../context/AuthContext";
import RandomVerse from "../components/RandomVerse";
import StaticGallery from "../components/Gallery";

function Home() {
  const { user } = useAuth();

  // Quotes

  const [ayah, setAyah] = useState(null);

  const fetchAyah = async () => {
    try {
      // Generate dynamic ayah number based on day of year
      const today = new Date();
      const start = new Date(today.getFullYear(), 0, 0);
      const diff = today - start;
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay); // 1–365

      const ayahNumber = (dayOfYear % 6236) + 1; // Quran has 6236 ayahs

      const res = await fetch(
        `https://api.alquran.cloud/v1/ayah/${ayahNumber}/editions/ar.alafasy,en.asad`
      );
      const data = await res.json();

      if (!data?.data || !Array.isArray(data.data)) {
        throw new Error("Invalid response format");
      }

      const ar = data.data.find((d) => d.edition.identifier === "ar.alafasy");
      const en = data.data.find((d) => d.edition.identifier === "en.asad");

      if (!ar || !en || !ar.text || !en.text) {
        throw new Error("Missing ayah info");
      }

      setAyah({
        arabic: ar.text,
        translation: en.text,
        surah: ar.surah.englishName,
        surahArabic: ar.surah.name,
        number: ar.numberInSurah,
      });
    } catch (err) {
      console.error("Ayah fetch error:", err);
      toast.error("Failed to load Ayah of the Day.");
    }
  };

  useEffect(() => {
    fetchAyah();
  }, []);

  return (
    <div className=" min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Welcome */}

        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
            {user?.displayName
              ? `Welcome ${user.displayName} to the Muslim Community of Victoria 🕌`
              : "Welcome to the Muslim Community of Victoria 🕌"}
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            A united place for students and community members to connect, pray,
            learn, and grow together in Victoria.
          </p>
        </div>

        {/* counts */}
        <CommunityStats />
        {/* Purpose/About */}
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">
            🌟 Our Purpose
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            We aim to support the spiritual, social, and academic needs of
            Muslim students and residents through inclusive activities, prayers,
            events, and learning opportunities.
          </p>
        </div>
        {/* Player reminder */}
        <PrayerReminder />

        {/* Ayah of the Day */}
        {ayah && (
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-xl shadow mb-10">
            <h3 className="text-xl font-bold text-green-700 mb-2">
              📖 Ayah of the Day
            </h3>
            <p className="text-lg text-right text-gray-800 leading-relaxed mb-2">
              "{ayah.arabic}"
            </p>
            <p className="text-sm text-right text-gray-600">
              — Surah {ayah.surah} ({ayah.surahArabic}) • Ayah {ayah.number}
            </p>
            <p className="mt-2 text-sm text-gray-700">
              Translation: {ayah.translation}
            </p>
          </div>
        )}
        {/* Random verses */}
        <RandomVerse />

        {/* Gallery */}
        <StaticGallery />
      </div>
      {/* Donate */}
      <DonationInfo />
    </div>
  );
}

export default Home;
