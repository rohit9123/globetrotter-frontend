// src/components/GameOverModal.jsx
import { motion } from 'framer-motion';

export default function GameOverModal({ isPerfect, score, onRestart, onShare }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-20"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-xl p-8 max-w-md w-full shadow-xl text-center"
      >
        {isPerfect ? (
          <>
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold mb-2">Flawless Victory!</h2>
            <p className="text-gray-600 mb-6">Perfect 100/100 Score!</p>
            <div className="grid gap-3">
              <button
                onClick={onShare}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Challenge Friends →
              </button>
              <button
                onClick={onRestart}
                className="text-blue-600 hover:text-blue-700 underline"
              >
                Play Again
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold mb-2">Game Over</h2>
            <p className="text-4xl font-bold text-blue-600 mb-6">{score}</p>
            <div className="grid gap-3">
              <button
                onClick={onRestart}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={onShare}
                className="border-2 border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Share Score
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}