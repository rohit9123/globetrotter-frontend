import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FiCheck, FiX, FiStar } from 'react-icons/fi';

export default function GameHeader({ 
  currentQuestion, 
  totalQuestions,
  score 
}) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const correctAnswers = Math.max(0, Math.floor(score / 10));
  const incorrectAnswers = Math.max(0, currentQuestion - correctAnswers);

  return (
    <div className="mb-8 space-y-6">
      {/* Progress Section */}
      <div className="space-y-3">
        <div className="flex justify-center gap-4 text-sm text-gray-600">
          <span className="font-medium">Question {currentQuestion + 1}</span>
          <span className="text-blue-600">{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
          </motion.div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {/* Correct */}
        <motion.div
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-center items-center gap-2 text-green-600 mb-1">
            <FiCheck className="shrink-0" />
            <div className="text-sm font-medium">Correct</div>
          </div>
          <div className="text-2xl font-semibold">
            <CountUp start={0} end={correctAnswers} duration={0.8} />
          </div>
        </motion.div>

        {/* Incorrect */}
        <motion.div
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-center items-center gap-2 text-red-600 mb-1">
            <FiX className="shrink-0" />
            <div className="text-sm font-medium">Incorrect</div>
          </div>
          <div className="text-2xl font-semibold">
            <CountUp start={0} end={incorrectAnswers} duration={0.8} />
          </div>
        </motion.div>

        {/* Score */}
        <motion.div
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex justify-center items-center gap-2 text-blue-600 mb-1">
            <FiStar className="shrink-0" />
            <div className="text-sm font-medium">Score</div>
          </div>
          <div className="text-2xl font-semibold">
            <CountUp start={0} end={score} duration={1} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}