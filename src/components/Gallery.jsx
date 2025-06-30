import { useState } from "react";

const staticPhotos = [
  {
    id: 1,
    imageUrl: "gallery/student1.jpg",
    caption: "Eid al-Fitr Celebration",
  },
  {
    id: 2,
    imageUrl: "gallery/student3.jpeg",
    caption: "",
  },
  {
    id: 3,
    imageUrl: "gallery/student2.jpg",
    caption: "Friday Khutbah",
  },
  {
    id: 4,
    imageUrl: "gallery/student5.jpg",
    caption: "",
  },
  {
    id: 5,
    imageUrl: "gallery/student6.jpg",
    caption: "",
  },
  {
    id: 6,
    imageUrl: "gallery/student7.jpg",
    caption: "friday khutbah",
  },
  {
    id: 6,
    imageUrl: "gallery/student4.jpg",
    caption: "friday khutbah",
  },

  // Add more photos here
];

const ITEMS_PER_PAGE = 6;

const StaticGallery = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(staticPhotos.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const paginatedPhotos = staticPhotos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 text-center mb-8">
          📸 Our Community in Photos
        </h1>

        {paginatedPhotos.length === 0 ? (
          <p className="text-center text-gray-500">No photos available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.caption || "Community Photo"}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-image.jpg";
                  }}
                />
                {photo.caption && (
                  <div className="p-4 text-sm text-gray-700 text-center">
                    {photo.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaticGallery;
