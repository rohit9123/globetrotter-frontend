import { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from './Confetti';
import axios from 'axios';

export default function GameCard({ id, clues, options, onGuess }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [fact, setFact] = useState(''); // State to store the fun fact


  // Handle user's answer selection
  const handleGuess = async (userGuess) => {
    
    setSelectedAnswer(userGuess);

    try {
      // Send the user's answer to the server
      const response = await axios.post(
        'http://localhost:5000/api/game/check-answers',
        {
          id,
          answer: userGuess,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      
      const result =  response.data;

      // Update state based on the server's response
      onGuess(result.correct);
      setIsCorrect(result.correct);
      setFact(result.fact); // Set the fun fact from the server
      setShowFeedback(true);

      // Notify the parent component about the guess
      

      // Reset after 2 seconds
      setTimeout(() => {
        setSelectedAnswer(null);
        setShowFeedback(false);
      }, 2000);
    } catch (error) {
      console.error('Error checking answer:', error);
    }
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

          {/* Fun Fact */}
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