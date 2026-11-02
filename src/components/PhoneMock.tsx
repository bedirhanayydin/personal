import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const

const notifications = [
  { icon: '🛍️', title: 'New order #1042', body: '2 items · ₺1.240' },
  { icon: '🚀', title: 'v2.4.0 is live', body: 'App Store · Google Play' },
  { icon: '🔔', title: 'Push delivered', body: 'Sent to 12.4k users' },
  { icon: '💬', title: 'New message', body: '“Can we add dark mode?”' },
]

function randomBars() {
  return Array.from({ length: 7 }, () => 25 + Math.round(Math.random() * 75))
}

export default function PhoneMock() {
  const [bars, setBars] = useState([40, 65, 35, 80, 55, 95, 70])
  const [toast, setToast] = useState(-1)

  useEffect(() => {
    const chart = setInterval(() => setBars(randomBars()), 2200)
    let n = 0
    let t: ReturnType<typeof setTimeout>
    const loop = () => {
      setToast(n++ % notifications.length)
      t = setTimeout(() => {
        setToast(-1)
        t = setTimeout(loop, 1600)
      }, 2600)
    }
    t = setTimeout(loop, 2200)
    return () => {
      clearInterval(chart)
      clearTimeout(t)
    }
  }, [])

  const active = toast >= 0 ? notifications[toast] : null

  return (
    <div className="relative h-[440px] w-[215px] rounded-[2.6rem] border border-white/15 bg-[#0c0c14] p-2.5 shadow-[0_40px_80px_-20px_rgb(0_0_0/0.6)]">
      <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-gradient-to-b from-[#16162a] to-[#0d0d18]">
        {/* dynamic island grows into the notification */}
        <motion.div
          className="absolute top-2 left-1/2 z-10 -translate-x-1/2 overflow-hidden bg-black text-white"
          style={{ borderRadius: 18 }}
          animate={{ width: active ? 186 : 80, height: active ? 46 : 20 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        >
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.title}
                className="flex h-full items-center gap-2.5 px-3"
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)', transition: { delay: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10 text-sm">{active.icon}</span>
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-[10px] font-semibold">{active.title}</span>
                  <span className="block truncate text-[9px] text-white/55">{active.body}</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="px-4 pt-10 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] text-white/50">Good morning</p>
              <p className="font-display text-sm font-bold">Your App</p>
            </div>
            <div className="size-7 rounded-full bg-gradient-to-br from-violet to-cyan" />
          </div>
          <div className="mt-4 rounded-2xl bg-gradient-to-br from-violet to-cyan p-3.5">
            <p className="text-[9px] text-white/80">This week</p>
            <p className="font-display text-2xl font-bold">+128%</p>
            <div className="mt-2 flex h-8 items-end gap-1">
              {bars.map((h, i) => (
                <motion.span
                  key={i}
                  className="flex-1 rounded-sm bg-white/70"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 0.8, ease }}
                />
              ))}
            </div>
          </div>
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
