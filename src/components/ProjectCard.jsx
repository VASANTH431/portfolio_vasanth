import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function ProjectCard({ title, description, tech, github, status, onOpen }) {
  const cardRef = useRef(null);

  // 3D tilt
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={() => onOpen?.()}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="h-full bg-[#fffaf2] rounded-[12px] overflow-hidden border border-[#dfcfbd] flex flex-col cursor-pointer"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(117,77,53,0.12)' }}
      transition={{ duration: 0.5 }}
      style={{ rotateX, rotateY, transformPerspective: 800, boxShadow: '0 8px 20px rgba(44,33,24,0.06)' }}
    >
      <div className="p-6 flex flex-col flex-1">
        {status && (
          <span className="w-fit mb-3 bg-[#ead3bf] text-[#8f4d28] text-xs font-semibold px-3 py-1 rounded-full">
            {status}
          </span>
        )}
        <h3
          className="text-[#2c2118] font-bold text-lg mb-2"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {title}
        </h3>
        <p className="text-[#6d5a4c] text-sm leading-relaxed mb-4 flex-1 line-clamp-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-5 min-h-[32px]">
          {tech.map((t) => (
            <span
              key={t}
              className="inline-flex h-6 items-center rounded-full bg-[#f2dfcf] px-3 text-[12px] font-medium text-[#a7542a]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <motion.a
            href={github}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="flex items-center gap-2 border border-[#dfcfbd] hover:border-[#c96f3a] text-[#6d5a4c] hover:text-[#c96f3a] px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 350 }}
          >
            <FaExternalLinkAlt /> Visit Site
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
