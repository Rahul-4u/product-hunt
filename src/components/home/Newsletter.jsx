import React from "react";
import useAuth from "../../hooks/useAuth";

const NewsletterPage = () => {
  const { darkMode } = useAuth();

  return (
    <section
      className={`py-10 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-screen-md mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="mb-6">
          Stay updated with the latest news and exclusive offers.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className={`w-full px-4 py-2 rounded-md border ${
              darkMode
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
            }`}
          />
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterPage;
