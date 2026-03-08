import useStore from '../../store/useStore'

export default function AchievementsPage() {
  const { earnedBadges, BADGE_DEFINITIONS, kittyXP, level, levelTitle, streakDays } = useStore()

  const earned = earnedBadges.length
  const total = BADGE_DEFINITIONS.length

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Kitty's Badges 🏅</h1>
      <p className="text-gray-500 text-sm mb-2">{earned} of {total} badges earned</p>

      {/* Progress bar */}
      <div className="h-3 bg-gray-200 rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-kitty-pink to-kitty-gold rounded-full transition-all duration-500"
          style={{ width: `${(earned / total) * 100}%` }}
        />
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-kitty-hot">{kittyXP}</div>
          <div className="text-xs text-gray-400 mt-0.5">XP</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-kitty-hot">Lv{level + 1}</div>
          <div className="text-xs text-gray-400 mt-0.5">{levelTitle}</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-kitty-hot">{streakDays}🔥</div>
          <div className="text-xs text-gray-400 mt-0.5">Streak</div>
        </div>
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {BADGE_DEFINITIONS.map(badge => {
          const isEarned = earnedBadges.includes(badge.id)
          return (
            <div
              key={badge.id}
              className={`card text-center p-3 transition-all ${
                isEarned
                  ? 'border-2 border-kitty-gold shadow-lg'
                  : 'opacity-40 grayscale'
              }`}
              style={isEarned ? { boxShadow: '0 0 12px rgba(255,215,0,0.4)' } : {}}
            >
              <div className="text-3xl mb-1">{badge.emoji}</div>
              <div className={`text-xs font-bold leading-tight ${isEarned ? 'text-gray-800' : 'text-gray-400'}`}>
                {badge.name}
              </div>
              {isEarned && (
                <div className="text-xs text-kitty-pink mt-1">Earned! ✅</div>
              )}
            </div>
          )
        })}
      </div>

      {/* Badge descriptions on hover hint */}
      <p className="text-center text-gray-400 text-xs mt-4">Keep practising to unlock more badges!</p>
    </div>
  )
}
