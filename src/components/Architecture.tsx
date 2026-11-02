import { useState } from 'react'
import { motion } from 'motion/react'
import { Reveal, Section } from './ui'

type NodeId = 'mobile' | 'web' | 'api' | 'db' | 'integrations'

const nodes: Record<NodeId, { title: string; tech: string; icon: string }> = {
  mobile: { title: 'Mobile app', tech: 'Flutter · SwiftUI · Firebase', icon: '📱' },
  web: { title: 'Website & admin panels', tech: 'React · Next.js · Supabase', icon: '🌐' },
  api: { title: 'API', tech: '.NET · REST', icon: '⚡' },
  db: { title: 'Database', tech: 'PostgreSQL · MySQL', icon: '🗄️' },
  integrations: { title: 'Integrations', tech: 'Push notifications · Payments · Maps', icon: '🔌' },
}

const edges: [NodeId, NodeId][] = [
  ['mobile', 'api'],
  ['web', 'api'],
  ['api', 'db'],
  ['api', 'integrations'],
]

type Layout = { w: number; h: number; compact: boolean; pos: Record<NodeId, [number, number]> }

// Clients sit side by side on top, the API in the middle, data and integrations below
const desktop: Layout = {
  w: 1000,
  h: 560,
  compact: false,
  pos: { mobile: [320, 75], web: [680, 75], api: [500, 285], db: [320, 490], integrations: [680, 490] },
}

const mobile: Layout = {
  w: 360,
  h: 600,
  compact: true,
  pos: { mobile: [95, 60], web: [265, 60], api: [180, 300], db: [95, 540], integrations: [265, 540] },
}

function pathFor([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  const my = (y1 + y2) / 2
  return `M${x1} ${y1} C${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`
}

function Diagram({ layout, className }: { layout: Layout; className: string }) {
  const [hover, setHover] = useState<NodeId | null>(null)
  const { w, h, compact, pos } = layout
  const linked = (id: NodeId) => !hover || hover === id || edges.some(([a, b]) => (a === hover && b === id) || (b === hover && a === id))

  return (
    <div className={`relative w-full ${className}`} style={{ aspectRatio: `${w} / ${h}` }}>
      <svg viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 size-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id={`edge-${w}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--violet)" />
            <stop offset="1" stopColor="var(--cyan)" />
          </linearGradient>
        </defs>
        {edges.map(([a, b], i) => {
          const d = pathFor(pos[a], pos[b])
          const id = `p-${w}-${i}`
          const active = hover === a || hover === b
          const dim = hover && !active
          return (
            <g key={id} style={{ opacity: dim ? 0.15 : 1, transition: 'opacity .3s' }}>
              <path d={d} fill="none" stroke="var(--line)" strokeWidth="2" />
              <motion.path
                id={id}
                d={d}
                fill="none"
                stroke={`url(#edge-${w})`}
                strokeWidth={active ? 3 : 2}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-20% 0px' }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.12, ease: 'easeInOut' }}
              />
              {/* request goes out, response comes back */}
              <circle r={active ? 6 : 4.5} fill="var(--cyan)">
                <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.4}s`}>
                  <mpath href={`#${id}`} />
                </animateMotion>
              </circle>
              <circle r={active ? 6 : 4.5} fill="#d4ff3a">
                <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" begin={`${1.2 + i * 0.4}s`} keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                  <mpath href={`#${id}`} />
                </animateMotion>
              </circle>
            </g>
          )
        })}
      </svg>

      {(Object.keys(nodes) as NodeId[]).map((id, i) => {
        const n = nodes[id]
        const [x, y] = pos[id]
        const isApi = id === 'api'
        return (
          <motion.div
            key={id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(x / w) * 100}%`, top: `${(y / h) * 100}%` }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: linked(id) ? 1 : 0.35, scale: 1 }}
            viewport={{ once: false, margin: '-10% 0px' }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: hover ? 0 : i * 0.08 }}
            onMouseEnter={() => setHover(id)}
            onMouseLeave={() => setHover(null)}
          >
            {isApi && (
              <span className="absolute inset-0 -z-10 animate-ping rounded-[1.4rem] bg-gradient-to-br from-violet to-cyan opacity-20 [animation-duration:2.4s]" />
            )}
            <div
              className={`relative cursor-default rounded-[1.4rem] border text-center backdrop-blur transition duration-300 hover:-translate-y-1 ${
                isApi
                  ? 'border-transparent bg-gradient-to-br from-violet to-cyan text-white shadow-[0_20px_50px_-15px_var(--violet)]'
                  : 'border-line bg-surface/90 hover:border-violet'
              } ${compact ? 'w-[96px] px-2 py-3' : 'w-[200px] px-4 py-4'} ${isApi && !compact ? 'w-[230px] py-6' : ''}`}
            >
              <span className={`block ${compact ? 'text-lg' : 'text-2xl'}`}>{n.icon}</span>
              <span className={`mt-1 block font-display font-bold tracking-tight ${compact ? 'text-xs' : isApi ? 'text-2xl' : 'text-lg'}`}>{n.title}</span>
              <span className={`mt-0.5 block font-mono ${compact ? 'text-[8.5px] leading-tight' : 'text-[11px]'} ${isApi ? 'text-white/85' : 'text-muted'}`}>
                {n.tech}
              </span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Architecture() {
  return (
    <Section
      id="stack"
      eyebrow="End to end"
      title="Every layer, one developer"
      intro="Apps, websites and admin panels talking to an API and a database I build too. Hover a piece to see how it connects."
    >
      <Reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-surface/40 p-4 sm:p-10">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <Diagram layout={desktop} className="hidden lg:block" />
        <Diagram layout={mobile} className="mx-auto max-w-md lg:hidden" />
      </Reveal>
    </Section>
  )
}
