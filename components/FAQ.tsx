import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';

const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'Who exactly is bxrtie?',
    answer: 'I am a dedicated full-stack engineer with a knack for systems design and UI/UX. I strive to bridge the gap between complex backend logic and intuitive frontend experiences.',
  },
  {
    id: 2,
    question: 'What is your preferred tech stack?',
    answer: 'My daily drivers include React, TypeScript, Node.js, and Tailwind CSS. For heavy-lifting backend tasks, I prefer Go or Rust, and I utilize Docker for consistent deployment environments.',
  },
  {
    id: 3,
    question: 'Are you open to freelance work?',
    answer: 'Yes, I am currently available for select freelance projects and consulting opportunities. If you have an interesting problem to solve, I would love to hear about it.',
  },
  {
    id: 4,
    question: 'How can I reach you best?',
    answer: 'The contact form below is the quickest way to get in touch. Alternatively, you can shoot me a direct email or ping me on Discord.',
  },
];

export const FAQ: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between focus:outline-none"
              >
                <span className="text-lg font-medium text-slate-900 dark:text-slate-100 text-left">
                  {item.question}
                </span>
                {activeId === item.id ? (
                  <ChevronUp className="text-brand-600 dark:text-brand-400" />
                ) : (
                  <ChevronDown className="text-slate-400" />
                )}
              </button>
              <AnimatePresence>
                {activeId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 text-slate-600 dark:text-slate-300">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};