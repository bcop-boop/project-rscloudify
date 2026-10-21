import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Cursor from './components/Cursor'
import WhatsAppButton from './components/WhatsAppButton'
import FloatingObjects from './components/FloatingObjects'
import Preloader from './components/Preloader'
import { ReadyContext } from './lib/ready'
import { initSmoothScroll, lockScroll, scrollToTop } from './lib/scroll'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetails from './pages/ServiceDetails'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import Team from './pages/Team'
import TeamDetails from './pages/TeamDetails'
import TestimonialsPage from './pages/TestimonialsPage'
import FaqPage from './pages/FaqPage'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initSmoothScroll()
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => { lockScroll(!ready) }, [ready])

  const finishLoading = useCallback(() => setReady(true), [])

  return (
    <ReadyContext.Provider value={ready}>
      <div className="noise">
        <Cursor />
        <FloatingObjects />
        <AnimatePresence>{!ready && <Preloader key="preloader" onDone={finishLoading} />}</AnimatePresence>
        <Header />
        <WhatsAppButton />
        {/* Old page exits under the curtain → scroll resets → new page enters */}
        <AnimatePresence mode="wait" onExitComplete={() => scrollToTop()}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetails />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team/:slug" element={<TeamDetails />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </div>
    </ReadyContext.Provider>
  )
}
