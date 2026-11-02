import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { experience } from '../data/cv'
import { Reveal, Section, Tag } from './ui'

export default function Experience() {
  const [open, setOpen] = useState(0)

  return (
    <Section id="experience" eyebrow="Experience" title="Where I’ve sharpened my craft">
      <div className="border-t border-line">
        {experience.map((job, i) => {
          const isOpen = open === i
          return (
            <Reveal key={job.company} delay={i * 0.06} className="border-b border-line">
              <div>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  data-cursor={isOpen ? 'Close' : 'Open'}
                  className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 py-7 text-left md:grid-cols-[12rem_1fr_auto] md:gap-10"
                >
                  <span className="hidden font-mono text-sm text-muted md:block">{job.period}</span>
                  <span>
                    <span className="flex flex-wrap items-center gap-3">
                      <span className="font-display text-3xl font-bold tracking-tight transition group-hover:translate-x-2 sm:text-4xl">{job.company}</span>
                      {job.current && (
                        <span className="rounded-full bg-lime px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#0b0b10] uppercase">Now</span>
                      )}
                    </span>
                    <span className="mt-1 block text-muted">
                      {job.role}
                      <span className="md:hidden"> · {job.period}</span>
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className={`grid size-12 place-items-center rounded-full border border-line transition ${isOpen ? 'border-transparent bg-ink text-bg' : 'group-hover:border-ink/40'}`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4" aria-hidden>
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 md:pl-[calc(12rem+2.5rem)]">
                        <p className="max-w-2xl text-lg">{job.summary}</p>
                        <ul className="mt-5 grid max-w-3xl gap-3">
                          {job.points.map((p) => (
                            <li key={p} className="flex gap-3 leading-relaxed text-muted">
                              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet to-cyan" />
                              {p}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {job.tags.map((t) => (
                            <Tag key={t}>{t}</Tag>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
