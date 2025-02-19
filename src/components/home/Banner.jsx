import { motion } from "framer-motion";
import { useTypewriter } from "react-simple-typewriter";
import { Button } from "flowbite-react";
import useAuth from "../../hooks/useAuth";

export default function DynamicBanner() {
  const { darkMode } = useAuth();
  const [text] = useTypewriter({
    words: [
      "Innovative Solutions",
      "Exciting Technologies",
      "Game-changing Tools",
      "Creative Apps",
    ],
    loop: 0,
  });

  return (
    <div
      className={`hero min-h-[560px] bg-cover bg-no-repeat flex items-center justify-center relative transition-all duration-500 ${
        darkMode ? "bg-gray-900" : "bg-green-800"
      }`}
      style={{
        backgroundImage:
          "url(https://i.ibb.co.com/3YFgFmsZ/istockphoto-1370884809-612x612.jpg)",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-[1440px] mx-auto px-8 relative z-10">
        <div className="hero-content text-center md:text-start md:w-1/2">
          <div className="max-w-md mx-auto">
            <motion.h1
              className={`mb-5 font-extrabold bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent ${
                darkMode ? "text-4xl" : "text-5xl"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Explore {text}
            </motion.h1>
            <motion.p
              className={`mb-5 text-lg ${
                darkMode ? "text-gray-300" : "text-white"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Discover the latest in technology, apps, and tools to drive your
              success forward.
            </motion.p>
            <motion.div
              className="mt-5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="relative md:w-1/2 flex justify-center mt-8 md:mt-0"
          animate={{ y: [0, -25, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            className="w-3/4 md:w-2/3 lg:w-1/2 object-cover rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105"
            src="https://i.ibb.co/YprKnGC/images-9-removebg-preview.png"
            alt="Tech Product"
          />
        </motion.div>
      </div>
    </div>
  );
}
