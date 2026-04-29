import { motion } from 'framer-motion';
import { FaDownload, FaEye } from 'react-icons/fa';
import resumeFile from '../assets/files/Vasanth_C_Resume.pdf';

export default function Resume() {
  return (
    <section id="resume" className="py-20 bg-[#f6efe4]">
      <div className="max-w-[1200px] mx-auto px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2c2118] mb-3"
            style={{ fontFamily: 'Poppins, sans-serif' }}>
            Resume
          </h2>
          <div className="w-14 h-1 bg-[#c96f3a] mx-auto rounded-full mb-12" />

          <div className="max-w-lg mx-auto bg-[#fffaf2] border border-[#dfcfbd] rounded-2xl p-10"
            style={{ boxShadow: '0 8px 20px rgba(44,33,24,0.06)' }}>
            <div className="w-16 h-16 bg-[#f2dfcf] rounded-full flex items-center justify-center mx-auto mb-6">
              <FaDownload className="text-[#c96f3a] text-xl" />
            </div>
            <h3 className="text-xl font-bold text-[#2c2118] mb-3"
              style={{ fontFamily: 'Poppins, sans-serif' }}>
              Download My Resume
            </h3>
            <p className="text-[#6d5a4c] text-sm mb-8 leading-relaxed">
              You can download my resume to learn more about my skills, experience, and projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Primary */}
              <a href={resumeFile} download
                className="flex items-center justify-center gap-2 bg-[#c96f3a] hover:bg-[#a7542a] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                <FaDownload /> Download Resume
              </a>
              {/* Secondary */}
              <a href={resumeFile} target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 border border-[#c96f3a] text-[#c96f3a] hover:bg-[#f4e1d4] px-6 py-3 rounded-lg font-semibold transition-all duration-200">
                <FaEye /> View Resume
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
