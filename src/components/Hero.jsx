import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaGithub, FaHackerrank, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import heroImg from '../assets/images/vasanth_hero.png';
import resumeFile from '../assets/files/Vasanth  Resume.pdf';
import FloatingIcons from './FloatingIcons';

/* ── Sequenced entry variants ── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function Hero() {
  const sectionRef = useRef(null);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  /* ── Mouse parallax ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const blobX = useSpring(useTransform(mouseX, [0, 1], [-30, 30]), { stiffness: 60, damping: 20 });
  const blobY = useSpring(useTransform(mouseY, [0, 1], [-20, 20]), { stiffness: 60, damping: 20 });
  const shapeX = useSpring(useTransform(mouseX, [0, 1], [-26, 26]), { stiffness: 70, damping: 18 });
  const shapeY = useSpring(useTransform(mouseY, [0, 1], [-18, 18]), { stiffness: 70, damping: 18 });
  const secondaryBlobX = useTransform(blobX, (v) => -v * 0.6);
  const secondaryBlobY = useTransform(blobY, (v) => -v * 0.6);
  const shapeRotate = useTransform(shapeX, [-26, 26], [-5, 5]);
  const ringX = useTransform(shapeX, (v) => -v * 0.7);
  const ringY = useTransform(shapeY, (v) => -v * 0.7);
  const panelX = useTransform(shapeX, (v) => v * 0.45);
  const panelY = useTransform(shapeY, (v) => v * 0.45);
  const panelRotate = useTransform(shapeY, [-18, 18], [-8, 8]);
  const topCardY = useTransform(panelY, (v) => -v * 0.6);
  const topCardRotate = useTransform(panelRotate, (v) => -v);
  const accentX = useTransform(shapeX, (v) => -v * 0.35);
  const accentY = useTransform(shapeY, (v) => v * 0.35);
  const accentRotate = useTransform(shapeX, [-26, 26], [-12, 12]);
  const glossX = useTransform(shapeX, (v) => v * 0.12);
  const imageX = useTransform(shapeX, (v) => v * 0.18);
  const imageY = useTransform(shapeY, (v) => v * 0.12);
  const basePlateX = useTransform(imageX, (v) => v * 0.15);

  const onMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen bg-[linear-gradient(180deg,#fffaf2_0%,#f6efe4_100%)] flex items-center pt-[70px] overflow-hidden"
    >
      {/* ── Parallax gradient blobs ── */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 bg-[#f1c4a7] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ x: blobX, y: blobY }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-[#ead3bf] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ x: secondaryBlobX, y: secondaryBlobY }}
      />

      {/* ── Floating tech icons ── */}
      <FloatingIcons />

      <div className="relative max-w-[1200px] mx-auto px-6 py-20 w-full">
        <div className="grid items-center gap-14 md:grid-cols-[minmax(0,1fr)_minmax(420px,520px)]">

          {/* ── Left — staggered text ── */}
          <motion.div
            className="mx-auto w-full max-w-[560px] text-center md:mx-0 md:text-left"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={fadeUp}
              className="text-[#c96f3a] font-semibold mb-3 text-sm tracking-widest uppercase">
              Welcome to my portfolio
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-bold text-[#2c2118] mb-3 leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontFamily: 'Poppins, sans-serif' }}
            >
              Hi, I'm <span className="text-[#c96f3a]">Vasanth</span>
            </motion.h1>

            <motion.h2 variants={fadeUp}
              className="text-xl md:text-2xl text-[#6d5a4c] font-medium mb-5">
              Frontend / MERN Stack Developer
            </motion.h2>

            <motion.p variants={fadeUp}
              className="text-[#6d5a4c] text-base leading-relaxed mb-10 max-w-lg mx-auto md:mx-0">
              I am a passionate developer who enjoys building scalable web applications and modern
              user interfaces. I focus on creating clean, efficient, and maintainable code.
            </motion.p>

            {/* Social icons */}
            <motion.div variants={fadeUp}
              className="flex gap-6 justify-center md:justify-start mb-8">
              {[
                { href: 'https://www.linkedin.com/in/vasanth-c-2ba52a2a5/', Icon: FaLinkedin },
                { href: 'https://leetcode.com/u/vasanth431/', Icon: SiLeetcode },
                { href: 'https://github.com/VASANTH431', Icon: FaGithub },
                { href: 'https://www.hackerrank.com/profile/vasanthc11771', Icon: FaHackerrank },
              ].map(({ href, Icon }) => (
                <motion.a key={href} href={href} target="_blank" rel="noreferrer"
                  className="text-[#2c2118] hover:text-[#c96f3a] transition-colors duration-200"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 400 }}>
                  <Icon size={26} />
                </motion.a>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div variants={fadeUp}
              className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
              <motion.button
                onClick={() => scrollTo('projects')}
                className="bg-[#c96f3a] hover:bg-[#a7542a] text-white px-6 py-3 rounded-lg font-semibold shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                View Projects
              </motion.button>
              <motion.a
                href={resumeFile}
                target="_blank"
                rel="noreferrer"
                className="border border-[#c96f3a] text-[#c96f3a] hover:bg-[#f4e1d4] px-6 py-3 rounded-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                View Resume
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── Right — profile image scale-in ── */}
          <motion.div
            className="flex w-full justify-center md:justify-end"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
          >
            <div className="relative h-[390px] w-[300px] shrink-0 sm:h-[460px] sm:w-[360px] md:h-[580px] md:w-[500px]">
              <motion.div
                className="absolute inset-x-10 top-10 bottom-12 rounded-[44px] border border-[#e7d9cb] bg-[linear-gradient(160deg,rgba(255,250,242,0.72)_0%,rgba(255,243,232,0.58)_38%,rgba(234,217,200,0.68)_100%)] shadow-[0_24px_60px_rgba(117,77,53,0.10)]"
                style={{ x: panelX, y: panelY, rotate: panelRotate }}
              />
              <motion.div
                className="absolute inset-x-16 top-0 h-[72%] rounded-[40px] bg-[linear-gradient(180deg,#f1c4a7_0%,#d98a58_100%)] opacity-45 blur-md"
                style={{ x: shapeX, y: shapeY, rotate: shapeRotate }}
              />
              <motion.div
                className="absolute left-2 top-16 w-24 h-24 md:w-32 md:h-32 rounded-full border-[16px] border-[#e4b592]/80"
                style={{ x: ringX, y: ringY }}
              />
              <motion.div
                className="absolute right-3 top-20 w-20 h-20 md:w-24 md:h-24 rounded-[28px] bg-white/85 border border-[#e6d5c4] shadow-[0_12px_30px_rgba(117,77,53,0.12)]"
                style={{ x: panelX, y: topCardY, rotate: topCardRotate }}
              />
              <motion.div
                className="absolute left-8 bottom-20 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#c96f3a] shadow-[0_16px_30px_rgba(201,111,58,0.25)]"
                style={{ x: accentX, y: accentY, rotate: accentRotate }}
              />
              <div className="absolute inset-x-[18%] top-12 bottom-10 rounded-[36px] border border-white/70 pointer-events-none" />
              <motion.div
                className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[76%] h-12 rounded-full bg-[#d8ad8d]/45 blur-2xl"
                animate={{ scaleX: [1, 1.08, 1], opacity: [0.3, 0.44, 0.3] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute inset-x-[16%] bottom-8 top-[8%] rounded-[40px] bg-[linear-gradient(180deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0)_40%)] pointer-events-none"
                style={{ x: glossX }}
              />
              <motion.img
                src={heroImg}
                alt="Vasanth"
                className="absolute left-1/2 bottom-[52px] z-20 w-[88%] md:w-[92%] max-h-full -translate-x-1/2 object-contain drop-shadow-[0_28px_55px_rgba(15,23,42,0.16)] [mask-image:radial-gradient(ellipse_at_center,black_50%,black_66%,transparent_86%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_50%,black_66%,transparent_86%)]"
                animate={{ y: [0, -10, 0], rotate: [0, -1, 0] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ x: imageX, y: imageY }}
              />
              <motion.div
                className="absolute left-1/2 bottom-[26px] z-30 h-[30px] w-[48%] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#fffaf2_0%,#ead9c8_100%)] border border-[#dfcfbd] shadow-[0_10px_22px_rgba(117,77,53,0.10)]"
                style={{ x: basePlateX }}
              />
              <div className="absolute left-1/2 bottom-[8px] z-0 h-14 w-[56%] -translate-x-1/2 rounded-full bg-[#caa388]/28 blur-2xl" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
