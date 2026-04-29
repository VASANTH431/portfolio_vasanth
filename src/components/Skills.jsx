import { motion } from 'framer-motion';
import { FaCss3Alt, FaGitAlt, FaGithub, FaHtml5, FaJs, FaNodeJs, FaReact } from 'react-icons/fa';
import { SiExpress, SiMongodb, SiMysql, SiPostman, SiTailwindcss } from 'react-icons/si';
import cImage from '../assets/images/c.png';
import dockerImage from '../assets/images/docker.png';
import firebaseImage from '../assets/images/firebase.png';
import javaImage from '../assets/images/java.png';
import vscodeImage from '../assets/images/vscode.png';
import wordpressImage from '../assets/images/wp.png';

const categories = [
  {
    title: 'Programming Languages',
    accent: 'from-[#fff8f1] via-[#fff3e8] to-[#fffaf2]',
    label: 'Core Logic',
    badge: 'C / Java / JS',
    skills: [
      { name: 'C', icon: <img src={cImage} alt="C" className="w-5 h-5 object-contain" /> },
      { name: 'Java', icon: <img src={javaImage} alt="Java" className="w-5 h-5 object-contain" /> },
      { name: 'JavaScript', icon: <FaJs className="text-yellow-400" /> },
    ],
  },
  {
    title: 'Frontend',
    accent: 'from-[#fff8f1] via-[#fff3e8] to-[#fffaf2]',
    label: 'Interface Craft',
    badge: 'UI',
    skills: [
      { name: 'HTML', icon: <FaHtml5 className="text-orange-500" /> },
      { name: 'CSS', icon: <FaCss3Alt className="text-blue-500" /> },
      { name: 'JavaScript', icon: <FaJs className="text-yellow-400" /> },
      { name: 'React', icon: <FaReact className="text-cyan-400" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-teal-400" /> },
    ],
  },
  {
    title: 'Backend',
    accent: 'from-[#f6ede2] via-[#fff3e8] to-[#fffaf2]',
    label: 'Logic & APIs',
    badge: 'API',
    skills: [
      { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
      { name: 'Express.js', icon: <SiExpress className="text-gray-600" /> },
    ],
  },
  {
    title: 'Database',
    accent: 'from-[#fff8f1] via-[#fff3e8] to-[#fffaf2]',
    label: 'Data Layer',
    badge: 'DB',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb className="text-green-600" /> },
      { name: 'MySQL', icon: <SiMysql className="text-blue-600" /> },
    ],
  },
  {
    title: 'Tools',
    accent: 'from-[#f6ede2] via-[#fff3e8] to-[#fffaf2]',
    label: 'Workflow Stack',
    badge: 'DEV',
    skills: [
      { name: 'Git', icon: <FaGitAlt className="text-orange-600" /> },
      { name: 'GitHub', icon: <FaGithub className="text-gray-700" /> },
      { name: 'Docker', icon: <img src={dockerImage} alt="Docker" className="w-5 h-5 object-contain" /> },
      { name: 'Firebase', icon: <img src={firebaseImage} alt="Firebase" className="w-5 h-5 object-contain" /> },
      { name: 'Postman', icon: <SiPostman className="text-orange-500" /> },
      { name: 'VS Code', icon: <img src={vscodeImage} alt="VS Code" className="w-5 h-5 object-contain" /> },
      { name: 'WordPress', icon: <img src={wordpressImage} alt="WordPress" className="w-5 h-5 object-contain" /> },
    ],
  },
];

const cardContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

const chipItem = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-20 bg-[linear-gradient(180deg,#fffaf2_0%,#f4eadf_45%,#f6efe4_100%)] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-[#2c2118] mb-3"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Skills
          </h2>
          <div className="w-14 h-1 bg-[#c96f3a] mx-auto rounded-full" />
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 gap-6"
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {categories.map(({ title, accent, label, badge, skills }) => (
            <motion.div
              key={title}
              variants={cardItem}
              whileHover={{ y: -10 }}
              className={`relative rounded-[24px] border border-[#dfcfbd] bg-gradient-to-br ${accent} p-5 md:p-6 shadow-[0_16px_38px_rgba(117,77,53,0.08)]`}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#c96f3a] mb-2">{label}</p>
                  <h3
                    className="text-[#2c2118] font-bold text-xl"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {title}
                  </h3>
                </div>
                <div className="min-w-[64px] h-12 rounded-2xl bg-[linear-gradient(135deg,#f8ede1_0%,#fffaf2_100%)] border border-[#dfcfbd] shadow-sm flex items-center justify-center px-3">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-[#c96f3a] uppercase">
                    {badge}
                  </span>
                </div>
              </div>

              <motion.div
                className="flex flex-wrap gap-3"
                variants={cardContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {skills.map(({ name, icon }) => (
                  <motion.div
                    key={name}
                    variants={chipItem}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="group flex items-center gap-3 rounded-2xl bg-[#fffaf2] border border-[#e6d5c4] shadow-[0_10px_24px_rgba(117,77,53,0.07)] px-4 py-3"
                  >
                    <motion.span
                      className="text-xl"
                      whileHover={{ rotate: 10, scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 380 }}
                    >
                      {icon}
                    </motion.span>
                      <span className="text-sm font-medium text-[#5a493c] group-hover:text-[#c96f3a] transition-colors">
                      {name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
