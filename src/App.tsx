import { MotionConfig } from 'motion/react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Architecture from './components/Architecture'
import Cursor from './components/Cursor'
import Work from './components/Work'
import Process from './components/Process'
import About from './components/About'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Architecture />
        <Work />
        <Process />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
