import { useState } from "react";
import { toast } from "react-toastify";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

export default function ContactPage() {
  const { darkMode } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`max-w-[1440px] mx-auto py-12 px-6 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mt-20 mb-6">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <FaPhoneAlt className="text-red-500 text-2xl mr-3" />
              <h3 className="text-lg font-semibold">Call To Us</h3>
            </div>
            <p>We are available 24/7, 7 days a week.</p>
            <p className="font-semibold">Phone: +8801611122222</p>
            <hr className="my-4 border-gray-400" />
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-red-500 text-2xl mr-3" />
              <h3 className="text-lg font-semibold">Write To Us</h3>
            </div>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p className="font-semibold">Emails: customer@exclusive.com</p>
            <p className="font-semibold">Emails: support@exclusive.com</p>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Your Phone *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 h-32"
              ></textarea>
              <button
                type="submit"
                className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
