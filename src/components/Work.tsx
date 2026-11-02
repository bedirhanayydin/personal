import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { projects, type Project } from '../data/cv'
import { ArrowIcon, Section, Tag } from './ui'

const covers = [
  'from-[#8b6dff] via-[#5b3df5] to-[#2fd8f0]',
  'from-[#0f766e] via-[#2fd8f0] to-[#d4ff3a]',
  'from-[#1e1b4b] via-[#8b6dff] to-[#f472b6]',
  'from-[#f97316] via-[#f472b6] to-[#8b6dff]',
]

function Cover({ project, index }: { project: Project; index: number }) {
  const initials = project.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)

  return (
    <div className={`relative h-full min-h-[280px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${covers[index % covers.length]}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.35),transparent_45%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgb(255_255_255/0.5)_1px,transparent_1px)] [background-size:18px_18px]" />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[46%] max-w-[200px] -translate-x-1/2 -translate-y-[40%] rounded-[1.8rem] border border-white/30 bg-black/30 p-2 shadow-2xl backdrop-blur-md"
        whileHover={{ rotate: -4, scale: 1.05 }}
      >
        <div className="aspect-[9/17] rounded-[1.4rem] bg-gradient-to-b from-white/20 to-white/5 p-4 text-white">
          <div className="mx-auto h-1.5 w-10 rounded-full bg-black/40" />
          <div className="mt-6 grid size-12 place-items-center rounded-2xl bg-white font-display text-lg font-extrabold text-[#0b0b10]">{initials}</div>
          <p className="mt-3 font-display text-sm leading-tight font-bold">{project.name}</p>
          <div className="mt-4 space-y-2">
            <span className="block h-1.5 w-full rounded bg-white/40" />
            <span className="block h-1.5 w-4/5 rounded bg-white/25" />
            <span className="block h-1.5 w-3/5 rounded bg-white/25" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-1.5">
            <span className="aspect-square rounded-lg bg-white/25" />
            <span className="aspect-square rounded-lg bg-white/15" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    const mq = matchMedia('(min-width: 768px)')
    const onChange = () => setDesktop(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return desktop
}

function Card({ project, index, total, progress, stacked }: { project: Project; index: number; total: number; progress: MotionValue<number>; stacked: boolean }) {
  // Earlier cards shrink slightly as later ones stack on top of them
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - index) * 0.04])

  return (
    <div className="md:sticky md:top-24 md:h-[min(580px,82svh)]" style={stacked ? { paddingTop: index * 18 } : undefined}>
      <motion.article
        style={stacked ? { scale } : undefined}
        className="grid h-full origin-top gap-6 rounded-[2rem] border border-line bg-surface p-5 shadow-[0_-20px_60px_-30px_rgb(0_0_0/0.5)] sm:p-7 md:grid-cols-[1.1fr_1fr]"
      >
        <div className="flex flex-col p-2">
          <div className="flex items-center justify-between gap-4 font-mono text-xs text-muted">
            <span className="whitespace-nowrap text-violet">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
            <span className="text-right uppercase">{project.client}</span>
          </div>
          <h3 className="mt-6 font-display text-4xl leading-[0.95] font-extrabold tracking-[-0.03em] sm:text-5xl">{project.name}</h3>
          <p className="mt-5 leading-relaxed text-muted">{project.description}</p>
          <p className="mt-4 flex gap-3 text-sm leading-relaxed">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-lime" />
            {project.highlight}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap gap-2 pt-7">
            {[
              ['App Store', project.appStore],
              ['Google Play', project.playStore],
            ].map(
              ([label, href]) =>
                href && (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="Open"
                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-bg transition hover:scale-[1.04]"
                  >
                    {label}
                    <ArrowIcon className="size-3.5 transition group-hover:rotate-45" />
                  </a>
                ),
            )}
          </div>
        </div>
        <Cover project={project} index={index} />
      </motion.article>
    </div>
  )
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const stacked = useIsDesktop()

  return (
    <Section id="work" eyebrow="Selected work" title="A few things I’ve built" intro="Just a handful of examples — not the full list. Here are some products I’ve shipped to the App Store and Google Play.">
      <div ref={ref} className="space-y-8 md:space-y-[18vh]">
        {projects.map((p, i) => (
          <Card key={p.name} project={p} index={i} total={projects.length} progress={scrollYProgress} stacked={stacked} />
        ))}
      </div>
    </Section>
  )
}
