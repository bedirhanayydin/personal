import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { process } from '../data/cv'
import { Reveal, Section } from './ui'

export default function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })

  return (
    <Section id="process" eyebrow="Process" title="How we’ll work together" intro="Clear steps, frequent builds and no surprises — you always know where your product stands.">
      <ol ref={ref} className="relative ml-4 md:ml-[calc(50%-1px)]">
        <span className="absolute top-0 bottom-0 left-0 w-px bg-line" aria-hidden />
        <motion.span className="absolute top-0 bottom-0 left-0 w-px origin-top bg-gradient-to-b from-violet via-cyan to-lime" style={{ scaleY: fill }} aria-hidden />

        {process.map((p, i) => (
          <li key={p.step} className={`relative pb-16 pl-10 last:pb-0 md:w-full md:pl-14 ${i % 2 ? '' : 'md:-ml-[100%] md:pr-14 md:pl-0 md:text-right'}`}>
            <motion.span
              className={`absolute top-2 -left-[7px] size-[15px] rounded-full border-2 border-bg bg-gradient-to-br from-violet to-cyan ${i % 2 ? '' : 'md:right-[-8px] md:left-auto'}`}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-30% 0px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            />
            <Reveal>
              <span className="font-display text-7xl leading-none font-extrabold text-transparent [-webkit-text-stroke:1.5px_var(--muted)] sm:text-8xl">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-display text-3xl font-bold tracking-tight">{p.step}</h3>
              <p className={`mt-2 max-w-sm leading-relaxed text-muted ${i % 2 ? '' : 'md:ml-auto'}`}>{p.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
