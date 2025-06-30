import { useEffect, useState } from "react";

const Resources = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch("/data/resources.json")
      .then((res) => res.json())
      .then((data) => setResources(data));
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 text-center mb-10">
          📚 Islamic Resources Library
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((res, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-2xl overflow-hidden border hover:shadow-xl transition duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="h-48 w-full bg-gray-100 overflow-hidden">
                <img
                  src={res.image || "/data/resource-default.jpg"}
                  alt={res.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-blue-700 mb-2">
                  {res.title}
                </h2>
                <p className="text-gray-600 text-sm flex-grow">
                  {res.description}
                </p>
                <a
                  href={res.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-blue-600 text-white text-center text-sm font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  📥 Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
