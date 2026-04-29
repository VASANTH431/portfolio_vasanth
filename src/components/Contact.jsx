import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa';

const contactInfo = [
  { icon: <FaEnvelope />, label: 'Email', value: 'vasanthc1177@gmail.com', href: 'mailto:vasanthc1177@gmail.com' },
  { icon: <FaPhone />, label: 'Phone', value: '+91 9080691947', href: 'tel:+919080691947' },
  { icon: <FaLinkedin />, label: 'LinkedIn', value: 'linkedin.com/in/vasanth-c-2ba52a2a5', href: 'https://www.linkedin.com/in/vasanth-c-2ba52a2a5/' },
  { icon: <FaGithub />, label: 'GitHub', value: 'github.com/VASANTH431', href: 'https://github.com/VASANTH431' },
];

const inputClass =
  'w-full border border-[#dfcfbd] rounded-lg px-4 py-3 text-sm text-[#2c2118] placeholder-[#9a8575] focus:outline-none focus:border-[#c96f3a] focus:ring-1 focus:ring-[#c96f3a] transition-all duration-200 bg-[#fffaf2]';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    emailjs.send(
      'service_k7ionkf', // 👈 Replace with your EmailJS Service ID
      'template_8bgbj8d',
      { user_name: form.name, user_email: form.email, message: form.message },
      'vox8a28dkiEumcq_o'
    ).then(
      () => {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      },
      () => {
        setStatus('error');
      }
    );
  };

  return (
    <section id="contact" className="py-20 bg-[#fffaf2]">
      <div className="max-w-[1200px] mx-auto px-6">

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2c2118] mb-3"
            style={{ fontFamily: 'Poppins, sans-serif' }}>
            Contact
          </h2>
          <div className="w-14 h-1 bg-[#c96f3a] mx-auto rounded-full" />
          <p className="text-[#7b6757] mt-4 text-sm">Let's work together</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-[#2c2118] mb-3"
              style={{ fontFamily: 'Poppins, sans-serif' }}>
              Get In Touch
            </h3>
            <p className="text-[#6d5a4c] text-sm leading-relaxed mb-8">
              I'm currently open to new opportunities. Whether you have a question or just want to say hi,
              feel free to reach out!
            </p>
            <div className="flex flex-col gap-5">
              {contactInfo.map(({ icon, label, value, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-4 group">
                  <div className="w-11 h-11 bg-[#f2dfcf] rounded-lg flex items-center justify-center text-[#c96f3a] text-lg group-hover:bg-[#c96f3a] group-hover:text-white transition-all duration-200">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs text-[#9a8575] mb-0.5">{label}</p>
                    <p className="text-[#2c2118] font-medium text-sm group-hover:text-[#c96f3a] transition-colors duration-200">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-[#f8eee5] rounded-xl p-8 border border-[#dfcfbd] flex flex-col gap-5"
            style={{ boxShadow: '0 8px 20px rgba(44,33,24,0.04)' }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <label className="block text-sm font-medium text-[#2c2118] mb-1.5">Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange}
                required placeholder="Your Name" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2c2118] mb-1.5">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange}
                required placeholder="vasanthc1177@gmail.com" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2c2118] mb-1.5">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange}
                required rows={5} placeholder="Your message..."
                className={`${inputClass} resize-none`} />
            </div>
            <button type="submit" disabled={status === 'sending'}
              className="bg-[#c96f3a] hover:bg-[#a7542a] disabled:opacity-60 text-white py-3 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && (
              <p className="text-[#22C55E] text-sm text-center font-medium">Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-[#EF4444] text-sm text-center font-medium">Something went wrong. Please try again.</p>
            )}
          </motion.form>

        </div>
      </div>
    </section>
  );
}
