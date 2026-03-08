import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const LEVEL_THRESHOLDS = [0, 50, 120, 220, 350, 520, 730, 990, 1300, 1700, 2200]
const LEVEL_TITLES = [
  'Maths Kitten', 'Maths Apprentice', 'Number Ninja', 'Star Solver',
  'Fraction Fighter', 'Decimal Dynamo', 'Algebra Ace', 'Geometry Guru',
  'SAT Superstar', 'Maths Queen', 'Maths Legend',
]

function calcLevel(xp) {
  let level = 0
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) { level = i; break }
  }
  return level
}

const BADGE_DEFINITIONS = [
  { id: 'first-answer', name: 'First Step!', emoji: '👣', desc: 'Answer your first question' },
  { id: 'first-correct', name: 'Got It!', emoji: '✅', desc: 'Get your first correct answer' },
  { id: 'quiz-complete', name: 'Quiz Finisher', emoji: '🏁', desc: 'Complete your first quiz' },
  { id: 'three-stars', name: 'Star Collector', emoji: '⭐', desc: 'Get 3 stars on any quiz' },
  { id: 'times-tables', name: 'Table Titan', emoji: '🗂️', desc: 'Complete Times Tables' },
  { id: 'fractions', name: 'Fraction Fiend', emoji: '🍕', desc: 'Complete Fractions' },
  { id: 'decimals', name: 'Decimal Dynamo', emoji: '🎯', desc: 'Complete Decimals' },
  { id: 'percentages', name: 'Percent Pro', emoji: '💯', desc: 'Complete Percentages' },
  { id: 'multiplication', name: 'Multiply Master', emoji: '✖️', desc: 'Complete Multiplication' },
  { id: 'division', name: 'Division Diva', emoji: '➗', desc: 'Complete Division' },
  { id: 'algebra', name: 'Algebra Ace', emoji: '🔢', desc: 'Complete Algebra' },
  { id: 'word-problems', name: 'Word Wizard', emoji: '📖', desc: 'Complete Word Problems' },
  { id: 'cat4-series', name: 'Pattern Pro', emoji: '🔮', desc: 'Complete Number Series (CAT4)' },
  { id: 'cat4-analogies', name: 'Analogy Ace', emoji: '🧠', desc: 'Complete Number Analogies (CAT4)' },
  { id: 'streak-3', name: '3-Day Streak', emoji: '🔥', desc: 'Play 3 days in a row' },
  { id: 'streak-7', name: 'Week Warrior', emoji: '🗓️', desc: 'Play 7 days in a row' },
  { id: 'xp-100', name: 'Century Club', emoji: '💫', desc: 'Earn 100 XP' },
  { id: 'xp-500', name: 'XP Explorer', emoji: '🚀', desc: 'Earn 500 XP' },
  { id: 'xp-1000', name: 'XP Master', emoji: '👑', desc: 'Earn 1000 XP' },
  { id: 'no-hints', name: 'No Peeking!', emoji: '🙈', desc: 'Complete a quiz without using hints' },
  { id: 'perfect-score', name: 'Perfect 10!', emoji: '💎', desc: 'Get 10/10 on any quiz' },
  { id: 'all-topics', name: 'Topic Titan', emoji: '🏆', desc: 'Complete all topics' },
  { id: 'sat-star', name: 'SAT Star', emoji: '🌟', desc: 'Complete a SAT mock paper' },
]

const useStore = create(
  persist(
    (set, get) => ({
      kittyXP: 0,
      level: 0,
      levelTitle: LEVEL_TITLES[0],
      streakDays: 0,
      lastPlayedDate: null,
      topicProgress: {},
      earnedBadges: [],
      dailyChallengeDate: null,
      dailyChallengeCompleted: false,

      addXP: (amount) => {
        set((s) => {
          const newXP = s.kittyXP + amount
          const newLevel = calcLevel(newXP)
          return { kittyXP: newXP, level: newLevel, levelTitle: LEVEL_TITLES[newLevel] }
        })
        get().checkXPBadges()
        get().updateStreak()
      },

      updateStreak: () => {
        const today = new Date().toDateString()
        set((s) => {
          if (s.lastPlayedDate === today) return {}
          const yesterday = new Date(Date.now() - 86400000).toDateString()
          const newStreak = s.lastPlayedDate === yesterday ? s.streakDays + 1 : 1
          const updates = { lastPlayedDate: today, streakDays: newStreak }
          if (newStreak >= 7) get().earnBadge('streak-7')
          else if (newStreak >= 3) get().earnBadge('streak-3')
          return updates
        })
      },

      updateTopicProgress: (topicId, stars, score, usedHints) => {
        set((s) => {
          const prev = s.topicProgress[topicId] || { stars: 0, bestScore: 0, attempts: 0, unlocked: true }
          return {
            topicProgress: {
              ...s.topicProgress,
              [topicId]: {
                stars: Math.max(prev.stars, stars),
                bestScore: Math.max(prev.bestScore, score),
                attempts: prev.attempts + 1,
                unlocked: true,
                completed: stars > 0,
              },
            },
          }
        })
        if (stars === 3) get().earnBadge('three-stars')
        if (score === 100) get().earnBadge('perfect-score')
        if (!usedHints) get().earnBadge('no-hints')
        get().earnBadge('quiz-complete')
        get().earnBadge(topicId)
        get().checkAllTopics()
      },

      earnBadge: (badgeId) => {
        set((s) => {
          if (s.earnedBadges.includes(badgeId)) return {}
          if (!BADGE_DEFINITIONS.find(b => b.id === badgeId)) return {}
          return { earnedBadges: [...s.earnedBadges, badgeId] }
        })
      },

      checkXPBadges: () => {
        const { kittyXP, earnBadge } = get()
        if (kittyXP >= 1000) earnBadge('xp-1000')
        else if (kittyXP >= 500) earnBadge('xp-500')
        else if (kittyXP >= 100) earnBadge('xp-100')
      },

      checkAllTopics: () => {
        const { topicProgress, earnBadge } = get()
        const coreTopics = ['times-tables', 'multiplication', 'division', 'fractions', 'decimals', 'percentages', 'algebra', 'word-problems']
        if (coreTopics.every(t => topicProgress[t]?.completed)) earnBadge('all-topics')
      },

      markFirstAnswer: () => get().earnBadge('first-answer'),
      markFirstCorrect: () => get().earnBadge('first-correct'),

      completeDailyChallenge: () => {
        const today = new Date().toDateString()
        set({ dailyChallengeDate: today, dailyChallengeCompleted: true })
      },

      isDailyChallengeAvailable: () => {
        const { dailyChallengeDate } = get()
        return dailyChallengeDate !== new Date().toDateString()
      },

      BADGE_DEFINITIONS,
      LEVEL_THRESHOLDS,
      LEVEL_TITLES,
    }),
    { name: 'kitty-maths-progress' }
  )
)

export default useStore
