import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

export default function About() {
  const { darkMode } = useAuth();

  useEffect(() => {
    document.title = "About | Product Hunt";
  }, []);

  return (
    <div
      className={`min-h-screen px-6 md:px-16 lg:px-32 py-12 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto text-center mt-20">
        <h1 className="text-4xl font-bold mb-6">About Product Hunt</h1>
        <p className="text-lg leading-relaxed mb-6">
          Welcome to <span className="font-semibold">Product Hunt</span>, your
          go-to platform for discovering and sharing amazing products! Our
          mission is to connect innovators, makers, and tech enthusiasts by
          showcasing the latest and greatest products in the industry.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        {/* Our Mission */}
        <div className="p-6 rounded-2xl shadow-lg bg-gray-100 dark:bg-gray-800">
          <h2 className="text-2xl font-semibold mb-4">🚀 Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Our goal is to provide a platform where creators can showcase their
            innovations and users can discover the next big thing in technology.
            We believe in community-driven growth and innovation.
          </p>
        </div>

        {/* How It Works */}
        <div className="p-6 rounded-2xl shadow-lg bg-gray-100 dark:bg-gray-800">
          <h2 className="text-2xl font-semibold mb-4">🔍 How It Works</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Users can submit their products, vote for their favorites, and
            engage in discussions. The most popular products get featured,
            helping startups and developers gain visibility.
          </p>
        </div>
      </div>

      {/* Meet the Team */}
      <div className="text-center mt-12">
        <h2 className="text-3xl font-semibold mb-6">Meet Our Team</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Behind Product Hunt is a team of passionate developers and
          entrepreneurs dedicated to making product discovery fun and efficient.
        </p>
      </div>
    </div>
  );
}
