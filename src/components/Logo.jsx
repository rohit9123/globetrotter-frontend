// src/components/Logo.jsx
'use client';

import { motion } from 'framer-motion';

export default function Logo() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      className="h-12 w-12"
    >
      <img 
        src="/earthheader.svg" // Globe-only SVG
        alt="Animated Globe"
        className="h-full w-full"
      />
    </motion.div>
  );
}