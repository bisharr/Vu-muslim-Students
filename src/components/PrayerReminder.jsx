import IslamicQuiz from "./IslamicQuiz";

const PrayerReminder = () => {
  return (
    <section className="max-w-4xl mx-auto mt-10 px-6">
      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 text-center border border-blue-100">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          🕌 Importance of Salah (Prayer)
        </h2>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          Salah (prayer) is the second pillar of Islam and the key to spiritual
          connection with Allah.
          <span className="block mt-2 font-medium">
            The Prophet ﷺ said:
            <br />
            <q>
              “The first thing a person will be questioned about on the Day of
              Judgment is Salah.”
            </q>
            <br />
            <span className="text-xs text-gray-500">(Tirmidhi)</span>
          </span>
        </p>

        <div className="mt-5">
          <p className="font-semibold text-blue-600">
            🕰️ Never delay your prayers. Every Salah has its time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrayerReminder;
