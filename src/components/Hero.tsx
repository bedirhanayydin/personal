import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { profile } from '../data/cv'
import { ArrowIcon, Magnetic } from './ui'

const words = ['mobile apps', 'websites', 'backends', 'APIs', 'admin panels', 'anything']
const ease = [0.22, 1, 0.36, 1] as const

function RotatingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2400)
    return () => clearInterval(t)
  }, [])

  return (
    <span className="relative block h-[1.05em] overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="text-gradient absolute inset-x-0 top-0 block whitespace-nowrap italic"
          initial={{ y: '100%', opacity: 0, filter: 'blur(10px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.7, ease }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Phone() {
  return (
    <div className="relative h-[440px] w-[215px] rounded-[2.6rem] border border-white/15 bg-[#0c0c14] p-2.5 shadow-[0_40px_80px_-20px_rgb(0_0_0/0.6)]">
      <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-gradient-to-b from-[#16162a] to-[#0d0d18]">
        <div className="absolute top-2 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
        <div className="px-4 pt-10 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] text-white/50">Good morning</p>
              <p className="font-display text-sm font-bold">Your App</p>
            </div>
            <div className="size-7 rounded-full bg-gradient-to-br from-violet to-cyan" />
          </div>
          <motion.div
            className="mt-4 rounded-2xl bg-gradient-to-br from-violet to-cyan p-3.5"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <p className="text-[9px] text-white/80">This week</p>
            <p className="font-display text-2xl font-bold">+128%</p>
            <div className="mt-2 flex h-8 items-end gap-1">
              {[40, 65, 35, 80, 55, 95, 70].map((h, i) => (
                <motion.span
                  key={i}
                  className="flex-1 rounded-sm bg-white/70"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 1.2 + i * 0.08, duration: 0.6, ease }}
                />
              ))}
            </div>
          </motion.div>
          <div className="mt-4 space-y-2.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2.5 rounded-xl bg-white/5 p-2.5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 + i * 0.12 }}
              >
                <span className={`size-7 rounded-lg ${['bg-lime', 'bg-violet', 'bg-cyan'][i]}`} />
                <span className="flex-1 space-y-1">
                  <span className="block h-1.5 w-3/4 rounded bg-white/30" />
                  <span className="block h-1.5 w-1/2 rounded bg-white/15" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute inset-x-3 bottom-3 flex justify-around rounded-2xl bg-white/5 py-2.5 backdrop-blur">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`size-1.5 rounded-full ${i === 0 ? 'bg-lime' : 'bg-white/30'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Browser() {
  return (
    <div className="w-[400px] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_80px_-30px_rgb(0_0_0/0.5)]">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 rounded-md bg-ink/5 px-3 py-1 font-mono text-[10px] text-muted">yourproduct.com</span>
      </div>
      <div className="p-5">
        <div className="h-3 w-2/3 rounded bg-ink/80" />
        <div className="mt-2 h-3 w-1/2 rounded bg-ink/20" />
        <div className="mt-4 flex gap-2">
          <span className="h-6 w-20 rounded-full bg-gradient-to-r from-violet to-cyan" />
          <span className="h-6 w-16 rounded-full border border-line" />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-20 rounded-xl border border-line bg-ink/[0.03] p-2"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1, duration: 0.6, ease }}
            >
              <span className={`block size-5 rounded-md ${['bg-violet/70', 'bg-cyan/70', 'bg-lime'][i]}`} />
              <span className="mt-3 block h-1.5 w-full rounded bg-ink/15" />
              <span className="mt-1.5 block h-1.5 w-2/3 rounded bg-ink/10" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Chip({ children, className, delay = 0 }: { children: ReactNode; className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.4 + delay, type: 'spring', stiffness: 260, damping: 18 }}
    >
      <div className="animate-float rounded-full border border-line bg-surface/80 px-3.5 py-2 font-mono text-xs font-medium shadow-lg backdrop-blur" style={{ animationDelay: `${delay * 2}s` }}>
        {children}
      </div>
    </motion.div>
  )
}

function Devices() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 20 })
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 20 })

  useEffect(() => {
    const move = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [mx, my])

  return (
    <motion.div
      className="relative h-[500px] w-[480px] shrink-0 origin-top scale-[0.68] [perspective:1200px] sm:scale-90 lg:scale-100"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease, delay: 0.5 }}
    >
      <motion.div className="relative h-full w-full [transform-style:preserve-3d]" style={{ rotateX, rotateY }}>
        <div className="absolute top-6 left-0 [transform:translateZ(-40px)_rotate(-4deg)]">
          <Browser />
        </div>
        <div className="absolute top-12 right-4 [transform:translateZ(60px)_rotate(5deg)]">
          <Phone />
        </div>
        <motion.div
          className="absolute bottom-6 -left-2 w-64 rounded-2xl border border-white/10 bg-[#0c0c14]/95 p-4 font-mono text-[11px] text-white/80 shadow-2xl [transform:translateZ(80px)_rotate(-2deg)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease }}
        >
          <p>
            <span className="text-cyan">GET</span> /api/orders
          </p>
          <p className="mt-1.5 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-lime" />
            <span className="text-lime">200 OK</span>
            <span className="text-white/40">· 48ms</span>
          </p>
          <p className="mt-2 text-white/50">
            {'{ '}
            <span className="text-violet">"status"</span>: <span className="text-white/80">"shipped"</span>
            {' }'}
          </p>
        </motion.div>
        <Chip className="top-0 right-0">Flutter</Chip>
        <Chip className="-top-2 left-10" delay={0.2}>
          React · Next.js
        </Chip>
        <Chip className="bottom-[10.5rem] left-24" delay={0.3}>
          .NET
        </Chip>
        <Chip className="right-6 bottom-0" delay={0.4}>
          <span className="text-muted">iOS · Android · Huawei</span>
        </Chip>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const sx = useMotionValue(-1000)
  const sy = useMotionValue(-1000)

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:min-h-svh"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        sx.set(e.clientX - r.left)
        sy.set(e.clientY - r.top)
      }}
    >
      {/* aurora */}
      <div className="pointer-events-none absolute inset-0" style={{ opacity: 'var(--blob-opacity)' }} aria-hidden>
        <div className="animate-blob absolute -top-60 -left-60 size-[56rem] rounded-full bg-[radial-gradient(circle,var(--violet),transparent_62%)]" />
        <div className="animate-blob absolute -top-20 -right-60 size-[52rem] rounded-full bg-[radial-gradient(circle,var(--cyan),transparent_62%)] [animation-delay:-6s]" />
        <div className="animate-blob absolute -bottom-72 left-1/4 size-[44rem] rounded-full bg-[radial-gradient(circle,rgb(212_255_58/0.6),transparent_62%)] [animation-delay:-12s]" />
      </div>
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <motion.div
        className="pointer-events-none absolute size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--spot),transparent_60%)]"
        style={{ left: sx, top: sy }}
        aria-hidden
      />

      <motion.div style={{ y, opacity }} className="relative mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pr-4 pl-1.5 text-xs font-medium backdrop-blur"
          >
            <span className="rounded-full bg-lime px-2 py-0.5 font-mono text-[10px] font-bold text-[#0b0b10] uppercase">Open</span>
            Taking new freelance projects
          </motion.p>

          <h1 className="font-display text-[clamp(3.2rem,8.5vw,7rem)] leading-[0.95] font-extrabold tracking-[-0.045em]">
            {['I build', null, 'end to end.'].map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease, delay: 0.15 + i * 0.12 }}
                >
                  {line ?? <RotatingWord />}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.6 }}
            className="mt-8 max-w-lg text-lg leading-relaxed text-muted sm:text-xl"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-7 py-4 font-semibold text-bg"
              >
                <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-violet to-cyan transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative">Start a project</span>
                <ArrowIcon className="relative size-4 transition group-hover:rotate-45" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#work" className="inline-flex items-center rounded-full border border-line bg-surface/50 px-7 py-4 font-semibold backdrop-blur transition hover:border-ink/30">
                See my work
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <div className="-mb-40 flex justify-center sm:-mb-12 lg:mb-0">
          <Devices />
        </div>
      </motion.div>

      <motion.a
        href="#services"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="flex h-11 w-7 justify-center rounded-full border border-line pt-2">
          <motion.span className="size-1.5 rounded-full bg-ink" animate={{ y: [0, 14, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
        </span>
      </motion.a>
    </section>
  )
}
