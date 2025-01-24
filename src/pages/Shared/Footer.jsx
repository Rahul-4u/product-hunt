import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 ">
      <div className="container  max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Section 1: Logo and About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Product Hunt</h2>
          <p className="text-sm">
            Discover and share the most innovative products. Our mission is to
            connect creators with users and bring innovative ideas to life.
          </p>
        </div>

        {/* Section 2: Contact Information */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
          <ul className="space-y-2 text-sm">
            <li>
              Email:{" "}
              <a
                href="mailto:support@producthunt.com"
                className="hover:text-white"
              >
                support@producthunt.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+880123456789" className="hover:text-white">
                +880123456789
              </a>
            </li>
            <li>Address: Dhaka Tower, Level 4, Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Section 3: Social Media Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Follow Us</h2>
          <ul className="flex space-x-4 text-lg">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <i className="fab fa-facebook"></i> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <i className="fab fa-twitter"></i> Twitter
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Product Hunt. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
