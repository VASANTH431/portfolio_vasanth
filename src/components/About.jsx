import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const stats = [
  {
    label: 'Projects Built',
    value: '3+',
    detail: 'Academic, personal, and portfolio projects focused on practical solutions.',
  },
  {
    label: 'Technologies',
    value: '12+',
    detail: 'Hands-on exposure across frontend, backend, databases, and developer tools.',
  },
  {
    label: 'Months Experience',
    value: '6+',
    detail: 'Consistent learning and project-based development with modern web technologies.',
  },
];

const highlights = [
  'Build responsive and user-friendly web interfaces',
  'Create MERN stack applications with clean structure',
  'Focus on practical solutions and continuous learning',
];

export default function About() {
  return (
    <section
      id="about"
      className="overflow-hidden bg-[linear-gradient(180deg,#f8f0e7_0%,#fffaf2_52%,#f2e6d8_100%)] py-20"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.26em] text-[#c96f3a]">
            About
          </p>
          <h2
            className="mb-3 text-3xl font-bold text-[#2c2118] md:text-4xl"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            About Me
          </h2>
          <p className="mx-auto max-w-2xl text-[#6d5a4c]">
            A quick snapshot of how I build products, grow my skills, and create practical web
            experiences.
          </p>
        </motion.div>

        <div className="grid items-stretch gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            className="relative overflow-hidden rounded-[30px] border border-[#dfcfbd] bg-[linear-gradient(155deg,#fffaf2_0%,#fff3e8_58%,#ead9c8_100%)] p-8 text-[#2c2118] shadow-[0_20px_44px_rgba(117,77,53,0.08)] md:p-10"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <div className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-[#f1c4a7]/35 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#ead3bf]/40 blur-3xl" />

            <p className="relative text-sm font-semibold tracking-[0.24em] uppercase text-[#c96f3a] mb-4">
              Who I Am
            </p>
            <h3
              className="relative mb-5 text-3xl font-bold leading-tight md:text-[2.2rem]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Building thoughtful web experiences with clean code and steady growth.
            </h3>

            <div className="relative space-y-4 leading-relaxed text-[#6d5a4c]">
              <p>
                Hello! I am <span className="font-semibold text-[#c96f3a]">Vasanth</span>, a software
                developer with a strong interest in building full-stack applications using modern
                technologies.
              </p>
              <p>
                I enjoy solving real-world problems with clean and efficient code. My main focus is
                creating responsive web applications with React, Node.js, and MongoDB.
              </p>
              <p>
                I am continuously improving my skills in backend architecture, scalable systems,
                and modern product development.
              </p>
            </div>

            <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#e8d7c7] bg-white/80 px-4 py-4 text-sm text-[#6c4d39] backdrop-blur-sm"
                >
                  <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#f6e6d9] text-[#c96f3a]">
                    <FaArrowRight size={10} />
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="grid h-full gap-5 sm:grid-cols-3 lg:grid-cols-1"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            {stats.map(({ label, value, detail }, index) => (
              <motion.div
                key={label}
                className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#e3d2c0] bg-[linear-gradient(180deg,#fffaf2_0%,#f3e7da_100%)] p-6 text-left shadow-[0_16px_38px_rgba(117,77,53,0.08)]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#f1c4a7] blur-2xl opacity-70" />
                <p
                  className="relative mb-2 text-4xl font-bold text-[#c96f3a]"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {value}
                </p>
                <p className="relative text-[#5f4d3f] text-sm font-medium">{label}</p>
                <p className="relative mt-3 text-sm leading-relaxed text-[#7b6757]">{detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
