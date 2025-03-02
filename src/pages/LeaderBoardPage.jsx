export default function Leaderboard() {
  const leaders = [
    { username: "Rohit", score: 1200 },
    { username: "Amit", score: 1150 },
    { username: "mahak", score: 1100 },
    { username: "Rahul", score: 1050 },
    { username: "Sneha", score: 1020 },
    { username: "gupta", score: 1000 },
    { username: "sona", score: 950 },
    { username: "kumar", score: 900 },
    { username: "gandu", score: 890 },
    { username: "Amit", score: 850 },
  ];

  return (
    <div className="mt-8 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto animate-fade-in">
        <h2 className="text-xl font-bold text-center py-3 text-blue-600 animate-pulse">
          🏆 Top 10
        </h2>
        <ul className="space-y-1 px-4 pb-4">
          {leaders.map((user, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-2 rounded-lg
                transition-all duration-300 hover:scale-[1.02] hover:shadow-sm
                ${
                  index === 0 ? "bg-yellow-50" :
                  index === 1 ? "bg-gray-100" :
                  index === 2 ? "bg-amber-50" : "bg-gray-50"
                }
                animate-slide-in-right delay-${index + 1}00`}
            >
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium
                  ${index === 0 ? "text-yellow-600" : 
                     index === 1 ? "text-gray-600" : 
                     index === 2 ? "text-amber-600" : "text-gray-600"}`}>
                  {index + 1}.
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {user.username}
                  {index < 3 && (
                    <span className="ml-1 text-xs">
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                    </span>
                  )}
                </span>
              </div>
              <span className="text-sm font-semibold text-blue-600">
                {user.score}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}