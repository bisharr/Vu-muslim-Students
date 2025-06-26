import { useEffect, useState } from "react";
import PrayerReminder from "../components/PrayerReminder";

function PrayerTimes() {
  const [prayers, setPrayers] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=Victoria&country=Uganda&method=2`
        );
        const data = await response.json();
        setPrayers(data.data.timings);
        setDate(data.data.date.readable);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10 border border-blue-200">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-700 mb-2">
          🕌 Prayer Times
        </h1>
        <p className="text-center text-sm text-gray-500 mb-8">
          Victoria University, Kampala •{" "}
          <span className="font-medium">{date}</span>
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
            {Object.entries(prayers).map(([name, time]) => (
              <div
                key={name}
                className="bg-blue-50 rounded-xl p-4 shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-blue-600">{name}</h3>
                <p className="text-xl font-bold text-gray-800">{time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <PrayerReminder />
    </div>
  );
}

export default PrayerTimes;
