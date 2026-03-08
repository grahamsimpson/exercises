import { useState, useEffect, useCallback } from 'react'
import { selectQuestions } from '../../data/topics'
import useStore from '../../store/useStore'

const QUIZ_SIZE = 10

function normalise(s) {
  return String(s).trim().toLowerCase().replace(/^£/, '').replace(/\s+/g, '')
}

export default function QuizPage({ topic, navigate }) {
  const { addXP, markFirstAnswer, markFirstCorrect, updateTopicProgress } = useStore()

  const [questions] = useState(() => selectQuestions(topic, QUIZ_SIZE))
  const [qIndex, setQIndex] = useState(0)
  const [inputVal, setInputVal] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [results, setResults] = useState([])
  const [usedHint, setUsedHint] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [anyHintUsed, setAnyHintUsed] = useState(false)
  const [timedMode, setTimedMode] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)

  const q = questions[qIndex]

  // Timer
  useEffect(() => {
    if (!timedMode || submitted) return
    if (timeLeft <= 0) {
      handleSubmit(true)
      return
    }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(t)
  }, [timedMode, submitted, timeLeft])

  // Reset timer on new question
  useEffect(() => {
    setTimeLeft(30)
    setInputVal('')
    setSelectedOption(null)
    setSubmitted(false)
    setShowHint(false)
    setUsedHint(false)
    setIsCorrect(false)
  }, [qIndex])

  const handleSubmit = useCallback((timeout = false) => {
    markFirstAnswer()
    const answer = q.type === 'multiChoice' ? selectedOption : inputVal
    const correct = !timeout && q.acceptedAnswers.some(a => normalise(a) === normalise(answer))
    setIsCorrect(correct)
    setSubmitted(true)

    if (correct) {
      markFirstCorrect()
      const xp = 10 + (usedHint ? 0 : 5)
      addXP(xp)
    }

    setResults(r => [...r, { correct, usedHint }])
  }, [q, selectedOption, inputVal, usedHint, markFirstAnswer, markFirstCorrect, addXP])

  function handleNext() {
    if (qIndex < questions.length - 1) {
      setQIndex(i => i + 1)
    } else {
      // Quiz finished
      const correct = results.filter(r => r.correct).length + (isCorrect ? 0 : 0)
      const finalResults = [...results]
      const totalCorrect = finalResults.filter(r => r.correct).length
      const score = Math.round((totalCorrect / questions.length) * 100)
      const stars = score >= 85 ? 3 : score >= 60 ? 2 : score > 0 ? 1 : 0
      if (stars > 0) addXP(20 * stars)
      updateTopicProgress(topic.id, stars, score, anyHintUsed)
      navigate('quiz-complete', {
        result: { score, stars, totalCorrect, total: questions.length },
        topic,
      })
    }
  }

  if (!topic || !q) return null

  const canSubmit = q.type === 'multiChoice' ? selectedOption !== null : inputVal.trim() !== ''

  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('topics')} className="text-kitty-pink text-xl">←</button>
          <span className="text-2xl">{topic.emoji}</span>
          <span className="font-bold text-gray-700">{topic.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTimedMode(m => !m)}
            className={`text-xs px-3 py-1 rounded-full border-2 font-bold transition-all ${timedMode ? 'bg-kitty-hot text-white border-kitty-hot' : 'border-kitty-light text-gray-400'}`}
          >
            ⏱ Timed
          </button>
          <span className="text-sm text-gray-500">{qIndex + 1}/{questions.length}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-200 rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-kitty-pink to-kitty-hot rounded-full transition-all duration-300"
          style={{ width: `${((qIndex) / questions.length) * 100}%` }}
        />
      </div>

      {/* Timer bar */}
      {timedMode && !submitted && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Time left</span>
            <span className={timeLeft <= 5 ? 'text-red-500 font-bold' : ''}>{timeLeft}s</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${timeLeft <= 5 ? 'bg-red-500' : 'bg-kitty-pink'}`}
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Difficulty badge */}
      <div className="mb-3">
        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
          q.difficulty === 1 ? 'bg-green-100 text-green-700' :
          q.difficulty === 2 ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {q.difficulty === 1 ? '⭐ Foundation' : q.difficulty === 2 ? '⭐⭐ Expected' : '⭐⭐⭐ Challenge'}
        </span>
      </div>

      {/* Question */}
      <div className="card mb-4">
        <p className="text-gray-800 text-lg font-medium leading-relaxed">{q.stem}</p>
      </div>

      {/* Answer area */}
      {!submitted && (
        <div className="mb-4">
          {q.type === 'multiChoice' ? (
            <div className="grid grid-cols-1 gap-2">
              {q.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => setSelectedOption(opt)}
                  className={`text-left p-4 rounded-2xl border-2 font-medium transition-all ${
                    selectedOption === opt
                      ? 'border-kitty-pink bg-kitty-pale text-kitty-hot'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-kitty-light'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && canSubmit && handleSubmit()}
                placeholder="Type your answer..."
                autoFocus
                className="flex-1 border-2 border-kitty-light rounded-2xl px-4 py-3 text-lg outline-none focus:border-kitty-pink transition-all"
              />
            </div>
          )}
        </div>
      )}

      {/* Hint */}
      {!submitted && (
        <div className="mb-4">
          {!showHint ? (
            <button
              onClick={() => { setShowHint(true); setUsedHint(true); setAnyHintUsed(true) }}
              className="text-kitty-pink text-sm underline"
            >
              💡 Need a hint? (costs 5 XP bonus)
            </button>
          ) : (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-3 text-sm text-gray-700">
              <span className="font-bold text-yellow-700">Hint: </span>{q.hint}
            </div>
          )}
        </div>
      )}

      {/* Submit button */}
      {!submitted && (
        <button
          onClick={() => handleSubmit()}
          disabled={!canSubmit}
          className={`btn-pink w-full text-lg ${!canSubmit ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          Check Answer ✓
        </button>
      )}

      {/* Feedback */}
      {submitted && (
        <div className={`card mb-4 border-2 animate-pop ${isCorrect ? 'border-green-400 bg-green-50' : 'border-red-300 bg-red-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">{isCorrect ? '🎉' : '❌'}</span>
            <span className={`font-bold text-lg ${isCorrect ? 'text-green-700' : 'text-red-600'}`}>
              {isCorrect ? 'Correct! Well done Kitty!' : `Not quite — the answer is ${q.answer}`}
            </span>
          </div>
          <p className="text-gray-600 text-sm">{q.explanation}</p>
          {isCorrect && !usedHint && (
            <p className="text-green-600 text-xs mt-1 font-bold">+15 XP (10 correct + 5 no hint bonus!) ⭐</p>
          )}
          {isCorrect && usedHint && (
            <p className="text-green-600 text-xs mt-1 font-bold">+10 XP ⭐</p>
          )}
        </div>
      )}

      {submitted && (
        <button onClick={handleNext} className="btn-pink w-full text-lg">
          {qIndex < questions.length - 1 ? 'Next Question →' : '🏁 See Results!'}
        </button>
      )}
    </div>
  )
}
