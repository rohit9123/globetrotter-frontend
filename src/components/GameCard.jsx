import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from './Confetti';
import axios from 'axios';

export default function GameCard({ id, clues, options, onGuess }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [validationState, setValidationState] = useState('idle'); // 'idle' | 'checking' | 'correct' | 'incorrect'
  const [fact, setFact] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const handleGuess = async (userGuess) => {
    setSelectedAnswer(userGuess);
    setValidationState('checking');

    try {
      const response = await axios.post(
        'https://globerotter-backend.onrender.com/api/game/check-answers',
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
      );

      const result = response.data;
      setFact(result.fact);
      onGuess(result.correct);

      // Set validation state after animation frame
      requestAnimationFrame(() => {
        setValidationState(result.correct ? 'correct' : 'incorrect');
        
        // Set timeout for reset
        const id = setTimeout(() => {
          setSelectedAnswer(null);
          setValidationState('idle');
        }, 2000);
        
        setTimeoutId(id);
      });

    } catch (error) {
      console.error('Error checking answer:', error);
      setValidationState('idle');
      setSelectedAnswer(null);
    }
  };

  // Derived state for button classes
  const getButtonState = (option) => {
    if (selectedAnswer !== option) return 'idle';
    if (validationState === 'checking') return 'checking';
    return validationState;
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
        {options.map((option) => {
          const state = getButtonState(option);
          return (
            <motion.button
              key={option}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`p-3 rounded-lg text-left transition-colors duration-300
                ${state === 'checking' ? 'bg-blue-300 text-white' : ''}
                ${state === 'correct' ? 'bg-green-500 text-white' : ''}
                ${state === 'incorrect' ? 'bg-red-500 text-white' : ''}
                ${state === 'idle' ? 'bg-blue-100 hover:bg-blue-200' : ''}`}
              onClick={() => handleGuess(option)}
              disabled={validationState !== 'idle'}
            >
              {option}
              {state === 'checking' && (
                <span className="ml-2 animate-pulse">...</span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback Section */}
      {validationState !== 'idle' && validationState !== 'checking' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              {validationState === 'correct' ? '🎉' : '😢'}
            </span>
            <p className="font-bold">
              {validationState === 'correct' ? 'Correct! Well done!' : 'Oops! Try again!'}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-semibold">📚 Did You Know?</span>
              <div className="flex-1 border-t border-dashed border-gray-300"></div>
            </div>
            <p className="text-gray-700 leading-relaxed">{fact}</p>
          </div>

          {validationState === 'correct' && <Confetti />}
        </motion.div>
      )}
    </div>
  );
}