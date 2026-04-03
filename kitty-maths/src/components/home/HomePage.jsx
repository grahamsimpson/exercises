import useStore from '../../store/useStore'
import KittyMascot from './KittyMascot'
import { TOPICS } from '../../data/topics'

const CATEGORY_LABELS = {
  number: 'Number',
  reasoning: 'Reasoning',
  cat4: 'CAT4 Prep 🧠',
}

export default function HomePage({ navigate }) {
  const { kittyXP, level, levelTitle, topicProgress, earnedBadges } = useStore()
  const completedTopics = Object.values(topicProgress).filter(t => t.completed).length
  const totalTopics = TOPICS.length

  return (
    <div className="py-4">
      <KittyMascot />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-kitty-hot">{kittyXP}</div>
          <div className="text-xs text-gray-500 mt-1">Total XP</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-kitty-hot">{completedTopics}/{totalTopics}</div>
          <div className="text-xs text-gray-500 mt-1">Topics Done</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-kitty-hot">{earnedBadges.length}</div>
          <div className="text-xs text-gray-500 mt-1">Badges</div>
        </div>
      </div>

      {/* Level card */}
      <div className="bg-gradient-to-r from-kitty-hot to-kitty-purple rounded-3xl p-5 mb-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-pink-200 text-sm">Current Level</p>
            <h2 className="text-2xl font-bold">Level {level + 1} — {levelTitle}</h2>
          </div>
          <span className="text-5xl">👑</span>
        </div>
      </div>

      {/* Quick start */}
      <h2 className="text-xl font-bold text-gray-800 mb-3">Jump back in 🚀</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {TOPICS.slice(0, 4).map(topic => {
          const prog = topicProgress[topic.id]
          return (
            <button
              key={topic.id}
              onClick={() => navigate('learn', { topic })}
              className={`bg-gradient-to-br ${topic.color} rounded-3xl p-4 text-white text-left shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 active:scale-95`}
            >
              <div className="text-3xl mb-2">{topic.emoji}</div>
              <div className="font-bold text-sm">{topic.title}</div>
              {prog && (
                <div className="flex mt-1">
                  {[1,2,3].map(s => (
                    <span key={s} className={`text-sm ${s <= prog.stars ? 'text-yellow-300' : 'text-white/40'}`}>★</span>
                  ))}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* See all topics */}
      <button
        onClick={() => navigate('topics')}
        className="btn-pink w-full text-center"
      >
        📚 See All Topics
      </button>
    </div>
  )
}
