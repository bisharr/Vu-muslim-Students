// src/pages/Contact.jsx
import { useState } from "react";
import { toast } from "react-toastify";
import DonationInfo from "../components/DonationInfo";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
    setSubmitted(true);
    toast.success("Message sent successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      theme: "colored",
    });
    // Reset the form
    setForm({ name: "", email: "", number: "", message: "" });

    // You can integrate Firebase or EmailJS here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-blue-100">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
          📬 Contact Us
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Have questions, suggestions, or want to get involved? We'd love to
          hear from you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded-md px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded-md px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              PhoneNumber
            </label>
            <input
              type="number"
              name="number"
              value={form.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="4"
              className="mt-1 block w-full border rounded-md px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      <DonationInfo />
    </div>
  );
}

export default Contact;
