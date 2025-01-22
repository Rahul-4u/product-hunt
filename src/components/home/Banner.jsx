import { motion } from "framer-motion";
import { useTypewriter } from "react-simple-typewriter";
import { Button } from "flowbite-react";

export default function DynamicBanner() {
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
      className="hero min-h-[560px] bg-green-800 bg-cover bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: "url(https://i.ibb.co/f9KLqgX/images-7.jpg)", // Change to your image URL
      }}
    >
      {/* Adjusted opacity of the overlay */}
      <div className="hero-overlay bg-black bg-opacity-60"></div>{" "}
      {/* Reduced opacity to 20 */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-[1440px] mx-auto px-8">
        {/* Text Content */}
        <div className="hero-content text-neutral-content text-center md:text-start md:w-1/2">
          <div className="max-w-md mx-auto">
            <motion.h1
              className="mb-5 text-5xl font-extrabold bg-gradient-to-r from-red-600 via-o to-yellow-500 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Explore {text}
            </motion.h1>
            <motion.p
              className="mb-5 text-lg text-white"
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

        {/* Image Section */}
        <motion.div
          className="product-img relative md:w-1/2 flex justify-center mt-8 md:mt-0"
          animate={{
            y: [0, -25, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            className="w-3/4 md:w-2/3 bg-no-repeat lg:w-1/2 object-cover rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105"
            src="https://i.ibb.co/YprKnGC/images-9-removebg-preview.png"
            alt="Tech Product"
          />
          <div className="absolute -top-10 -right-10 hidden md:block w-24 h-24 rounded-full bg-primary opacity-30 blur-lg"></div>
        </motion.div>
      </div>
    </div>
  );
}
