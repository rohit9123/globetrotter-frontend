// src/pages/GamePage.jsx
import { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import Confetti from '../components/Confetti';
import Score from '../components/Score';
import ProgressBar from '../components/ProgressBar';
import GameOverModal from '../components/GameOverModal';
import GameHeader from '../components/GameHeader';
import axios from 'axios';

// Hardcoded questions (add 10 entries)


export default function GamePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const totalQuestions = questions.length;

  const handleGuess = (isCorrect) => {
    if (isCorrect) {
      setScore(prev => prev + 10);
      setCorrectAnswers(prev => prev + 1);
      setShowConfetti(true);
    } else {
      setIncorrectAnswers(prev => prev + 1);
    }
  
    // Move to next question after delay
    setTimeout(() => {
      setShowConfetti(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setGameOver(true);
      }
    }, 2000);
  };

  const getQuestions = async () => {
    try{
      const response = await axios.get('https://globerotter-backend.onrender.com/api/game/questions', {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setQuestions(response.data);
    }catch(error){
      console.error('Error fetching questions:', error);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setGameOver(false);
    setScore(0);
    getQuestions();
    setShowConfetti(false);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  if (currentQuestion >= questions.length) {
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

  const currentQ = questions[currentQuestion];

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
        <GameHeader score={score} totalQuestions={totalQuestions} currentQuestion={currentQuestion} correctAnswers={correctAnswers} incorrectAnswers={incorrectAnswers}/>
  
        {/* GameCard */}
        <GameCard
          id = {currentQ.id}
          clues={currentQ.clues}
          options={currentQ.options}
          onGuess={handleGuess}
        />
  
        {/* Confetti */}
        {showConfetti && <Confetti />}
      </div>
    </div>
  );
}