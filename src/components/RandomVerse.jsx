import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function RandomVerse() {
  const [verse, setVerse] = useState(null);
  const [hadith, setHadith] = useState(null);
  const [loading, setLoading] = useState(true);

  const hadiths = [
    {
      arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
      english: "Actions are judged by intentions.",
      source: "Sahih Bukhari, Hadith 1",
    },
    {
      arabic: "مَنْ دَلَّ عَلَى خَيْرٍ فَلَهُ مِثْلُ أَجْرِ فَاعِلِهِ",
      english:
        "Whoever guides someone to goodness will have a reward like one who did it.",
      source: "Sahih Muslim",
    },
    {
      arabic:
        "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
      english:
        "None of you will believe until you love for your brother what you love for yourself.",
      source: "Sahih Bukhari & Muslim",
    },
    {
      arabic: "الدُّنْيَا سِجْنُ الْمُؤْمِنِ وَجَنَّةُ الْكَافِرِ",
      english:
        "The world is a prison for the believer and a paradise for the disbeliever.",
      source: "Sahih Muslim",
    },
  ];

  const fetchVerse = async () => {
    setLoading(true);
    try {
      const randomVerseId = Math.floor(Math.random() * 6236) + 1;
      const response = await fetch(
        `https://api.alquran.cloud/v1/ayah/${randomVerseId}/en.asad`
      );
      const data = await response.json();
      setVerse(data.data);
    } catch (error) {
      toast.error("Failed to fetch Quran verse");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadNewRandomVerse = () => {
    fetchVerse();
    const randomHadith = hadiths[Math.floor(Math.random() * hadiths.length)];
    setHadith(randomHadith);
  };

  useEffect(() => {
    loadNewRandomVerse();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-700 mb-10">
          📚
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-1 mb-10">
              {/* Quran Section */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition">
                <h2 className="text-xl font-bold text-green-700 mb-2">
                  📖 Quran Verse❤️
                </h2>
                <p className="text-gray-800 text-lg mb-2 text-right leading-relaxed">
                  "{verse.text}"
                </p>
                <p className="text-sm text-gray-600 text-right mb-4">
                  — Surah {verse.surah.englishName} ({verse.surah.name}) • Ayah{" "}
                  {verse.numberInSurah}
                </p>

                {/* Audio Player */}
                {verse.audio && (
                  <div className="my-4">
                    <audio controls className="w-full">
                      <source src={verse.audio} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}

                {/* Tafsir */}
                <div className="mt-4 text-sm text-gray-800">
                  <h3 className="font-semibold text-gray-700 mb-1">
                    📝 Tafsir (Translation):
                  </h3>
                  <p>{verse.translation}</p>
                </div>
              </div>

              {/* Hadith Section */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition">
                <h2 className="text-xl font-bold text-yellow-700 mb-2">
                  📜 Hadith of the Day
                </h2>
                <p className="text-gray-800 mb-3 text-right">{hadith.arabic}</p>
                <p className="text-sm text-gray-700 mb-2">{hadith.english}</p>
                <p className="text-sm text-gray-500">{hadith.source}</p>
              </div>
            </div>

            {/* Show Another Button */}
            <div className="text-center">
              <button
                onClick={loadNewRandomVerse}
                className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                🔁 get another
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RandomVerse;
