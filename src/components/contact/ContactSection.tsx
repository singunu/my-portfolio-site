'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope, FaPhone, FaLink, FaLinkedin } from 'react-icons/fa';
import ScrambleText from '@/components/ui/ScrambleText';

export default function ContactSection() {
  const contactInfo = {
    email: 'singunu17@gmail.com',
    phone: '+82 10-2933-3532',
    github: 'https://github.com/singunu',
    linkedin: 'https://www.linkedin.com/in/singunu/',
    notion: 'https://verbose-hoodie-b9b.notion.site/1509a4450304809fab3afaac417ab2ff?pvs=4',
  };

  const items = [
    { icon: <FaEnvelope className="h-5 w-5" />, label: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: <FaPhone className="h-5 w-5" />, label: contactInfo.phone, href: `tel:${contactInfo.phone}` },
    { icon: <FaGithub className="h-5 w-5" />, label: 'GitHub', href: contactInfo.github },
    { icon: <FaLinkedin className="h-5 w-5" />, label: 'LinkedIn', href: contactInfo.linkedin },
    { icon: <FaLink className="h-5 w-5" />, label: 'Portfolio (Notion)', href: contactInfo.notion },
  ];

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center px-4 py-20 pb-32 sm:px-6 sm:py-24">
      <motion.div
        className="mx-auto w-full max-w-lg"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-[var(--fg)] sm:text-4xl" style={{ fontFamily: 'Bai Jamjuree' }}>
            <ScrambleText text="Contact" />
          </h2>
          <p className="mt-3 text-sm text-[var(--fg-muted)] sm:text-base">
            <ScrambleText text="언제든 편하게 연락 주세요." />
          </p>
        </div>

        <div className="glassmorphism space-y-1 rounded-2xl p-3 sm:p-4">
          {items.map((c, i) => (
            <motion.a
              key={i}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl px-3 py-3 text-sm text-[var(--fg-muted)] transition-colors hover:bg-black/5 dark:hover:bg-white/5 sm:text-base"
              whileHover={{ x: 6 }}
            >
              <span
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-colors"
                style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 14%, transparent)', color: 'var(--accent)' }}
              >
                {c.icon}
              </span>
              <ScrambleText text={c.label} className="truncate font-medium text-[var(--fg)] group-hover:underline" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
