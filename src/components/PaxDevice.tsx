import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const items = [
  { name: 'Leather tote bag', sku: '8690 4512 0097', stock: 12, price: '₺12.450' },
  { name: 'Silk scarf', sku: '8690 4519 3310', stock: 4, price: '₺4.950' },
  { name: 'Suede loafers · 42', sku: '8690 4508 7721', stock: 7, price: '₺8.990' },
]

type Step = 'scanning' | 'found' | 'printing' | 'printed' | 'paying' | 'approved'

// Barcode bars: [x, width] pairs, laid out once so it reads like a real EAN
const bars = (() => {
  const widths = [2, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 2, 1, 1, 3, 1, 1, 2, 1, 2, 1, 3, 1, 1]
  const out: [number, number][] = []
  let x = 0
  widths.forEach((w, i) => {
    if (i % 2 === 0) out.push([x, w])
    x += w + (i % 3 === 0 ? 1 : 0.6)
  })
  return { rects: out, width: x }
})()

function Barcode() {
  return (
    <svg viewBox={`0 0 ${bars.width} 30`} className="h-full w-full" preserveAspectRatio="none" aria-hidden>
      {bars.rects.map(([x, w]) => (
        <rect key={x} x={x} y="0" width={w} height="30" fill="#111827" />
      ))}
    </svg>
  )
}

/** A PAX A77-style handheld terminal looping through scan → find → print label → take a card payment. */
export default function PaxDevice() {
  const [step, setStep] = useState<Step>('scanning')
  const [item, setItem] = useState(0)

  useEffect(() => {
    const order: [Step, number][] = [
      ['scanning', 1600],
      ['found', 1400],
      ['printing', 1100],
      ['printed', 1500],
      ['paying', 1900],
      ['approved', 1700],
    ]
    let i = 0
    let t: ReturnType<typeof setTimeout>
    const next = () => {
      const [s, ms] = order[i % order.length]
      setStep(s)
      if (s === 'scanning' && i > 0) setItem((n) => (n + 1) % items.length)
      i++
      t = setTimeout(next, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])

  const current = items[item]
  const checkout = step === 'paying' || step === 'approved'

  return (
    <div className="relative mx-auto h-[300px] w-[150px] shrink-0 [perspective:900px]" aria-hidden>
      <div className="animate-float h-full w-full">
        <div className="relative h-full w-full transition-transform duration-700 [transform:rotateY(-16deg)_rotateZ(-5deg)] group-hover:[transform:rotateY(-4deg)_rotateZ(-2deg)]">
          {/* body depth + side keys */}
          <div className="absolute inset-0 translate-x-[9px] translate-y-[5px] rounded-[26px] bg-gradient-to-b from-[#d5d8dd] via-[#b9bdc4] to-[#9da2aa]" />
          <span className="absolute top-[34%] -right-[11px] h-9 w-[5px] rounded-full bg-[#c4c8ce]" />
          <span className="absolute top-[50%] -right-[11px] h-12 w-[5px] rounded-full bg-[#c4c8ce]" />

          {/* front */}
          <div className="relative flex h-full w-full flex-col rounded-[26px] border border-white bg-gradient-to-b from-white via-[#f3f4f6] to-[#e4e6ea] px-[9px] pt-3 pb-4 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.45)]">
            <div className="relative mb-2 flex h-7 items-start justify-between px-1">
              <span className="flex items-center gap-1 text-[#3b5b8c]">
                <svg viewBox="0 0 20 20" className="size-3.5" aria-hidden>
                  <circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M4 12c3-4 8-6 12-6M5 15c3-3 7-5 11-5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                <span className="font-display text-[9px] font-extrabold italic">PAX</span>
              </span>
              <span className="mt-1 h-[3px] w-7 rounded-full bg-[#2b313b]" />
              <span className="flex flex-col items-end gap-1">
                <span className="flex gap-1">
                  <span className="size-[5px] rounded-full bg-[#2b313b]" />
                  <span className="size-[5px] rounded-full bg-[#1f2937] ring-1 ring-[#9ca3af]" />
                </span>
                <span className="font-display text-[9px] font-bold text-[#5b7398] italic">A77</span>
              </span>
            </div>

            {/* screen */}
            <div className="relative flex-1 overflow-hidden rounded-[6px] bg-[#1d2735] p-2.5 text-white">
              <div className="flex items-center justify-between text-[7px] text-white/50">
                <span>09:41</span>
                <span>Store #12</span>
              </div>
              <p className="mt-1.5 font-display text-[11px] font-bold">Stock check</p>

              <div className="relative mt-2 h-14 overflow-hidden rounded-md bg-white p-1.5">
                <Barcode />
                {step === 'scanning' && (
                  <motion.span
                    className="absolute inset-x-0 h-[2px] bg-[#ff3b3b] shadow-[0_0_8px_2px_rgb(255_59_59/0.7)]"
                    initial={{ top: '8%' }}
                    animate={{ top: ['8%', '88%', '8%'] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                {step !== 'scanning' && <span className="absolute inset-0 bg-[#d4ff3a]/25" />}
              </div>
              <p className="mt-1 text-center font-mono text-[7px] text-white/50">{current.sku}</p>

              <div className="mt-2 h-[52px]">
                <AnimatePresence mode="wait">
                  {step === 'scanning' ? (
                    <motion.p
                      key="scan"
                      className="flex h-full items-center justify-center text-[8px] text-white/60"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.4, 1, 0.4], transition: { duration: 1.2, repeat: Infinity } }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    >
                      Scanning…
                    </motion.p>
                  ) : (
                    <motion.div
                      key={current.sku}
                      className="rounded-md bg-white/10 p-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      <p className="flex items-center gap-1 text-[8.5px] font-semibold">
                        <span className="text-[#d4ff3a]">✓</span> {current.name}
                      </p>
                      <p className="mt-0.5 text-[7.5px] text-white/55">{current.stock} in stock · Aisle B3</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                className={`absolute inset-x-2.5 bottom-2.5 rounded-md py-1.5 text-center text-[8.5px] font-bold transition-colors duration-300 ${
                  step === 'printed' ? 'bg-[#d4ff3a] text-[#0b0b10]' : step === 'printing' ? 'bg-[#8b6dff] text-white' : 'bg-white/10 text-white/40'
                }`}
              >
                {step === 'printing' ? 'Printing label…' : step === 'printed' ? 'Label printed ✓' : 'Print label'}
              </div>

              <AnimatePresence>
                {checkout && (
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center bg-[#1d2735] p-2.5 text-center"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <div className="flex w-full items-center justify-between text-[7px] text-white/50">
                      <span>09:41</span>
                      <span>Checkout</span>
                    </div>
                    <p className="mt-3 w-full truncate text-[8px] text-white/60">{current.name}</p>
                    <p className="font-display text-[22px] leading-tight font-extrabold">{current.price}</p>

                    <div className="relative mt-4 grid size-16 place-items-center">
                      <AnimatePresence mode="wait">
                        {step === 'paying' ? (
                          <motion.div key="tap" className="grid size-full place-items-center" exit={{ scale: 0.6, opacity: 0, transition: { duration: 0.15 } }}>
                            {[0, 1].map((r) => (
                              <motion.span
                                key={r}
                                className="absolute inset-0 rounded-full border border-[#2fd8f0]"
                                initial={{ scale: 0.5, opacity: 0.8 }}
                                animate={{ scale: 1.25, opacity: 0, transition: { duration: 1.2, repeat: Infinity, delay: r * 0.6 } }}
                              />
                            ))}
                            <svg viewBox="0 0 24 24" className="size-7 text-[#2fd8f0]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                              <path d="M8.5 7.5a6.5 6.5 0 0 1 0 9M12 5a10 10 0 0 1 0 14M15.5 2.5a13.5 13.5 0 0 1 0 19M5 10a3 3 0 0 1 0 4" strokeLinecap="round" />
                            </svg>
                          </motion.div>
                        ) : (
                          <motion.span
                            key="ok"
                            className="grid size-12 place-items-center rounded-full bg-[#d4ff3a] text-lg font-bold text-[#0b0b10]"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                          >
                            ✓
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    <p className={`mt-3 text-[9px] font-semibold ${step === 'approved' ? 'text-[#d4ff3a]' : 'text-white/80'}`}>
                      {step === 'approved' ? 'Payment approved' : 'Tap card to pay'}
                    </p>
                    <p className="mt-0.5 text-[7px] text-white/45">{step === 'approved' ? 'Contactless · receipt sent' : 'Tap, insert or swipe'}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* a contactless card comes in to tap the terminal */}
      <AnimatePresence>
        {checkout && (
          <motion.div
            className="absolute top-[44%] -right-10 h-[46px] w-[74px] rounded-lg bg-gradient-to-br from-[#8b6dff] to-[#2fd8f0] p-1.5 shadow-xl"
            initial={{ opacity: 0, x: 60, rotate: 20 }}
            animate={step === 'paying' ? { opacity: 1, x: [60, -6, 0], rotate: -12 } : { opacity: 1, x: 24, rotate: 6 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="block h-2.5 w-3.5 rounded-[2px] bg-[#e9e2b0]" />
            <span className="mt-2.5 block font-mono text-[6px] tracking-wider text-white/90">•••• 4242</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* the printed label pops out next to the device */}
      <AnimatePresence>
        {step === 'printed' && (
          <motion.div
            key={current.sku}
            className="absolute top-[38%] -left-12 w-[104px] rounded-md bg-white p-2 text-[#0b0b10] shadow-xl"
            initial={{ opacity: 0, x: 40, rotate: 0, scale: 0.7 }}
            animate={{ opacity: 1, x: 0, rotate: -8, scale: 1 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <p className="truncate text-[8px] font-bold">{current.name}</p>
            <div className="mt-1 h-5">
              <Barcode />
            </div>
            <p className="mt-0.5 font-mono text-[6.5px]">{current.sku}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
