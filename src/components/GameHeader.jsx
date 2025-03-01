import Score from "./Score";

export default function GameHeader({ score, totalQuestions, currentQuestion }) {
  return (
    <div className="mb-6 space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">
            Q{currentQuestion + 1}
          </span>
          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
              }}
            />
          </div>
          <span className="text-sm text-gray-500">
            {totalQuestions - (currentQuestion + 1)} left
          </span>
        </div>
        <Score value={score} />
      </div>
    </div>
  );
}
