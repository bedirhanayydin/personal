import { useEffect, useState, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import Logo from './Logo'

const links = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' },
]

function currentTheme(): 'light' | 'dark' {
  const set = document.documentElement.dataset.theme
  if (set === 'light' || set === 'dark') return set
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function ThemeToggle() {
  // Prerendered as dark; the real theme is read once we're in the browser
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  useEffect(() => setTheme(currentTheme()), [])

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const apply = () => {
      document.documentElement.dataset.theme = next
      flushSync(() => setTheme(next))
    }
    try {
      localStorage.setItem('theme', next)
    } catch {
      // storage unavailable; theme still applies for this visit
    }

    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      apply()
      return
    }
    // Grow the new theme out of the button as a circle
    const r = e.currentTarget.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const radius = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy))
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${radius}px at ${cx}px ${cy}px)`] },
        { duration: 700, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="grid size-10 place-items-center overflow-hidden rounded-full border border-line text-muted transition hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.svg
          key={theme}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="size-4"
          aria-hidden
          initial={{ y: 20, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -20, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {theme === 'dark' ? (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
            </>
          ) : (
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" strokeLinejoin="round" />
          )}
        </motion.svg>
      </AnimatePresence>
    </button>
  )
}

export default function Nav() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ;['top', ...links.map((l) => l.id), 'contact'].forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-violet via-cyan to-lime"
        style={{ scaleX: progress }}
      />

      <header className="animate-drop fixed inset-x-0 top-4 z-50 px-4">
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between rounded-full border border-line bg-bg/70 py-2 pr-2 pl-3 shadow-[0_10px_40px_-15px_rgb(0_0_0/0.4)] backdrop-blur-xl">
          <Logo />

          <ul className="hidden items-center gap-1 md:flex">
            {links.map(({ id, label }) => (
              <li key={id} className="relative">
                {active === id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-ink/[0.07]" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <a href={`#${id}`} className={`relative block rounded-full px-4 py-2 text-sm font-medium transition ${active === id ? 'text-ink' : 'text-muted hover:text-ink'}`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg transition hover:scale-[1.04] sm:block"
            >
              Let’s talk
            </a>
            <button
              className="grid size-10 place-items-center rounded-full border border-line md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4" aria-hidden>
                {open ? <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" /> : <path d="M4 9h16M4 15h16" strokeLinecap="round" />}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg/95 px-6 backdrop-blur-xl md:hidden"
            initial={{ clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul>
              {[...links, { id: 'contact', label: 'Contact' }].map(({ id, label }, i) => (
                <motion.li key={id} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.06 }}>
                  <a href={`#${id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-3 font-display text-5xl font-bold tracking-tight">
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
