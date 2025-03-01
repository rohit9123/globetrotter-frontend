// src/components/Score.jsx
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

export default function Score({ value }) {
  return (
    <motion.div 
      className="flex items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <span className="text-lg font-medium text-gray-600">Score:</span>
      <div className="relative">
        <CountUp
          end={value}
          duration={0.8}
          className="text-xl font-bold text-blue-600"
        />
      </div>
    </motion.div>
  );
}