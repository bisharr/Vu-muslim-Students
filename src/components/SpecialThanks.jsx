import {
  FaInstagram,
  FaLinkedin,
  FaGlobe,
  FaTwitter,
  FaWhatsapp,
  FaGithub,
} from "react-icons/fa";

const specialPeople = [
  {
    name: "Imam Muhamood Abdulmalik",
    role: "Spiritual Guide",
    image: "/gallery/imam.jpg",
    message:
      "With sincere heart, insight, and dedication to Muslims at Victoria University..",
    links: {
      whatsapp: "https://wa.me/256702908672",
      instagram: "https://instagram.com/imam_ahmed",
    },
  },
  {
    name: "Kalungi Fahim",
    role: "Community Leader",
    image: "/gallery/chairman.jpg", // Place this image in public/data
    message: "A leader who built bridges and brought people together.",
    links: {
      instagram: "https://instagram.com/abdi_yusuf",
      whatsapp: "https://wa.me/256368546",
    },
  },
  {
    name: "Bishar Abdinur",
    role: "Lead Developer",
    image: "/gallery/developer.jpg",
    message: "The visionary behind this digital home for our Muslim community.",
    links: {
      instagram: "https://www.instagram.com/bishar_abdinur/",
      whatsapp: "https://wa.me/256703240815",
      github: "https://github.com/bisharr",
    },
  },
  {
    name: "BAINGANA MOHSIN",
    role: "Community Advisor",
    image: "/gallery/advisor.jpg",
    message:
      "We are truly grateful for your insightful guidance and continued support throughout our journey..",
    links: {
      twitter: "https://twitter.com/abdirahman_dev",
      instagram: "https://linkedin.com/in/abdirahman-dev",
    },
  },
];

const SpecialThanks = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-blue-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-4 animate-fade-in">
          🤝 Special Thanks
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
          To those whose support, faith, and hard work helped shape this
          beautiful journey.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {specialPeople.map((person, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-600 transform hover:scale-105 transition-all duration-300 animate-fade-in"
            >
              <img
                src={person.image}
                alt={person.name}
                className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-blue-100 mb-4"
              />
              <h3 className="text-xl font-bold text-blue-700">{person.name}</h3>
              <p className="text-sm text-gray-500 italic mb-2">{person.role}</p>
              <p className="text-gray-700 mb-4 text-sm">{person.message}</p>
              <div className="flex justify-center gap-4 text-blue-600 text-xl">
                {person.links.instagram && (
                  <a
                    href={person.links.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaInstagram />
                  </a>
                )}
                {person.links.whatsapp && (
                  <a
                    href={person.links.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaWhatsapp />
                  </a>
                )}
                {person.links.github && (
                  <a
                    href={person.links.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub />
                  </a>
                )}
                {person.links.linkedin && (
                  <a
                    href={person.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {person.links.website && (
                  <a
                    href={person.links.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGlobe />
                  </a>
                )}
                {person.links.twitter && (
                  <a
                    href={person.links.twitter}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTwitter />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialThanks;
