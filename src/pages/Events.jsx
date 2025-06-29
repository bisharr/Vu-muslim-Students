import DonationInfo from "../components/DonationInfo";
import StaticGallery from "../components/Gallery";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const EVENTS_PER_PAGE = 6;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, "events"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const eventsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsList);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const paginatedEvents = events.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-700 mb-8">
          🗓️ Upcoming Events
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading events...</p>
        ) : paginatedEvents.length === 0 ? (
          <p className="text-center text-gray-500">No events found.</p>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition border"
                >
                  {event.imageUrl && (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-5">
                    <h2 className="text-xl font-bold text-blue-700 mb-1">
                      {event.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2">
                      📅 {event.date} • 🕒 {event.time} • 📍 {event.location}
                    </p>
                    <p className="text-gray-700 text-sm">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-8 flex justify-center items-center gap-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-gray-700 font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < totalPages ? prev + 1 : prev
                  )
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      <StaticGallery />

      {/* Donate */}
      <DonationInfo />
    </div>
  );
}

export default Events;
