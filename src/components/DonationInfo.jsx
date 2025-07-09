const DonationInfo = () => {
  return (
    <section className="max-w-4xl mx-auto mt-14 px-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl shadow-md p-6 sm:p-8 text-center">
        <h2 className="text-2xl font-bold text-yellow-800 mb-4">
          🤲 Support Your Community – Donate Today
        </h2>

        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
          Giving charity, no matter how small, brings barakah into your life and
          helps sustain our growing Muslim Students in Victoria.
          <br />
          <span className="block mt-3 font-medium">
            💬 <q>The Prophet ﷺ said: “Charity does not decrease wealth.”</q>
            <br />
            <span className="text-xs text-gray-500">(Muslim)</span>
          </span>
        </p>

        <div className="mt-5">
          <p className="font-semibold text-yellow-700 text-base">
            💸 Donate via Mobile Money:
          </p>
          <p className="text-lg font-bold mt-1 text-gray-800 tracking-wide">
            📞 +256 704770760
          </p>
          <p className="text-sm text-gray-600 mt-1 italic">
            Muhamood Abdulmalik
          </p>
          <p className="text-sm text-gray-600 mt-1 italic">
            (Call or send via MTN/Airtel)
          </p>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Qur’an 2:261</span> —{" "}
            <q>
              The example of those who spend their wealth in the way of Allah is
              like a seed that grows seven spikes; in each spike is a hundred
              grains.
            </q>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DonationInfo;
