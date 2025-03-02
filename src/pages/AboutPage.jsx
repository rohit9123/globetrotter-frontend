export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 shadow-2xl rounded-2xl mt-10 
      animate-float-in">
      
      {/* Animated Title */}
      <h1 className="text-4xl font-bold text-center mb-6 relative group">
        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          🎮 About
        </span>
        <span className="absolute bottom-0 left-1/2 h-1 bg-blue-400 w-0 group-hover:w-32 transition-all duration-500 -translate-x-1/2"></span>
      </h1>

      {/* Floating Content Blocks */}
      <div className="space-y-8">
        {/* Intro Card */}
        <div className="animate-float-in delay-100 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow 
          hover:-translate-y-1 cursor-pointer">
          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to <span className="text-purple-600 font-bold animate-rubber-band">QuizMaster</span>, 
            where trivia meets excitement! 🌟 Challenge yourself across diverse categories, 
            battle friends, and conquer the leaderboards.
          </p>
        </div>

        {/* How to Play Section */}
        <div className="animate-float-in delay-200 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-transform 
          hover:rotate-1">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="animate-bounce">🚀</span> Game Rules
          </h2>
          <ul className="space-y-3 pl-4">
            {[
              "💡 Multiple-choice questions with time limits",
              "🏆 Earn bonus points for quick answers",
              "❌ No penalty for wrong guesses",
              "📈 Track progress with real-time stats"
            ].map((item, index) => (
              <li 
                key={index}
                className="flex items-center gap-2 text-gray-700 hover:translate-x-2 transition-transform"
              >
                <span className="text-xl">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits Section */}
        <div className="animate-float-in delay-300 bg-white p-6 rounded-xl shadow-md hover:shadow-lg 
          transition-all hover:scale-[1.01]">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="animate-spin-slow">🎯</span> Why Join?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: "🧠", text: "Boost cognitive skills" },
              { icon: "🌍", text: "Global player community" },
              { icon: "⚡", text: "Improve reaction time" },
              { icon: "🏅", text: "Earn achievements" }
            ].map((item, index) => (
              <div 
                key={index}
                className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center gap-3 
                  hover:from-blue-100 hover:to-purple-100 transition-colors"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-8 animate-pulse-slow">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full 
            shadow-lg hover:shadow-xl hover:scale-105 transition-all font-bold text-lg">
            Start Playing Now!
          </button>
        </div>
      </div>
    </div>
  );
}