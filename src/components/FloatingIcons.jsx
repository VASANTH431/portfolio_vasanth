import { motion } from 'framer-motion';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiJavascript, SiTailwindcss } from 'react-icons/si';

const icons = [
  { Icon: FaReact,       color: '#38BDF8', top: '12%',  left: '8%',   size: 32, delay: 0    },
  { Icon: FaNodeJs,      color: '#22C55E', top: '70%',  left: '5%',   size: 28, delay: 0.4  },
  { Icon: SiMongodb,     color: '#16A34A', top: '20%',  right: '6%',  size: 28, delay: 0.8  },
  { Icon: SiExpress,     color: '#475569', top: '75%',  right: '8%',  size: 26, delay: 1.2  },
  { Icon: SiJavascript,  color: '#FBBF24', top: '45%',  left: '3%',   size: 24, delay: 0.6  },
  { Icon: SiTailwindcss, color: '#2DD4BF', top: '50%',  right: '4%',  size: 24, delay: 1.0  },
];

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map(({ Icon, color, top, left, right, size, delay }, i) => (
        <motion.div
          key={i}
          className="absolute opacity-20"
          style={{ top, left, right }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay,
          }}
        >
          <Icon size={size} color={color} />
        </motion.div>
      ))}
    </div>
  );
}
