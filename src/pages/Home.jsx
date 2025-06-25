// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  // Quotes
  const quotes = [
    {
      text: "Indeed, in the remembrance of Allah do hearts find rest.",
      source: "— Surah Ar-Ra’d (13:28)",
    },
    {
      text: "The best among you are those who have the best manners and character.",
      source: "— Prophet Muhammad ﷺ",
    },
    {
      text: "So remember Me; I will remember you.",
      source: "— Surah Al-Baqarah (2:152)",
    },
    {
      text: "Whoever puts their trust in Allah, then He will suffice them.",
      source: "— Surah At-Talaq (65:3)",
    },
  ];

  const [quote, setQuote] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );
  const [animate, setAnimate] = useState(false);
  const [ayah, setAyah] = useState(null);

  const getAnotherQuote = () => {
    setAnimate(false);
    let newQuote;
    do {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (newQuote.text === quote.text);
    setQuote(newQuote);
    setTimeout(() => setAnimate(true), 10);
  };

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
    setAnimate(true);
  }, []);

  const galleryImages = [
    "/student1.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Welcome */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
            Welcome to the Muslim Community of Victoria 🕌
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            A united place for students and community members to connect, pray,
            learn, and grow together in Victoria.
          </p>
        </div>
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

        {/* Quote of the Day */}
        <div className="bg-blue-100 border-l-4 border-blue-500 p-6 rounded-xl shadow mb-10">
          <h3 className="text-xl font-bold text-blue-800 mb-2">
            🧠 Quote of the Day
          </h3>
          <div className={animate ? "fade-in" : ""}>
            <p className="text-lg italic text-gray-800">"{quote.text}"</p>
            <p className="text-sm text-right text-gray-600 mt-2">
              {quote.source}
            </p>
          </div>
          <div className="text-center mt-4">
            <button
              onClick={getAnotherQuote}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              🔁 Get Another Quote
            </button>
          </div>
        </div>

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

        {/* Gallery */}
        <div>
          <h3 className="text-xl font-bold text-center text-blue-600 mb-4">
            📸 Community Moments
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4">
            {galleryImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Gallery ${i + 1}`}
                className="rounded-lg shadow-md h-64 w-full  "
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
