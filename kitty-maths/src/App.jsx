import { useState } from 'react'
import Header from './components/layout/Header'
import NavBar from './components/layout/NavBar'
import HomePage from './components/home/HomePage'
import TopicMap from './components/topics/TopicMap'
import LearnPage from './components/learn/LearnPage'
import QuizPage from './components/quiz/QuizPage'
import QuizComplete from './components/quiz/QuizComplete'
import AchievementsPage from './components/achievements/AchievementsPage'

export default function App() {
  const [page, setPage] = useState('home')
  const [pageParams, setPageParams] = useState({})

  function navigate(to, params = {}) {
    setPage(to)
    setPageParams(params)
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-kitty-pale flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pb-24 pt-4">
        {page === 'home' && <HomePage navigate={navigate} />}
        {page === 'topics' && <TopicMap navigate={navigate} />}
        {page === 'learn' && <LearnPage topic={pageParams.topic} navigate={navigate} />}
        {page === 'quiz' && <QuizPage topic={pageParams.topic} navigate={navigate} />}
        {page === 'quiz-complete' && <QuizComplete result={pageParams.result} topic={pageParams.topic} navigate={navigate} />}
        {page === 'achievements' && <AchievementsPage />}
      </main>
      <NavBar page={page} navigate={navigate} />
    </div>
  )
}
