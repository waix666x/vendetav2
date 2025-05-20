import React from 'react';
import { motion } from 'framer-motion';

// Import framework logos
import reactLogo from '../assets/logo/Bitcoin.svg.png';
import viteLogo from '../assets/logo/eth-logo.png';
import typescriptLogo from '../assets/logo/firebase-logo.png';
import tailwindLogo from '../assets/logo/Vitejs-logo.svg.png';
import nodeLogo from '../assets/logo/js-logo.png';
import nextLogo from '../assets/logo/Typescript_logo_2020.svg.png';

const frameworks = [
  { name: 'Bitcoin', logo: reactLogo, color: '#F7931A' },
  { name: 'Ethereum', logo: viteLogo, color: '#627EEA' },
  { name: 'Firebase', logo: typescriptLogo, color: '#FFCA28' },
  { name: 'Vite', logo: tailwindLogo, color: '#646CFF' },
  { name: 'JavaScript', logo: nodeLogo, color: '#F7DF1E' },
  { name: 'TypeScript', logo: nextLogo, color: '#3178C6' },
];

const FrameworksSection = () => {
  return (
    <div className="frameworks-section py-12">
      <div className="framework-row">
        {frameworks.map((framework) => (
          <motion.div
            key={framework.name}
            className="framework-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            style={{ 
              '--card-color': framework.color,
              borderColor: framework.color
            } as React.CSSProperties}
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