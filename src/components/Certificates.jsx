import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaAward, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import ciscoJsEssentials from '../assets/images/cisco_js_essentials.jpg';
import ciscoCcnaEnsa from '../assets/images/cisco_ccna_ensa.jpg';
import ciscoCybersecurity from '../assets/images/cisco_cybersecurity.jpg';
import ciscoDataAnalytics from '../assets/images/cisco_data_analytics.jpg';
import ciscoCcnaSrwe from '../assets/images/cisco_ccna_srwe.jpg';
import ciscoCcnaItn from '../assets/images/cisco_ccna_itn.jpg';
import ciscoPythonEssentials from '../assets/images/cisco_python_essentials.jpg';


function toPoints(text) {
  return text
    .split('. ')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => (item.endsWith('.') ? item : `${item}.`));
}

const certificates = [
  {
    title: 'JavaScript Essentials 1',
    issuer: 'Cisco Networking Academy',
    image: ciscoJsEssentials,
    summary: 'Mastered the fundamentals of JavaScript programming, including syntax, data structures, and core programming concepts.',
    details: 'Completed the JavaScript Essentials 1 course through Cisco Networking Academy. This course provided a strong foundation in JavaScript, covering fundamental concepts such as operators, variables, data types, control structures, and loops. Gained practical experience in writing algorithms, debugging, and understanding the core mechanics of the JavaScript language, which is essential for web development.',
    platform: 'Cisco Networking Academy',
  },
  {
    title: 'CCNAv7: Enterprise Networking, Security, and Automation',
    issuer: 'Cisco Networking Academy',
    image: ciscoCcnaEnsa,
    summary: 'Learned advanced enterprise networking concepts including OSPF architecture, network security, and network automation principles.',
    details: 'Successfully completed the CCNAv7: Enterprise Networking, Security, and Automation course. The curriculum focused on deploying and configuring scalable networks using OSPF, implementing network security measures, and exploring modern network automation. Gained practical skills in configuring enterprise routers and switches, understanding wide area network (WAN) technologies, and applying security concepts to mitigate threats.',
    platform: 'Cisco Networking Academy',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    image: ciscoCybersecurity,
    summary: 'Explored the fundamentals of cybersecurity, including protecting personal data, network security principles, and identifying cyber threats.',
    details: 'Completed the Introduction to Cybersecurity program offered by Cisco Networking Academy. This course introduced the global landscape of cybersecurity, covering the latest security trends, threat detection, and mitigation strategies. Learned about the importance of protecting organizational and personal data, principles of cryptography, and best practices for securing networks and devices against malicious attacks.',
    platform: 'Cisco Networking Academy',
  },
  {
    title: 'Data Analytics Essentials',
    issuer: 'Cisco Networking Academy',
    image: ciscoDataAnalytics,
    summary: 'Gained foundational knowledge in data analysis, data visualization, and using tools to derive actionable insights from datasets.',
    details: 'Successfully completed the Data Analytics Essentials course. This program covered the entire data analysis process, from data collection and cleaning to visualization and interpretation. Learned how to utilize data analysis tools and techniques to identify patterns, solve problems, and make informed, data-driven decisions that are increasingly vital in today\'s technology landscape.',
    platform: 'Cisco Networking Academy',
  },
  {
    title: 'CCNAv7: Switching, Routing, and Wireless Essentials',
    issuer: 'Cisco Networking Academy',
    image: ciscoCcnaSrwe,
    summary: 'Acquired skills in configuring and troubleshooting routers and switches, and implementing VLANs and wireless networks.',
    details: 'Completed the CCNAv7: Switching, Routing, and Wireless Essentials course. This course provided hands-on experience in configuring and maintaining foundational network infrastructure. Key topics included VLAN configuration, Inter-VLAN routing, Spanning Tree Protocol (STP), and foundational wireless networking. Developed the ability to build and troubleshoot local area networks (LANs) to ensure efficient and secure communication.',
    platform: 'Cisco Networking Academy',
  },
  {
    title: 'CCNAv7: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    image: ciscoCcnaItn,
    summary: 'Learned the architecture, structure, functions, components, and models of the Internet and other computer networks.',
    details: 'Completed the CCNAv7: Introduction to Networks course through Cisco Networking Academy. This course introduced the architecture, structure, functions, components, and models of the Internet and computer networks. Achieved a solid understanding of how networks operate and how to build simple local area networks (LANs), perform basic configurations for routers and switches, and implement Internet Protocol (IP).',
    platform: 'Cisco Networking Academy',
  },
  {
    title: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy & Python Institute',
    image: ciscoPythonEssentials,
    summary: 'Mastered the fundamentals of Python programming, including data types, variables, loops, and core algorithmic thinking.',
    details: 'Successfully completed the Python Essentials 1 course. This course provided a comprehensive introduction to Python programming, covering basic data types, variables, operators, and control flow statements. Developed foundational skills in writing clean, efficient Python code and understanding the core principles of computer programming, which are critical for software development and data science.',
    platform: 'Cisco Networking Academy',
  },
];

export default function Certificates() {
  const [activeCertificate, setActiveCertificate] = useState(null);
  const scrollContainerRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(1);

  const extendedCertificates = Array(40).fill(certificates).flat();

  const updateCenterIndex = () => {
    if (!scrollContainerRef.current || scrollContainerRef.current.children.length === 0) return;
    const container = scrollContainerRef.current;
    const itemOffsetWidth = container.children[0].offsetWidth;
    const itemWidth = itemOffsetWidth + 24; // 24px is gap-6
    const scrollCenter = container.scrollLeft + container.clientWidth / 2;
    setCenterIndex(Math.round((scrollCenter - itemOffsetWidth / 2) / itemWidth));
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current && scrollContainerRef.current.children.length > 0) {
      const container = scrollContainerRef.current;
      const itemWidth = container.children[0].offsetWidth + 24;
      container.scrollBy({ left: direction === 'left' ? -itemWidth : itemWidth, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!activeCertificate) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveCertificate(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCertificate]);

  useEffect(() => {
    if (scrollContainerRef.current && scrollContainerRef.current.children.length > 0) {
      const container = scrollContainerRef.current;
      const itemOffsetWidth = container.children[0].offsetWidth;
      const itemWidth = itemOffsetWidth + 24;
      
      const middleIndex = 20 * certificates.length; 
      container.scrollLeft = middleIndex * itemWidth + itemOffsetWidth / 2 - container.clientWidth / 2;
      updateCenterIndex();
    }

    const timeout = setTimeout(() => updateCenterIndex(), 100);
    window.addEventListener('resize', updateCenterIndex);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updateCenterIndex);
    };
  }, []);

  return (
    <section id="certificates" className="py-20 bg-[#fffaf2] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-[#2c2118] mb-3"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Certificates
          </h2>
          <div className="w-14 h-1 bg-[#c96f3a] mx-auto rounded-full" />
          <p className="text-[#7b6757] mt-4 text-sm">
            Selected certifications and learning milestones
          </p>
        </motion.div>

        <div className="relative group/slider">
          <button
            onClick={() => scroll('left')}
            className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#fffaf2]/90 border border-[#dfcfbd] text-[#c96f3a] opacity-100 md:opacity-0 shadow-[0_8px_20px_rgba(117,77,53,0.15)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#f2dfcf] group-hover/slider:opacity-100"
            aria-label="Scroll left"
          >
            <FaChevronLeft size={18} />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#fffaf2]/90 border border-[#dfcfbd] text-[#c96f3a] opacity-100 md:opacity-0 shadow-[0_8px_20px_rgba(117,77,53,0.15)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#f2dfcf] group-hover/slider:opacity-100"
            aria-label="Scroll right"
          >
            <FaChevronRight size={18} />
          </button>

          <div className="-mx-4 px-4 overflow-hidden">
            <style>{`
              .hide-scroll::-webkit-scrollbar { display: none; }
            `}</style>
            <div
              ref={scrollContainerRef}
              onScroll={updateCenterIndex}
              className="hide-scroll flex items-center w-full gap-6 overflow-x-auto snap-x snap-mandatory px-0 py-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {extendedCertificates.map((certificate, index) => (
                <motion.button
                  key={`${certificate.title}-${index}`}
                  type="button"
                  onClick={() => setActiveCertificate(certificate)}
                  animate={{
                    scale: index === centerIndex ? 1.05 : 0.95,
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="flex h-[480px] w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] shrink-0 snap-center flex-col text-left bg-[#f8eee5] border border-[#dfcfbd] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(44,33,24,0.06)] hover:shadow-[0_16px_40px_rgba(117,77,53,0.14)]"
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative h-56 shrink-0 overflow-hidden bg-[#ead9c8]">
                    <motion.div
                      className="flex h-full w-full items-start justify-center overflow-hidden"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.img
                        src={certificate.image}
                        alt={certificate.title}
                        className="h-full w-full object-contain object-top"
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-full bg-[#f2dfcf] flex items-center justify-center">
                        <FaAward className="text-[#c96f3a]" />
                      </div>
                      <div>
                        <h3
                          className="text-base font-semibold text-[#2c2118]"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {certificate.title}
                        </h3>
                        <p className="text-sm text-[#7b6757]">{certificate.issuer}</p>
                      </div>
                    </div>

                    <p className="line-clamp-5 min-h-[110px] text-sm text-[#6d5a4c] leading-relaxed mb-4">
                      {certificate.summary}
                    </p>
                    <span className="mt-auto inline-flex items-center text-sm font-semibold text-[#c96f3a]">
                      View details
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {activeCertificate && (
          <motion.div
            className="fixed inset-0 z-[70] bg-[#2c2118]/65 px-4 py-8 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCertificate(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl max-h-[88vh] bg-[#fffaf2] rounded-[32px] overflow-hidden shadow-[0_24px_80px_rgba(44,33,24,0.28)]"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveCertificate(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 text-[#2c2118] hover:bg-[#f5e8da] transition-colors flex items-center justify-center"
                aria-label="Close certificate details"
              >
                <FaTimes />
              </button>

              <div className="grid h-[82vh] md:grid-cols-[1.05fr_0.95fr]">
                <div className="bg-[linear-gradient(180deg,#f8eee5_0%,#f2dfcf_100%)] p-4 md:p-6 h-full">
                  <div className="flex h-full w-full items-center justify-center rounded-[24px] bg-[#fffaf2] border border-[#ead9c8] p-3 md:p-4 overflow-hidden">
                    <img
                      src={activeCertificate.image}
                      alt={activeCertificate.title}
                      className="max-h-full max-w-full object-contain object-center"
                    />
                  </div>
                </div>

                <div className="h-full overflow-y-auto p-6 md:p-8">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#c96f3a] bg-[#f2dfcf] rounded-full px-4 py-2 w-fit mb-4">
                    <FaAward />
                    Certified Achievement
                  </div>

                  <h3
                    className="text-2xl md:text-[1.8rem] font-bold text-[#2c2118] mb-3"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {activeCertificate.title}
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    <div className="rounded-2xl border border-[#e4d3c1] bg-[#fff8f1] px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#9a8575] mb-1">Issued By</p>
                      <p className="text-sm font-semibold text-[#2c2118]">{activeCertificate.issuer}</p>
                    </div>
                    {activeCertificate.platform && (
                      <div className="rounded-2xl border border-[#e4d3c1] bg-[#fff8f1] px-4 py-3">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#9a8575] mb-1">Platform</p>
                        <p className="text-sm font-semibold text-[#2c2118]">{activeCertificate.platform}</p>
                      </div>
                    )}
                  </div>

                  <div className="rounded-[24px] border border-[#e4d3c1] bg-[#fffdf8] p-5 md:p-6">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#c96f3a] mb-3">
                      Portfolio Description
                    </p>
                    <ul className="space-y-3 text-[#6d5a4c] leading-relaxed">
                      {toPoints(
                        activeCertificate.details ||
                          `${activeCertificate.summary} This certificate adds to a portfolio focused on continuous learning, practical execution, and steady growth across design and development skills.`
                      ).map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c96f3a]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
