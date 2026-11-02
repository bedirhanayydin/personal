import { motion } from 'motion/react'
import { services } from '../data/cv'
import PaxDevice from './PaxDevice'
import { Reveal, Section, Tag, spotlight } from './ui'

const icons = [
  <path key="m" d="M8 2.75h8A1.75 1.75 0 0 1 17.75 4.5v15A1.75 1.75 0 0 1 16 21.25H8a1.75 1.75 0 0 1-1.75-1.75v-15A1.75 1.75 0 0 1 8 2.75ZM11 18h2" strokeLinecap="round" />,
  <path key="w" d="M3.75 5.75h16.5v12.5H3.75zM3.75 9h16.5M6.5 7.4h.01M8.5 7.4h.01" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="b" d="M4 6.5C4 5 7.6 3.75 12 3.75S20 5 20 6.5 16.4 9.25 12 9.25 4 8 4 6.5Zm0 0v11c0 1.5 3.6 2.75 8 2.75s8-1.25 8-2.75v-11M4 12c0 1.5 3.6 2.75 8 2.75S20 13.5 20 12" strokeLinejoin="round" />,
  <path key="h" d="M4 5v14M7 5v14M9.5 5v14M13 5v14M15.5 5v14M20 5v14M2.5 12h19" strokeLinecap="round" />,
  <path key="e" d="m12 3 9 4.5-9 4.5-9-4.5L12 3ZM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5" strokeLinejoin="round" />,
  <path key="c" d="M20 11a8 8 0 0 0-14.6-4.5M4 4v3h3M4 13a8 8 0 0 0 14.6 4.5M20 20v-3h-3" strokeLinecap="round" strokeLinejoin="round" />,
]

// Bento layout: wide + narrow, narrow + wide, then two halves
const spans = ['md:col-span-4', 'md:col-span-2', 'md:col-span-2', 'md:col-span-4', 'md:col-span-3', 'md:col-span-3']

export default function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Anything you can think of"
      intro="Mobile, web, backend — whatever your project needs, one developer for the whole journey."
    >
      <div className="grid gap-4 md:grid-cols-6">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08} className={`h-full ${spans[i]}`}>
            <motion.article
              onMouseMove={spotlight}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="spotlight group relative flex h-full min-h-[320px] flex-col gap-10 overflow-hidden rounded-[2rem] border border-line bg-surface p-7 sm:p-9 md:flex-row"
            >
              <span className="pointer-events-none absolute -top-6 -right-2 font-display text-[9rem] leading-none font-extrabold text-ink/[0.04] transition duration-500 group-hover:text-violet/15">
                0{i + 1}
              </span>
              <div className="relative flex h-full flex-1 flex-col">
                <span className="relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-violet to-cyan text-white shadow-[0_10px_30px_-10px_var(--violet)] transition duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-7" aria-hidden>
                    {icons[i]}
                  </svg>
                </span>
                <h3 className="relative mt-8 font-display text-3xl font-bold tracking-tight sm:text-4xl">{s.title}</h3>
                <p className="relative mt-3 max-w-md leading-relaxed text-muted">{s.body}</p>
                <div className="relative mt-auto flex flex-wrap gap-2 pt-8">
                  {s.points.map((p) => (
                    <Tag key={p}>{p}</Tag>
                  ))}
                </div>
              </div>
              {s.visual === 'pax' && (
                <div className="relative self-center px-12">
                  <PaxDevice />
                </div>
              )}
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
