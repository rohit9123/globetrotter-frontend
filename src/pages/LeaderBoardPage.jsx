import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [sortBy, setSortBy] = useState('top-scores');
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeaderboard = async (sortType) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/leaderboard/${sortType}`);
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard(sortBy);
  }, [sortBy]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    selected: { background: 'linear-gradient(45deg, #3B82F6, #6366F1)' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Leaderboard
        </h1>

        {/* Sorting Buttons */}
        <motion.div className="flex flex-wrap gap-4 justify-center mb-8">
          {['top-scores', 'most-correct', 'most-wrong'].map((sortType) => (
            <motion.button
              key={sortType}
              variants={buttonVariants}
              initial={false}
              animate={sortBy === sortType ? 'selected' : ''}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setSortBy(sortType)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                sortBy === sortType
                  ? 'text-white'
                  : 'bg-white text-gray-600 shadow-md hover:shadow-lg'
              }`}
            >
              {sortType === 'top-scores' && '🏆 Most Score'}
              {sortType === 'most-correct' && '✅ Most Correct'}
              {sortType === 'most-wrong' && '❌ Most Wrong'}
            </motion.button>
          ))}
        </motion.div>

        {/* Leaderboard Table */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600">
            <h2 className="text-xl font-bold text-white">
              {sortBy === 'top-scores'
                ? 'Top Scores'
                : sortBy === 'most-correct'
                ? 'Most Correct Answers'
                : 'Most Wrong Answers'}
            </h2>
          </div>

          {isLoading ? (
            <div className="p-8 flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-gray-100"
            >
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50">
                <div className="col-span-1 font-semibold text-gray-600">Rank</div>
                <div className="col-span-8 font-semibold text-gray-600">Username</div>
                <div className="col-span-3 font-semibold text-gray-600 text-right">
                  {sortBy === 'top-scores'
                    ? 'Score'
                    : sortBy === 'most-correct'
                    ? 'Correct Answers'
                    : 'Wrong Answers'}
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {leaderboard.map((user, index) => (
                  <motion.div
                    key={user.userId}
                    variants={rowVariants}
                    className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="col-span-1 font-medium text-gray-700">{index + 1}</div>
                    <div className="col-span-8 flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-semibold">
                          {user.username[0].toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium">{user.username}</span>
                    </div>
                    <div className="col-span-3 text-right font-semibold">
                      {sortBy === 'top-scores'
                        ? user.score
                        : sortBy === 'most-correct'
                        ? user.correctAnswers
                        : user.wrongAnswers}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LeaderboardPage;