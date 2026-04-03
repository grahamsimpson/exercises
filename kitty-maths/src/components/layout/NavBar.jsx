const NAV = [
  { key: 'home', label: 'Home', emoji: '🏠' },
  { key: 'topics', label: 'Topics', emoji: '📚' },
  { key: 'achievements', label: 'Badges', emoji: '🏅' },
]

export default function NavBar({ page, navigate }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-kitty-light shadow-lg z-50">
      <div className="max-w-4xl mx-auto flex justify-around py-2">
        {NAV.map(({ key, label, emoji }) => {
          const active = page === key || (key === 'topics' && ['learn', 'quiz', 'quiz-complete'].includes(page))
          return (
            <button
              key={key}
              onClick={() => navigate(key)}
              className={`flex flex-col items-center gap-0.5 px-6 py-1 rounded-2xl transition-all ${
                active
                  ? 'bg-kitty-pale text-kitty-hot font-bold'
                  : 'text-gray-400 hover:text-kitty-pink'
              }`}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-xs">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
