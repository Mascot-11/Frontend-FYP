import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Color Mode Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">Color Mode</h3>
            <p className="text-sm text-gray-300 mb-4">Expressing creativity through fashion, music, and music.</p>
            <div className="flex space-x-4">
              <Link to="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
              </Link>
              <Link to="#" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
              </Link>
              <Link to="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Music
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Merch
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">Contact Information</h3>
            <address className="not-italic">
              <p className="text-sm text-gray-300 mb-2">123 Art Street, Creativity City, AC 12345</p>
              <p className="text-sm text-gray-300 mb-2">(555) 123-4567</p>
              <p className="text-sm text-gray-300">
                <a href="mailto:info@colormode.com" className="hover:text-white transition-colors">
                  info@colormode.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-zinc-800 mt-8 pt-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Color Mode. All rights reserved.
        </div>
      </div>
    </footer>
  );
}