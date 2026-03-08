import { useEffect, useState } from 'react'

const CONFETTI_COLOURS = ['#FF69B4', '#FF1493', '#FFD700', '#DA70D6', '#FF6347', '#7FFFD4']

function Confetti() {
  const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1.5,
      dur: 1.5 + Math.random() * 2,
      color: CONFETTI_COLOURS[Math.floor(Math.random() * CONFETTI_COLOURS.length)],
      size: 6 + Math.random() * 10,
      rotate: Math.random() * 360,
    }))
  )

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute top-0 opacity-0"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            transform: `rotate(${p.rotate}deg)`,
            animation: `fallDown ${p.dur}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes fallDown {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default function QuizComplete({ result, topic, navigate }) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (result?.stars === 3) {
      setShowConfetti(true)
      const t = setTimeout(() => setShowConfetti(false), 4000)
      return () => clearTimeout(t)
    }
  }, [result])

  if (!result || !topic) {
    navigate('home')
    return null
  }

  const { score, stars, totalCorrect, total } = result
  const messages = [
    stars === 3 ? "🎉 AMAZING! Perfect performance, Kitty!" :
    stars === 2 ? "⭐ Great work! You're getting better every time!" :
    stars === 1 ? "Good effort! Let's try again and beat that score!" :
    "Don't worry — every practice makes you better! 💪",
  ]

  return (
    <div className="py-4 text-center">
      {showConfetti && <Confetti />}

      {/* Result card */}
      <div className="card mb-6">
        <div className="text-6xl mb-3">{stars === 3 ? '🏆' : stars === 2 ? '🥈' : stars === 1 ? '🥉' : '💪'}</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
        <p className="text-gray-500 text-sm mb-4">{topic.title}</p>

        {/* Score */}
        <div className="text-5xl font-bold text-kitty-hot mb-2">{score}%</div>
        <p className="text-gray-500 mb-4">{totalCorrect} out of {total} correct</p>

        {/* Stars */}
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3].map(s => (
            <span
              key={s}
              className={`text-4xl transition-all duration-500 ${s <= stars ? 'text-kitty-gold' : 'text-gray-200'}`}
              style={{ animationDelay: `${s * 0.3}s` }}
            >
              ★
            </span>
          ))}
        </div>

        <p className="text-gray-700 font-medium">{messages[0]}</p>
      </div>

      {/* Performance breakdown */}
      <div className="card mb-6 text-left">
        <h2 className="font-bold text-gray-700 mb-3">Your Performance</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Score</span>
            <span className="font-bold text-kitty-hot">{score}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Stars earned</span>
            <span className="font-bold">{'★'.repeat(stars)}{'☆'.repeat(3 - stars)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">SAT level</span>
            <span className={`font-bold text-sm ${score >= 85 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-orange-600'}`}>
              {score >= 85 ? 'Greater Depth 🌟' : score >= 60 ? 'Expected Standard ✅' : 'Working Towards 📈'}
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        <button onClick={() => navigate('quiz', { topic })} className="btn-pink w-full text-lg">
          🔄 Try Again
        </button>
        <button onClick={() => navigate('learn', { topic })} className="btn-outline w-full">
          📖 Revisit the Lesson
        </button>
        <button onClick={() => navigate('topics')} className="w-full text-kitty-pink text-sm underline">
          Back to Topics
        </button>
      </div>
    </div>
  )
}
