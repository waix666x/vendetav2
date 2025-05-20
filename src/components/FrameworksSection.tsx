import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Import framework logos
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
import typescriptLogo from '../assets/typescript.svg';
import tailwindLogo from '../assets/tailwind.svg';
import nodeLogo from '../assets/node.svg';
import nextLogo from '../assets/next.svg';

const frameworks = [
  { name: 'React', logo: reactLogo },
  { name: 'Vite', logo: viteLogo },
  { name: 'TypeScript', logo: typescriptLogo },
  { name: 'Tailwind', logo: tailwindLogo },
  { name: 'Node.js', logo: nodeLogo },
  { name: 'Next.js', logo: nextLogo },
];

const FrameworksSection = () => {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.framework-card');
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <div className="frameworks-section py-12">
      <div className="framework-row" ref={rowRef}>
        {frameworks.map((framework, index) => (
          <motion.div
            key={framework.name}
            className="framework-card"
            initial={{ opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            style={{ '--glow-color': '#ff5c13' } as React.CSSProperties}
          >
            <img
              src={framework.logo}
              alt={framework.name}
              className="w-12 h-12 object-contain"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FrameworksSection; 