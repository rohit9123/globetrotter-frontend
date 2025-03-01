// Update AnimatedCounter.jsx
import { motion } from 'framer-motion';

export default function ScoreEmoji({ value }) {
  const emojis = [
    { threshold: 0, emoji: '👶' },
    { threshold: 30, emoji: '🧭' },
    { threshold: 60, emoji: '🌍' },
    { threshold: 90, emoji: '🏅' },
  ];

  const currentEmoji = emojis
    .reverse()
    .find(e => value >= e.threshold)?.emoji || '👶';

  return (
    <motion.span
      key={currentEmoji}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="text-3xl ml-2"
    >
      {currentEmoji}
    </motion.span>
  );
}
