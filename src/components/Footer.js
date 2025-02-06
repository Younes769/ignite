import Link from "next/link";
import { FaInstagram, FaLinkedin, FaDiscord } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import Logo from "./Logo";

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
          {/* Brand section with Logo */}
          <div className="space-y-4">
            <Logo size="large" withText={true} animated={false} />
            <p className="text-white/60 max-w-sm">
              Ignite your entrepreneurial journey at the intersection of
              innovation and opportunity.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.tiktok.com/@nit_computer_society"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/ncs._club/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/numidia-computer-society/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://discord.com/invite/DGDBBa6n8d"
                target="_blank"
                rel="noopener noreferrer"
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
                  href="mailto:numidiacomputersociety@gmail.com"
                  className="hover:text-orange-400 transition-colors"
                >
                  numidiacomputersociety@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/40 text-sm">
              © 2025 All rights reserved to NCS club.
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
