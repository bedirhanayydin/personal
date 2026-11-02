import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'

/**
 * Dot + trailing ring that replace the mouse pointer on desktop.
 * Links and buttons grow the ring; elements with data-cursor="Label" show that label.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const [down, setDown] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 })

  useEffect(() => {
    setEnabled(matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('custom-cursor')

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const el = (e.target as Element).closest?.('[data-cursor], a, button, [role="button"]')
      setHovering(!!el)
      setLabel(el?.getAttribute('data-cursor') ?? null)
    }
    const leave = () => setVisible(false)
    const press = () => setDown(true)
    const release = () => setDown(false)

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', press)
    window.addEventListener('pointerup', release)
    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', press)
      window.removeEventListener('pointerup', release)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const size = label ? 84 : hovering ? 56 : 34

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]" aria-hidden style={{ opacity: visible ? 1 : 0, transition: 'opacity .2s' }}>
      <motion.div
        className={`fixed top-0 left-0 grid place-items-center rounded-full ${
          label ? 'bg-lime text-[#0b0b10]' : hovering ? 'border border-violet bg-violet/15' : 'border border-ink/40'
        }`}
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: size, height: size, scale: down ? 0.85 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              className="font-mono text-[11px] font-bold tracking-wider uppercase"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 size-1.5 rounded-full bg-ink"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovering ? 0 : 1 }}
      />
    </div>
  )
}
