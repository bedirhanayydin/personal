import type { ReactNode } from 'react'

const groups = [
  { label: 'Mobile', items: ['Flutter', 'SwiftUI', 'Java', 'Firebase'] },
  { label: 'Web', items: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'Supabase'] },
  { label: 'Backend', items: ['.NET', 'C#', 'PostgreSQL', 'MySQL', 'REST APIs'] },
]
const tools = ['Clean Architecture', 'MVVM', 'Docker', 'Azure DevOps', 'Git', 'Agile / Scrum', 'Maps & GIS', 'OneSignal']

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-violet sm:size-7" fill="currentColor" aria-hidden>
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  )
}

function Track({ children, reverse, speed }: { children: ReactNode; reverse?: boolean; speed: string }) {
  return (
    <div className="marquee-mask flex overflow-hidden">
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className="animate-marquee flex shrink-0 items-center gap-6 pr-6 sm:gap-8 sm:pr-8"
          style={{ animationDirection: reverse ? 'reverse' : 'normal', ['--marquee-speed' as string]: speed }}
        >
          {children}
        </div>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="overflow-x-clip py-6">
      <div className="relative -rotate-2 space-y-5 border-y border-line bg-surface/70 py-8 backdrop-blur" aria-label="Technologies I work with">
        <Track speed="45s">
          {groups.map((g) => (
            <span key={g.label} className="flex items-center gap-6 whitespace-nowrap sm:gap-8">
              <span className="rounded-full bg-lime px-4 py-1.5 font-mono text-xs font-bold tracking-widest text-[#0b0b10] uppercase sm:text-sm">
                {g.label}
              </span>
              {g.items.map((item) => (
                <span key={item} className="flex items-center gap-6 sm:gap-8">
                  <span className="font-display text-4xl font-bold tracking-tight sm:text-6xl">{item}</span>
                  <Star />
                </span>
              ))}
            </span>
          ))}
        </Track>
        <Track speed="55s" reverse>
          {tools.map((t) => (
            <span key={t} className="flex items-center gap-6 whitespace-nowrap sm:gap-8">
              <span className="font-display text-3xl font-bold tracking-tight text-transparent [-webkit-text-stroke:1.5px_var(--muted)] sm:text-5xl">
                {t}
              </span>
              <Star />
            </span>
          ))}
        </Track>
      </div>
    </div>
  )
}
