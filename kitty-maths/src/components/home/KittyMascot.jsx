import { useState, useEffect } from 'react'

const MESSAGES = [
  "Welcome back, Kitty! Ready to be a maths superstar? ⭐",
  "Let's smash those times tables today! 💪",
  "Remember: every expert was once a beginner! 🌟",
  "Fractions are just pizza — yum! 🍕",
  "You got this, Kitty! Let's go! 🚀",
  "Joe loves maths — beat his score today! 😄",
  "Daddy says maths is like running — the more you practice, the faster you get!",
  "Nanna is very proud of you! Now let's do some percentages! 💯",
  "William scored goals with practice — you can score stars the same way! ⚽",
]

export default function KittyMascot({ message }) {
  const [displayMsg, setDisplayMsg] = useState(message || MESSAGES[0])
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    if (!message) {
      setDisplayMsg(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
    } else {
      setDisplayMsg(message)
    }
    setBounce(true)
    const t = setTimeout(() => setBounce(false), 600)
    return () => clearTimeout(t)
  }, [message])

  return (
    <div className="flex items-end gap-3 mb-6">
      {/* Mascot */}
      <div className={`text-6xl select-none transition-transform ${bounce ? 'animate-bounce' : ''}`}>
        🐱
      </div>
      {/* Speech bubble */}
      <div className="relative bg-white rounded-3xl rounded-bl-none shadow-md px-4 py-3 max-w-xs border-2 border-kitty-light">
        <p className="text-gray-700 text-sm font-medium">{displayMsg}</p>
        {/* Triangle */}
        <div className="absolute -bottom-2 left-0 w-4 h-4 bg-white border-b-2 border-l-2 border-kitty-light rotate-45 -translate-x-1" />
      </div>
    </div>
  )
}
