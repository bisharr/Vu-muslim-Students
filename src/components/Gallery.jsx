import React from "react";

function Gallery() {
  const galleryImages = [
    "/student1.jpg",
    "/student2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
  ];
  return (
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
  );
}

export default Gallery;
