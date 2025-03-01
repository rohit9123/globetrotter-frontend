import { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from './Confetti';


export default function GameCard({ clues, options,correctAnswer, fact,onGuess }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);


  // Handle user's answer selection
  const handleGuess = async (userGuess) => {
    setSelectedAnswer(userGuess);
    

    const correct = userGuess === correctAnswer;
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Pass result to parent component
    onGuess?.(correct);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setSelectedAnswer(null);
      setShowFeedback(false);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg">
      {/* Clues Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">🔍 Clues</h2>
        <ul className="space-y-2">
          {clues.map((clue, index) => (
            <li key={index} className="text-gray-600 italic">
              {clue}
            </li>
          ))}
        </ul>
      </div>

      {/* Answer Options */}
      <div className="grid gap-3">
        {options.map((option) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`p-3 rounded-lg text-left transition-colors
              ${
                selectedAnswer === option
                  ? isCorrect
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-blue-100 hover:bg-blue-200'
              }`}
            onClick={() => handleGuess(option)}
            disabled={selectedAnswer !== null}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {/* Feedback Section */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              {isCorrect ? '🎉' : '😢'}
            </span>
            <p className="font-bold">
              {isCorrect ? 'Correct! Well done!' : 'Oops! Try again!'}
            </p>
            
          </div>
          
          {/* Fun Fact (Add real data later) */}
          <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold">📚 Did You Know?</span>
            <div className="flex-1 border-t border-dashed border-gray-300"></div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {fact}
          </p>
        </div>


          {/* Confetti Animation */}
          {isCorrect && <Confetti />}
        </motion.div>
      )}
    </div>
  );
}