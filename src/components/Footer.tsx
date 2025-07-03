import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="text-center md:text-left">
          <h2 className="font-dancing italic text-4xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 mb-4">
            Khawa Dawa
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            A delightful meal experience awaits you, where food is a
            celebration, a way of connecting, and an experience to be savored.
            Discover the rich culinary culture of Bangladesh.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h3 className="text-xl font-semibold text-white mb-2">Quick Links</h3>
          <p className="hover:text-yellow-500 transition-colors cursor-pointer text-gray-400">
            Privacy Policy
          </p>
          <p className="hover:text-yellow-500 transition-colors cursor-pointer text-gray-400">
            Terms of Service
          </p>
          <p className="hover:text-yellow-500 transition-colors cursor-pointer text-gray-400">
            Contact Us
          </p>
          <p className="hover:text-yellow-500 transition-colors cursor-pointer text-gray-400">
            Our Menu
          </p>
          <p className="hover:text-yellow-500 transition-colors cursor-pointer text-gray-400">
            About Us
          </p>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-6">
            <p
              className="text-gray-400 hover:text-yellow-500 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF size={24} />
            </p>
            <p
              className="text-gray-400 hover:text-yellow-500 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter size={24} />
            </p>
            <p
              className="text-gray-400 hover:text-yellow-500 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </p>
            <p
              className="text-gray-400 hover:text-yellow-500 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={24} />
            </p>
          </div>
        </div>
      </div>
      <p className="text-sm w-full text-center border-t border-gray-800 py-6 text-gray-500">
        &copy; {new Date().getFullYear()} Khawa Dawa. All rights reserved.
      </p>
    </footer>
  );
}
