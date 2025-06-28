import { useEffect, useState } from "react";

const Resources = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch("/data/resources.json")
      .then((res) => res.json())
      .then((data) => setResources(data));
  }, []);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
          📚 Islamic Resources
        </h1>
        <div className="grid gap-6 sm:grid-cols-2">
          {resources.map((res, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-600"
            >
              <h2 className="text-xl font-semibold text-blue-700">
                {res.title}
              </h2>
              <p className="text-gray-700 mb-3">{res.description}</p>
              <a
                href={res.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                📥 Download PDF
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
