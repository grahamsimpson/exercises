import { TOPICS } from '../../data/topics'
import useStore from '../../store/useStore'

const CATEGORY_ORDER = ['number', 'reasoning', 'cat4']
const CATEGORY_LABELS = {
  number: '🔢 Number',
  reasoning: '🤔 Reasoning',
  cat4: '🧠 CAT4 Prep',
}

export default function TopicMap({ navigate }) {
  const { topicProgress } = useStore()

  const grouped = CATEGORY_ORDER.map(cat => ({
    cat,
    topics: TOPICS.filter(t => t.category === cat),
  }))

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">All Topics 📚</h1>
      <p className="text-gray-500 text-sm mb-5">Choose a topic to learn or practise!</p>

      {grouped.map(({ cat, topics }) => (
        <div key={cat} className="mb-6">
          <h2 className="text-lg font-bold text-kitty-hot mb-3">{CATEGORY_LABELS[cat]}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topics.map(topic => {
              const prog = topicProgress[topic.id]
              const stars = prog?.stars ?? 0
              const bestScore = prog?.bestScore ?? 0

              return (
                <div
                  key={topic.id}
                  className="topic-card"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`text-3xl bg-gradient-to-br ${topic.color} rounded-2xl w-12 h-12 flex items-center justify-center shadow`}>
                        {topic.emoji}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{topic.title}</h3>
                        <div className="flex">
                          {[1,2,3].map(s => (
                            <span key={s} className={`text-lg ${s <= stars ? 'text-kitty-gold' : 'text-gray-200'}`}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {bestScore > 0 && (
                      <span className="text-xs bg-kitty-pale text-kitty-hot font-bold px-2 py-1 rounded-full">{bestScore}%</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs mb-3">{topic.description}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate('learn', { topic })}
                      className="btn-outline flex-1 text-sm py-2 px-3"
                    >
                      📖 Learn
                    </button>
                    <button
                      onClick={() => navigate('quiz', { topic })}
                      className="btn-pink flex-1 text-sm py-2 px-3"
                    >
                      ⚡ Quiz
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
