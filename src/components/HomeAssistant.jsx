import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const messages = [
  "Hi! Welcome to Vasanth's portfolio.",
  'Check out the projects section.',
  'I can follow your cursor a little.',
  'Want to explore my skills or certificates?',
];

const sectionActions = [
  { label: 'Home', target: 'home', message: "Back to the home section." },
  { label: 'About', target: 'about', message: 'Opening the about section.' },

  { label: 'Skills', target: 'skills', message: 'Here are the core skills and tools.' },
  { label: 'Projects', target: 'projects', message: 'Opening the projects section.' },
  { label: 'Certificates', target: 'certificates', message: 'Showing the certificates section.' },
  { label: 'Resume', target: 'resume', message: 'Jumping to the resume section.' },
  { label: 'Contact', target: 'contact', message: 'Let us jump to the contact section.' },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function HomeAssistant() {
  const assistantRef = useRef(null);
  const returnTimeoutRef = useRef(null);
  const [active, setActive] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [customMessage, setCustomMessage] = useState('');
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [returningToIdle, setReturningToIdle] = useState(false);
  const [hoverBoost, setHoverBoost] = useState({ x: 0, y: 0, mode: 'idle' });
  const hoverBoostRef = useRef({ x: 0, y: 0, mode: 'idle' });
  const chatScrollRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState('nav'); // 'nav' or 'chat'
  const [isTyping, setIsTyping] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, { stiffness: 65, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 65, damping: 20 });

  const bodyX = useTransform(smoothX, [-1, 1], [-7, 7]);
  const bodyY = useTransform(smoothY, [-1, 1], [-6, 6]);
  const headRotateY = useTransform(smoothX, [-1, 1], [-24, 24]);
  const headRotateX = useTransform(smoothY, [-1, 1], [14, -14]);
  const eyeX = useTransform(smoothX, [-1, 1], [-4, 4]);
  const eyeY = useTransform(smoothY, [-1, 1], [-3, 3]);

  const currentMessage = customMessage || messages[messageIndex % messages.length];
  const quickActions = useMemo(
    () => sectionActions.filter((item) => item.target !== currentSection).slice(0, 4),
    [currentSection]
  );

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistory, bubbleOpen, activeTab, isTyping]);

  useEffect(() => {
    hoverBoostRef.current = hoverBoost;
  }, [hoverBoost]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!assistantRef.current?.contains(event.target)) {
        setBubbleOpen(false);
        setCustomMessage('');
        setActive(false);
        setActiveTab('nav');
        setReturningToIdle(true);
        pointerX.set(0);
        pointerY.set(0);
        setHoverBoost({ x: 0, y: 0, mode: 'idle' });

        if (returnTimeoutRef.current) {
          clearTimeout(returnTimeoutRef.current);
        }

        returnTimeoutRef.current = setTimeout(() => {
          setReturningToIdle(false);
        }, 1200);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      if (returnTimeoutRef.current) {
        clearTimeout(returnTimeoutRef.current);
      }
    };
  }, [pointerX, pointerY]);

  useEffect(() => {
    const updatePageState = () => {
      const sections = sectionActions
        .map(({ target }) => document.getElementById(target))
        .filter(Boolean);

      let activeSection = 'home';
      let bestOffset = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const anchorDistance = Math.abs(rect.top - window.innerHeight * 0.28);
        const inViewport = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.2;

        if (inViewport && anchorDistance < bestOffset) {
          bestOffset = anchorDistance;
          activeSection = section.id;
        }
      });

      setCurrentSection(activeSection);
    };

    const handleMove = (event) => {
      if (returningToIdle) return;
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      pointerX.set(clamp(x + hoverBoostRef.current.x, -1, 1));
      pointerY.set(clamp(y + hoverBoostRef.current.y, -1, 1));
      setActive(true);
    };

    const handleMouseLeave = (event) => {
      if (event.relatedTarget) return;
      setActive(false);
      pointerX.set(0);
      pointerY.set(0);
    };

    const handleHover = (event) => {
      if (returningToIdle) return;
      const target = event.target.closest('button, a, input, textarea, [data-robot-target]');
      if (!target) {
        setHoverBoost({ x: 0, y: 0, mode: 'idle' });
        return;
      }

      const rect = target.getBoundingClientRect();
      const x = ((rect.left + rect.width / 2) / window.innerWidth) * 2 - 1;
      const y = ((rect.top + rect.height / 2) / window.innerHeight) * 2 - 1;
      setHoverBoost({
        x: clamp(x * 0.25, -0.35, 0.35),
        y: clamp(y * 0.2, -0.25, 0.25),
        mode: target.matches('input, textarea') ? 'wave' : 'focus',
      });
    };

    updatePageState();
    window.addEventListener('scroll', updatePageState, { passive: true });
    window.addEventListener('resize', updatePageState);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mouseover', handleHover);
    document.addEventListener('focusin', handleHover);

    return () => {
      window.removeEventListener('scroll', updatePageState);
      window.removeEventListener('resize', updatePageState);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseover', handleHover);
      document.removeEventListener('focusin', handleHover);
    };
  }, [pointerX, pointerY, returningToIdle]);

  const handleRobotClick = () => {
    setBubbleOpen((open) => !open);
    setMessageIndex((value) => value + 1);
    setCustomMessage('');
  };

  const handleQuickAction = (target, message) => {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    setCustomMessage(message);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = { role: 'user', text: inputText };
    setChatHistory((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const lowerInput = userMessage.text.toLowerCase();
      let botResponse = "I'm not sure about that. Try asking about Vasanth's skills, projects, certificates, or contact info!";

      if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('stack')) {
        botResponse = "Vasanth is skilled in the MERN stack (MongoDB, Express, React, Node.js), JavaScript, Tailwind CSS, and more. Check out the Skills section for a full list!";
      } else if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('build')) {
        botResponse = "Vasanth has recently built a Web Application for Domestic Services and a Cost Optimization Dashboard. You can view them in the Projects section.";
      } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('hire')) {
        botResponse = "You can contact Vasanth at vasanthc1177@gmail.com or through the Contact section form. He's currently open to new opportunities!";
      } else if (lowerInput.includes('about') || lowerInput.includes('who') || lowerInput.includes('background')) {
        botResponse = "Vasanth is a software developer with a strong interest in building full-stack applications using modern technologies like React and Node.js.";
      } else if (lowerInput.includes('resume') || lowerInput.includes('cv') || lowerInput.includes('download')) {
        botResponse = "You can download or view Vasanth's updated resume directly from the Resume section.";
      } else if (lowerInput.includes('cert') || lowerInput.includes('course') || lowerInput.includes('cisco')) {
        botResponse = "Vasanth holds 7 certifications from Cisco Networking Academy, including Python Essentials, CCNAv7 (various modules), Cybersecurity, and Data Analytics. Check out the Certificates section!";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
        botResponse = "Hello there! How can I help you explore Vasanth's portfolio today?";
      }

      setChatHistory((prev) => [...prev, { role: 'assistant', text: botResponse }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div ref={assistantRef} className="fixed bottom-5 right-5 z-[60] origin-bottom-right scale-75 transition-transform duration-300 pointer-events-none lg:scale-100">
      <AnimatePresence>
        {bubbleOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="pointer-events-auto mb-4 ml-auto w-[300px] flex flex-col rounded-2xl border border-[#dfcfbd] bg-[#fffaf2]/95 p-4 text-sm text-[#5a493c] shadow-[0_16px_40px_rgba(117,77,53,0.16)]"
          >
            <div className="flex items-center justify-between mb-3 border-b border-[#e6d5c4] pb-2">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('nav')}
                  className={`font-semibold transition-colors ${activeTab === 'nav' ? 'text-[#c96f3a]' : 'text-[#8c7665] hover:text-[#c96f3a]'}`}
                >
                  Nav
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('chat')}
                  className={`font-semibold transition-colors ${activeTab === 'chat' ? 'text-[#c96f3a]' : 'text-[#8c7665] hover:text-[#c96f3a]'}`}
                >
                  Chat
                </button>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-[#8c7665]">
                {currentSection} section
              </p>
            </div>

            {activeTab === 'nav' ? (
              <div className="flex flex-col gap-3 mb-1">
                <div className="bg-[#f8eee5] border border-[#e6d5c4] self-start p-2.5 rounded-xl rounded-tl-sm max-w-[90%] text-xs">
                  <p className="leading-relaxed">{currentMessage}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {quickActions.map(({ label, target, message }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => handleQuickAction(target, message)}
                      className="rounded-xl border border-[#e6d5c4] bg-white px-2 py-1.5 text-xs font-semibold text-[#c96f3a] transition-colors hover:bg-[#f4e1d4] text-center shadow-sm"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="max-h-[220px] overflow-y-auto mb-3 pr-1 space-y-3 flex flex-col text-xs" ref={chatScrollRef} style={{ scrollbarWidth: 'thin', scrollbarColor: '#e6d5c4 transparent' }}>
                  {chatHistory.length === 0 && (
                    <div className="bg-[#f8eee5] border border-[#e6d5c4] self-start p-2.5 rounded-xl rounded-tl-sm max-w-[90%]">
                      <p className="leading-relaxed">Ask me anything about Vasanth's portfolio!</p>
                    </div>
                  )}

                  {chatHistory.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl max-w-[90%] ${
                        msg.role === 'user'
                          ? 'bg-[#c96f3a] text-white self-end rounded-tr-sm'
                          : 'bg-[#f8eee5] border border-[#e6d5c4] self-start rounded-tl-sm'
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="bg-[#f8eee5] border border-[#e6d5c4] self-start px-3 py-3.5 rounded-xl rounded-tl-sm w-fit flex items-center gap-1.5">
                      <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-[#c96f3a]/70 rounded-full" />
                      <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#c96f3a]/70 rounded-full" />
                      <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#c96f3a]/70 rounded-full" />
                    </div>
                  )}
                </div>

                <form onSubmit={handleChatSubmit} className="relative mt-auto flex items-center">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask me anything..."
                    className="w-full rounded-xl border border-[#e6d5c4] bg-white py-2 pl-3 pr-10 text-xs focus:border-[#c96f3a] focus:outline-none focus:ring-1 focus:ring-[#c96f3a]"
                  />
                  <button
                    type="submit"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#c96f3a] hover:text-[#a7542a] transition-colors disabled:opacity-50"
                    disabled={!inputText.trim()}
                    aria-label="Send message"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleRobotClick}
        className="relative pointer-events-auto w-[142px] h-[190px] bg-transparent"
        style={{ x: bodyX, y: bodyY }}
        animate={{
          y: active || returningToIdle ? 0 : [0, -8, 0],
          rotate: active || returningToIdle ? 0 : [-1.5, 1.5, -1.5],
        }}
        transition={{
          y: active
            ? { duration: 0.25 }
            : returningToIdle
              ? { duration: 1.2, ease: 'easeOut' }
              : { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          rotate: active
            ? { duration: 0.25 }
            : returningToIdle
              ? { duration: 1.2, ease: 'easeOut' }
              : { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
        aria-label="Open assistant message"
      >
        <motion.div
          className="absolute inset-x-4 bottom-5 h-8 rounded-full bg-[#d8ad8d]/35 blur-2xl"
          animate={{ scaleX: [1, 1.08, 1], opacity: [0.3, 0.45, 0.3] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
          style={{ rotateY: headRotateY, rotateX: headRotateX, transformPerspective: 800 }}
        >
          <div className="relative w-[92px] h-[82px] rounded-[28px] border border-[#e3d2c0] bg-[linear-gradient(160deg,#fffaf2_0%,#f8eee5_52%,#ead9c8_100%)] shadow-[0_16px_36px_rgba(117,77,53,0.22)]">
            <motion.div
              className="absolute top-[-14px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[linear-gradient(180deg,#e5a57d_0%,#c96f3a_100%)] shadow-[0_0_16px_rgba(201,111,58,0.35)]"
              animate={{ y: [0, -3, 0], scale: [1, 1.06, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute top-[-6px] left-1/2 -translate-x-1/2 w-8 h-3 rounded-full bg-[#edc1a3]" />
            <div className="absolute top-[27px] -left-[9px] w-[14px] h-[26px] rounded-full bg-[linear-gradient(180deg,#e5a57d_0%,#c96f3a_100%)] shadow-inner" />
            <div className="absolute top-[27px] -right-[9px] w-[14px] h-[26px] rounded-full bg-[linear-gradient(180deg,#e5a57d_0%,#c96f3a_100%)] shadow-inner" />
            <div className="absolute inset-[11px] rounded-[20px] bg-[linear-gradient(180deg,#3a2b20_0%,#2c2118_100%)] shadow-[inset_0_10px_22px_rgba(255,255,255,0.06)] overflow-hidden">
              <div className="absolute inset-x-0 top-[16px] flex items-center justify-center gap-5">
                {[0, 1].map((eye) => (
                  <motion.span
                    key={eye}
                    className="w-[14px] h-[14px] rounded-full bg-[#fff7ef] shadow-[0_0_20px_rgba(229,165,125,0.85)]"
                    style={{ x: eyeX, y: eyeY }}
                    animate={{ scaleY: active ? 1 : [1, 1, 0.16, 1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.5, 0.6, 1] }}
                  />
                ))}
              </div>
              <motion.div
                className="absolute left-1/2 bottom-[14px] -translate-x-1/2 w-[40px] h-[12px] border-b-[5px] border-[#fff7ef] rounded-[0_0_999px_999px] shadow-[0_0_18px_rgba(229,165,125,0.65)]"
                animate={{ width: bubbleOpen ? 46 : 40 }}
                transition={{ duration: 0.25 }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-[28px] left-1/2 -translate-x-1/2 z-10"
          animate={
            hoverBoost.mode === 'focus'
              ? { rotate: [0, -4, 4, 0] }
              : { y: [0, -2, 0], scale: [1, 1.015, 1] }
          }
          transition={
            hoverBoost.mode === 'focus'
              ? { duration: 0.8 }
              : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <div className="relative w-[74px] h-[82px] rounded-[28px] border border-[#e3d2c0] bg-[linear-gradient(170deg,#fffaf2_0%,#f8eee5_42%,#ead9c8_100%)] shadow-[0_16px_34px_rgba(117,77,53,0.18)]">
            <div className="absolute left-1/2 top-[-8px] -translate-x-1/2 w-8 h-4 rounded-full bg-[#fff7ef] border border-[#e3d2c0]" />
            <div className="absolute inset-x-[16px] top-[22px] h-[10px] rounded-full bg-[#f2dfcf]" />
            <div className="absolute inset-x-[8px] bottom-[10px] flex items-center justify-between">
              <motion.span
                className="w-[22px] h-[22px] rounded-full bg-[linear-gradient(180deg,#e5a57d_0%,#c96f3a_100%)] shadow-[0_8px_16px_rgba(201,111,58,0.25)]"
                animate={hoverBoost.mode === 'wave' ? { y: [-2, -14, -2], rotate: [0, -12, 10, 0] } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.9, repeat: hoverBoost.mode === 'wave' ? Infinity : 0 }}
              />
              <motion.span
                className="w-[22px] h-[22px] rounded-full bg-[linear-gradient(180deg,#e5a57d_0%,#c96f3a_100%)] shadow-[0_8px_16px_rgba(201,111,58,0.25)]"
                animate={{ y: 0 }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute top-[82px] left-[18px] z-0 h-[54px] w-[24px] rounded-full bg-[linear-gradient(180deg,#D8DDE8_0%,#8E96AA_100%)] rotate-[28deg] shadow-[inset_0_2px_5px_rgba(255,255,255,0.55)]"
          animate={{ rotate: hoverBoost.mode === 'wave' ? [28, 18, 28] : [28, 24, 28] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[82px] right-[18px] z-0 h-[54px] w-[24px] rounded-full bg-[linear-gradient(180deg,#D8DDE8_0%,#8E96AA_100%)] -rotate-[28deg] shadow-[inset_0_2px_5px_rgba(255,255,255,0.55)]"
          animate={{ rotate: hoverBoost.mode === 'wave' ? [-28, -38, -28] : [-28, -24, -28] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute top-[124px] left-[18px] z-0 w-[30px] h-[30px] rounded-full bg-[linear-gradient(180deg,#e5a57d_0%,#c96f3a_100%)] shadow-[0_10px_18px_rgba(201,111,58,0.22)]"
          animate={hoverBoost.mode === 'wave' ? { y: [0, -8, 0], rotate: [0, 10, 0] } : { y: [0, -2, 0] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[124px] right-[18px] z-0 w-[30px] h-[30px] rounded-full bg-[linear-gradient(180deg,#e5a57d_0%,#c96f3a_100%)] shadow-[0_10px_18px_rgba(201,111,58,0.22)]"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute top-[146px] left-[16px] z-0 w-[15px] h-[24px] rounded-b-full rounded-t-[10px] border-[4px] border-[#9CA3AF] border-t-0 rotate-[22deg]"
          animate={{ rotate: [22, 14, 22] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[146px] left-[28px] z-0 w-[15px] h-[24px] rounded-b-full rounded-t-[10px] border-[4px] border-[#9CA3AF] border-t-0 -rotate-[8deg]"
          animate={{ rotate: [-8, -2, -8] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[146px] right-[16px] z-0 w-[15px] h-[24px] rounded-b-full rounded-t-[10px] border-[4px] border-[#9CA3AF] border-t-0 -rotate-[22deg]"
          animate={{ rotate: [-22, -14, -22] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[146px] right-[28px] z-0 w-[15px] h-[24px] rounded-b-full rounded-t-[10px] border-[4px] border-[#9CA3AF] border-t-0 rotate-[8deg]"
          animate={{ rotate: [8, 2, 8] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.button>
    </div>
  );
}