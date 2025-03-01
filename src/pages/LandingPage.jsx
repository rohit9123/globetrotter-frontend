// src/pages/LandingPage.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiGlobe, FiPlay, FiShare2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';



export default function LandingPage() {

  const navigate = useNavigate();
  const isAuthenticated = useAuth().isAuthenticated;
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-8 bg-white px-6 py-3 rounded-full shadow-sm">
            <FiGlobe className="text-2xl text-blue-600" />
            <h1 className="text-3xl font-bold">Globetrotter Challenge</h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Test your travel knowledge with 10 cryptic destination puzzles. 
            Can you score 100/100 and outsmart your friends?
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2"
              onClick={() => isAuthenticated ? navigate('/play') : navigate('/signin')}
            >
              <FiPlay className="text-xl" />
              Play Now
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 shadow-sm border border-blue-100"
              onClick={() => navigate('/share')}
            >
              <FiShare2 className="text-xl" />
              Challenge Friends
            </motion.button>
          </div>

          {/* Animated Globe Illustration */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="mx-auto w-48 h-48 bg-[url('https://img.icons8.com/color/96/globe--v1.png')] bg-contain opacity-20"
          />
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 text-left mb-24">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="font-bold mb-3">🌍 100+ Destinations</h3>
            <p className="text-gray-600">From iconic landmarks to hidden gems</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="font-bold mb-3">🎮 2 Attempts Per Question</h3>
            <p className="text-gray-600">Strategic guessing allowed</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="font-bold mb-3">🏆 Live Leaderboards</h3>
            <p className="text-gray-600">Compete with friends globally</p>
          </div>
        </div>
      </div>

    </div>
  );
}