import Link from "next/link";
import { FaTwitter, FaInstagram, FaLinkedin, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-32 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 w-full h-[400px] bg-gradient-to-t from-orange-950/30 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              EGNITE 2024
            </h3>
            <p className="text-white/60 max-w-sm">
              Ignite your entrepreneurial journey at the intersection of
              innovation and opportunity.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-orange-400 hover:text-orange-300 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-orange-400 hover:text-orange-300 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-orange-400 hover:text-orange-300 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-orange-400 hover:text-orange-300 transition-colors"
                aria-label="Discord"
              >
                <FaDiscord className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#schedule"
                  className="text-white/60 hover:text-orange-400 transition-colors"
                >
                  Event Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="#sponsors"
                  className="text-white/60 hover:text-orange-400 transition-colors"
                >
                  Our Partners
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-white/60 hover:text-orange-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#register"
                  className="text-white/60 hover:text-orange-400 transition-colors"
                >
                  Register Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-2 text-white/60">
              <li>
                <a
                  href="mailto:contact@egnite2024.com"
                  className="hover:text-orange-400 transition-colors"
                >
                  contact@egnite2024.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="hover:text-orange-400 transition-colors"
                >
                  +123 456 7890
                </a>
              </li>
              <li className="max-w-xs">
                123 Innovation Street,
                <br />
                Startup District, ST 12345
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/40 text-sm">
              © 2024 EGNITE. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-white/40 hover:text-orange-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-white/40 hover:text-orange-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
