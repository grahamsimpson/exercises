import useStore from '../../store/useStore'

const LEVEL_THRESHOLDS = [0, 50, 120, 220, 350, 520, 730, 990, 1300, 1700, 2200]

export default function Header() {
  const { kittyXP, level, levelTitle, streakDays } = useStore()

  const currentThreshold = LEVEL_THRESHOLDS[level] ?? 0
  const nextThreshold = LEVEL_THRESHOLDS[level + 1] ?? currentThreshold + 100
  const xpIntoLevel = kittyXP - currentThreshold
  const xpNeeded = nextThreshold - currentThreshold
  const progress = Math.min(100, Math.round((xpIntoLevel / xpNeeded) * 100))

  return (
    <header className="bg-gradient-to-r from-kitty-hot to-kitty-purple shadow-lg sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Title */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-2xl">🐱</span>
          <div className="min-w-0">
            <h1 className="text-white font-bold text-lg leading-tight truncate">
              Kitty's Maths World
            </h1>
            <p className="text-pink-200 text-xs truncate">Level {level + 1} · {levelTitle}</p>
          </div>
        </div>

        {/* XP bar */}
        <div className="flex-1 max-w-40 hidden sm:block">
          <div className="flex justify-between text-xs text-pink-200 mb-1">
            <span>{kittyXP} XP</span>
            <span>{nextThreshold} XP</span>
          </div>
          <div className="h-2 bg-pink-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-kitty-gold rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1 bg-white/20 rounded-xl px-3 py-1">
          <span className="text-lg">🔥</span>
          <span className="text-white font-bold text-sm">{streakDays}</span>
        </div>
      </div>
    </header>
  )
}
