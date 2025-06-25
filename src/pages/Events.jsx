// src/pages/Events.jsx
function Events() {
  const events = [
    {
      id: 1,
      title: "Eid al-Adha Prayer & BBQ",
      date: "June 28, 2025",
      time: "8:00 AM",
      location: "Beacon Hill Park, Victoria",
      description:
        "Join us for Eid prayer followed by a community BBQ. Bring your family and friends!",
    },
    {
      id: 2,
      title: "Weekly Jummah Khutbah",
      date: "Every Friday",
      time: "1:30 PM",
      location: "Masjid Al-Iman, Victoria",
      description:
        "Join us for our regular Friday khutbah and congregational prayer.",
    },
    {
      id: 3,
      title: "Ramadan Iftar Program",
      date: "Every weekend during Ramadan",
      time: "Sunset",
      location: "Community Hall",
      description:
        "Break your fast with the community. Meals provided. All are welcome.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-700 mb-8">
          🗓️ Upcoming Events
        </h1>

        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-bold text-blue-700 mb-1">
                {event.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                📅 {event.date} • 🕒 {event.time} • 📍 {event.location}
              </p>
              <p className="text-gray-700">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
