// src/pages/SharePage.jsx
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FiCopy, FiShare2, FiTwitter, FiFacebook } from 'react-icons/fi';

export default function SharePage() {
  const { userId } = useParams();
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  // Get score from navigation state
  const score = location.state?.score || 0;
  const totalQuestions = 10;

  // Share link
  const shareLink = `${window.location.origin}/challenge/${userId}`;
  const shareText = `I scored ${score} points in Globetrotter! Can you beat me? 🌍`;

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Social sharing
  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareLink)}`,
      '_blank'
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-4">Your Results</h1>
        <p className="text-gray-600 mb-8">
          Challenge your friends to beat your score!
        </p>

        {/* Score Card */}
        <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
          <div className="text-6xl font-bold text-blue-600 mb-4">
            {score}
          </div>
          <div className="text-gray-600">
            out of {totalQuestions * 10} points
          </div>
        </div>

        {/* Share Options */}
        <div className="space-y-4">
          {/* Copy Link */}
          <div className="relative">
            <input
              value={shareLink}
              readOnly
              className="w-full p-3 bg-gray-100 rounded-lg pr-16"
            />
            <button
              onClick={handleCopy}
              className="absolute right-2 top-2 bg-white px-4 py-1.5 rounded-md text-sm border flex items-center gap-2"
            >
              {copied ? 'Copied!' : <FiCopy />}
            </button>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={shareOnTwitter}
              className="p-3 bg-[#1DA1F2] text-white rounded-full hover:bg-[#1a8cd8] transition-colors"
            >
              <FiTwitter className="text-xl" />
            </button>
            <button
              onClick={shareOnFacebook}
              className="p-3 bg-[#1877F2] text-white rounded-full hover:bg-[#166fe5] transition-colors"
            >
              <FiFacebook className="text-xl" />
            </button>
          </div>
        </div>

        {/* Progress Visualization */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-4">Your Progress</h3>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${(score / (totalQuestions * 10)) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}