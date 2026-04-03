import { useState } from 'react'

export default function LearnPage({ topic, navigate }) {
  const [step, setStep] = useState(0)
  const [revealed, setRevealed] = useState(false)

  if (!topic) {
    navigate('topics')
    return null
  }

  const lessons = topic.lessons || []
  const currentLesson = lessons[step]
  const isLast = step === lessons.length - 1

  if (lessons.length === 0) {
    navigate('quiz', { topic })
    return null
  }

  function next() {
    if (isLast) {
      navigate('quiz', { topic })
    } else {
      setStep(s => s + 1)
      setRevealed(false)
    }
  }

  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => navigate('topics')}
          className="text-kitty-pink hover:text-kitty-hot text-2xl"
        >
          ←
        </button>
        <div className={`text-3xl bg-gradient-to-br ${topic.color} rounded-2xl w-11 h-11 flex items-center justify-center shadow`}>
          {topic.emoji}
        </div>
        <div>
          <h1 className="font-bold text-gray-800">{topic.title}</h1>
          <p className="text-xs text-gray-400">Lesson {step + 1} of {lessons.length}</p>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mb-5">
        {lessons.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all ${i <= step ? 'bg-kitty-pink' : 'bg-gray-200'}`}
          />
        ))}
      </div>

      {/* Lesson card */}
      <div className="card mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-3">{currentLesson.title}</h2>
        <p className="text-gray-600 leading-relaxed mb-4 whitespace-pre-line">{currentLesson.content}</p>

        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="btn-outline w-full"
          >
            👀 Show me an example!
          </button>
        ) : (
          <div className="bg-kitty-pale border-2 border-kitty-light rounded-2xl p-4">
            <p className="text-xs font-bold text-kitty-hot mb-2">WORKED EXAMPLE</p>
            <pre className="text-gray-700 font-mono text-sm whitespace-pre-wrap leading-relaxed">{currentLesson.example}</pre>
          </div>
        )}
      </div>

      {/* Kitty's Tip */}
      {currentLesson.kittyTip && (
        <div className="bg-gradient-to-r from-kitty-light to-pink-100 rounded-3xl p-4 mb-5 flex gap-3">
          <span className="text-2xl flex-shrink-0">💡</span>
          <div>
            <p className="text-xs font-bold text-kitty-hot mb-1">KITTY'S TIP</p>
            <p className="text-gray-700 text-sm">{currentLesson.kittyTip}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <button
        onClick={next}
        disabled={!revealed}
        className={`btn-pink w-full text-lg ${!revealed ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLast ? "⚡ I'm ready — Start Quiz!" : "Next Lesson →"}
      </button>

      <button
        onClick={() => navigate('quiz', { topic })}
        className="w-full text-center text-kitty-pink text-sm mt-3 underline"
      >
        Skip to quiz
      </button>
    </div>
  )
}
