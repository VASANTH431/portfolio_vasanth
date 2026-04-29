import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const socials = [
  { icon: <FaGithub />, href: 'https://github.com/VASANTH431', label: 'GitHub' },
  { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/vasanth-c-2ba52a2a5/', label: 'LinkedIn' },
  { icon: <FaEnvelope />, href: 'mailto:vasanthc1177@gmail.com', label: 'Email' },
];

export default function Footer() {
  const scrollToHome = () => {
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#f3e8db] border-t border-[#dfcfbd] py-12 text-center">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center gap-6">
        
        {/* Brand */}
        <span 
          onClick={scrollToHome}
          className="text-2xl font-bold text-[#c96f3a] tracking-tight cursor-pointer hover:text-[#a7542a] transition-colors" 
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Vasanth<span className="text-[#2c2118]">.</span>
        </span>

        {/* Socials */}
        <div className="flex gap-4">
          {socials.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="w-10 h-10 bg-[#fffaf2] border border-[#dfcfbd] rounded-full flex items-center justify-center text-[#6d5a4c] hover:text-white hover:bg-[#c96f3a] hover:border-[#c96f3a] transition-all duration-300 shadow-sm hover:-translate-y-1"
            >
              {icon}
            </a>
          ))}
        </div>

        <p className="text-[#8c7665] text-sm font-medium mt-2">
          &#169; {new Date().getFullYear()} Vasanth. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
