import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p className="mb-2 sm:mb-0">
          &copy; 2024 Countries Map. Matias Arroyo - All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a
            href="https://www.github.com/matiasarroyo1978/countries-map"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors duration-200"
            aria-label="GitHub Profile"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/matias-arroyo19"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors duration-200"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
