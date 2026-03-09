import { useRef, useState } from 'react'
import useStore from '../../store/useStore'

export default function AchievementsPage() {
  const { earnedBadges, BADGE_DEFINITIONS, kittyXP, level, levelTitle, streakDays, exportProgress, importProgress } = useStore()
  const fileInputRef = useRef(null)
  const [importStatus, setImportStatus] = useState(null)

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

      {/* Save / Load progress */}
      <div className="card mt-6 p-4">
        <h2 className="text-sm font-bold text-gray-700 mb-1">Transfer Progress</h2>
        <p className="text-xs text-gray-400 mb-3">Save your progress to a file, then load it on another device (e.g. school Chromebook).</p>
        <div className="flex gap-3">
          <button
            onClick={exportProgress}
            className="flex-1 bg-kitty-pink text-white text-sm font-bold py-2 rounded-xl hover:opacity-90 active:scale-95 transition-all"
          >
            💾 Save Progress
          </button>
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex-1 bg-kitty-hot text-white text-sm font-bold py-2 rounded-xl hover:opacity-90 active:scale-95 transition-all"
          >
            📂 Load Progress
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files[0]
            if (!file) return
            try {
              await importProgress(file)
              setImportStatus('success')
            } catch {
              setImportStatus('error')
            }
            e.target.value = ''
            setTimeout(() => setImportStatus(null), 3000)
          }}
        />
        {importStatus === 'success' && <p className="text-green-600 text-xs text-center mt-2 font-bold">Progress loaded successfully!</p>}
        {importStatus === 'error' && <p className="text-red-500 text-xs text-center mt-2 font-bold">Oops! That file didn't work. Try again.</p>}
      </div>
    </div>
  )
}
