import { useMemo } from 'react'
import { motion } from 'motion/react'

const colors = ['#8b6dff', '#2fd8f0', '#d4ff3a', '#f472b6', '#ffffff']

/** One-shot burst of confetti from the centre of its (relative) parent. Remount via `key` to fire again. */
export default function Confetti({ count = 26 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4
        const distance = 60 + Math.random() * 90
        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 30,
          rotate: Math.random() * 540 - 270,
          color: colors[i % colors.length],
          round: i % 3 === 0,
          size: 5 + Math.random() * 5,
        }
      }),
    [count],
  )

  return (
    <span className="pointer-events-none absolute top-1/2 left-1/2 z-10" aria-hidden>
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{ width: p.size, height: p.size * (p.round ? 1 : 0.5), background: p.color, borderRadius: p.round ? 999 : 1 }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 40], opacity: [1, 1, 0], rotate: p.rotate, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      ))}
    </span>
  )
}
