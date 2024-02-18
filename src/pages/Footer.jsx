import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-600 text-gray-300 py-4">
      <div className="container mx-auto text-center">
        <nav className="mb-4">
          <ul className="flex justify-center">
            <li className="mr-6">
              <a href="#" className="hover:text-gray-400">
                Home
              </a>
            </li>
            <li className="mr-6">
              <a href="#" className="hover:text-gray-400">
                About Us
              </a>
            </li>
          </ul>
        </nav>
        <p>&copy; 2024 Lh. All rights reserved.</p>
        <p className="mt-2"></p>
        <p className="mt-2">1234 Example Street, New York, NY 10001</p>
      </div>
    </footer>
  );
};

export default Footer;
