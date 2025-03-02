import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";
import { SparklesIcon, BookOpenIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function UserProfile() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    
    async function fetchProfile() {
      try {
        const response = await axios.get("http://localhost:5000/api/user/", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          }
        });
        setProfileData(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError("Failed to load profile data");
          console.error("Error fetching profile data:", error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-6 bg-red-50 text-red-700 rounded-lg shadow-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl"
    >
      {/* Profile Header */}
      <div className="flex items-center space-x-6 mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {user?.username[0].toUpperCase()}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 shadow-md">
            <SparklesIcon className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800">{user?.username}</h2>
          <p className="text-blue-600 font-medium">Level {profileData.level || 1}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          icon={<BookOpenIcon className="w-8 h-8" />}
          title="Questions Attempted"
          value={profileData.questionsAttempted}
          color="bg-blue-100"
        />

        <StatCard
          icon={<CheckCircleIcon className="w-8 h-8" />}
          title="Correct Answers"
          value={profileData.correctAnswers}
          color="bg-green-100"
        />

        <StatCard
          icon={<XCircleIcon className="w-8 h-8" />}
          title="Wrong Answers"
          value={profileData.wrongAnswers}
          color="bg-red-100"
        />

        <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Total Score</h3>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">{profileData.score}</span>
            <SparklesIcon className="w-10 h-10 text-yellow-300" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">correct answer ratio</span>
          <span className="text-sm font-medium">
            {((profileData.correctAnswers / profileData.questionsAttempted) * 100 || 0).toFixed(1)}%
          </span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(profileData.correctAnswers / profileData.questionsAttempted) * 100 || 0}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-gradient-to-r from-green-400 to-blue-500"
          />
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon, title, value, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-6 ${color} rounded-xl flex items-center space-x-4 shadow-md`}
    >
      <div className="p-3 bg-white rounded-lg shadow-sm">{icon}</div>
      <div>
        <h3 className="text-gray-600 font-medium">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </motion.div>
  );
}