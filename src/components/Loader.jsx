import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ done }) {
  const name = "VASANTH".split("");

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#fffaf2] flex flex-col items-center justify-center overflow-hidden perspective-1000"
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <div className="relative flex items-center justify-center h-16 z-10">
            {/* Base Outline Layer */}
            <div className="absolute inset-0 flex items-center justify-center gap-1 md:gap-2 pointer-events-none">
              {name.map((letter, index) => (
                <span
                  key={`outline-${index}`}
                  className="text-3xl md:text-5xl font-black tracking-[0.15em] uppercase"
                  style={{ 
                    fontFamily: 'Poppins, sans-serif',
                    WebkitTextStroke: '1.5px rgba(201, 111, 58, 0.25)',
                    color: 'transparent'
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>

            {/* Liquid Fill Animated Layer */}
            <div className="absolute inset-0 flex items-center justify-center gap-1 md:gap-2">
            {name.map((letter, index) => (
              <motion.span
                key={`fill-${index}`}
                className="text-3xl md:text-5xl font-black text-[#c96f3a] tracking-[0.15em] uppercase drop-shadow-md inline-block"
                style={{ fontFamily: 'Poppins, sans-serif' }}
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ 
                  clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)', 'inset(0% 0 0 0)']
                }}
                transition={{
                  duration: 2.2,
                  times: [0, 0.5, 1],
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.15
                }}
              >
                {letter}
              </motion.span>
            ))}
            </div>
          </div>

          {/* Minimalist Animated Ring */}
          <motion.div 
            className="mt-12 flex flex-col items-center gap-5 z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <motion.svg className="absolute w-full h-full origin-center" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" stroke="#ead9c8" strokeWidth="2" fill="none" />
                <motion.circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="#c96f3a"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  style={{ originX: '50%', originY: '50%' }}
                  initial={{ pathLength: 0, rotate: -90 }}
                  animate={{ pathLength: [0, 1, 0], rotate: [-90, -90, 270] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.svg>
              {/* Center Dot pulsing */}
              <motion.div 
                className="w-1 h-1 bg-[#2c2118] rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <p className="text-[#8c7665] text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase">
              Loading
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
