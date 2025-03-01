// src/pages/GamePage.jsx
import { useState } from 'react';
import GameCard from '../components/GameCard';
import Confetti from '../components/Confetti';
import Score from '../components/Score';
import ProgressBar from '../components/ProgressBar';
import GameOverModal from '../components/GameOverModal';
import GameHeader from '../components/GameHeader';

// Hardcoded questions (add 10 entries)
const QUESTIONS = [
  {
    id: 1,
    clues: ["Iconic tower in Paris", "Nicknamed 'The Iron Lady'"],
    options: ["Eiffel Tower", "Statue of Liberty", "Big Ben"],
    correct: "Eiffel Tower",
    fact: "Constructed for the 1889 World's Fair"
  },
  {
    id: 2,
    clues: ["Largest coral reef system", "Located in Australia"],
    options: ["Great Barrier Reef", "Amazon Reef", "New Caledonia Barrier Reef"],
    correct: "Great Barrier Reef",
    fact: "Visible from space"
  },

  {
    id: 3,
    clues: ["World's largest desert", "Located in Africa"],
    options: ["Sahara Desert", "Arabian Desert", "Gobi Desert"],
    correct: "Sahara Desert",
    fact: "Almost as large as China"
  },

  {
    id: 4,
    clues: ["World's longest river", "Flows through Egypt"],
    options: ["Amazon River", "Nile River", "Yangtze River"],
    correct: "Nile River",
    fact: "Approximately 6,650 km long"
  },

  {
    id: 5,
    clues: ["World's tallest mountain", "Located in Nepal"],
    options: ["Mount Kilimanjaro", "Mount Everest", "K2"],
    correct: "Mount Everest",
    fact: "Over 8,848 meters high"
  },

  {
    id: 6,
    clues: ["Largest country by land area", "Located in Asia"],
    options: ["Russia", "China", "Canada"],
    correct: "Russia",
    fact: "Spans 11 time zones"
  },

  {
    id: 7,
    clues: ["World's smallest country", "Located in Rome"],
    options: ["Vatican City", "Monaco", "San Marino"],
    correct: "Vatican City",
    fact: "Home to the Pope"
  },

  {
    id: 8,
    clues: ["World's largest ocean", "Covers 1/3 of the Earth's surface"],
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean"],
    correct: "Pacific Ocean",
    fact: "Contains 25,000 islands"
  },

  {
    id: 9,
    clues: ["World's largest continent", "Home to the Great Wall of China"],
    options: ["Asia", "Africa", "Europe"],
    correct: "Asia",
    fact: "Covers 30% of Earth's land area"
  },

  {
    id: 10,
    clues: ["World's largest waterfall", "Located in Zambia/Zimbabwe"],
    options: ["Niagara Falls", "Angel Falls", "Victoria Falls"],
    correct: "Victoria Falls",
    fact: "Twice as tall as Niagara Falls"
  }

];

export default function GamePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const totalQuestions = QUESTIONS.length;

  const handleGuess = (isCorrect) => {
    if (isCorrect) {
      setScore(prev => prev + 10);
      setShowConfetti(true);
    }

    // Move to next question after delay
    setTimeout(() => {
      setShowConfetti(false);
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else{
        setGameOver(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setGameOver(false);
    setScore(0);
    setShowConfetti(false);
  };

  if (currentQuestion >= QUESTIONS.length) {
    return (
      
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Game Over! 🎮</h2>
        <p className="text-xl mb-6">Your Score: {score}/100</p>
        <button
          onClick={resetGame}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Play Again
        </button>
      </div>
    );
  }

  const currentQ = QUESTIONS[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {gameOver && (
        <GameOverModal
          isPerfect={score === 100}
          score={score}
          onRestart={resetGame}
          onShare={() => {
            const message = score === 100
              ? `I aced all 10 questions! Can you beat my perfect score? 🌍 ${window.location.href}`
              : `I scored ${score} points in Globetrotter! Try to beat me: ${window.location.href}`;
            
            window.open(
              `https://wa.me/?text=${encodeURIComponent(message)}`,
              '_blank'
            );
          }}
        />
      )}
      <div className="max-w-2xl mx-auto">
        {/* Combined Header */}
        <GameHeader score={score} totalQuestions={totalQuestions} currentQuestion={currentQuestion} />
  
        {/* GameCard */}
        <GameCard
          clues={currentQ.clues}
          options={currentQ.options}
          correctAnswer={currentQ.correct}
          fact={currentQ.fact}
          onGuess={handleGuess}
        />
  
        {/* Confetti */}
        {showConfetti && <Confetti />}
      </div>
    </div>
  );
}