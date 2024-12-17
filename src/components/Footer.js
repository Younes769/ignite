import Image from "next/image";

const socialLinks = ["Twitter", "Discord", "GitHub", "Contact"];

const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 rounded-lg blur group-hover:blur-xl transition-all duration-300"></div>
              <Image
                src="/logo.png"
                alt="DevIM Logo"
                width={32}
                height={32}
                className="relative"
              />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-emerald-400 to-emerald-200 inline-block text-transparent bg-clip-text">
              DevImpact
            </span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-white/40">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href="#" 
                className="relative group"
              >
                <span className="relative z-10 hover:text-emerald-400 transition-colors">{link}</span>
                <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/70 to-emerald-500/0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
            ))}
          </div>
          
          <div className="text-sm text-white/40">
            © 2024 NCS Club. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 