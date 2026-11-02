import { useEffect, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type Call = { method: 'GET' | 'POST'; path: string; status: string; ms: number; body: ReactNode[] }

const k = (s: string) => <span className="text-violet">"{s}"</span>
const v = (s: string) => <span className="text-lime">"{s}"</span>
const lit = (s: string) => <span className="text-cyan">{s}</span>

const calls: Call[] = [
  {
    method: 'GET',
    path: '/api/bedirhan',
    status: '200 OK',
    ms: 42,
    body: [
      '{',
      <>&nbsp;&nbsp;{k('role')}: {v('full-stack dev')},</>,
      <>&nbsp;&nbsp;{k('based')}: {v('İstanbul')},</>,
      <>&nbsp;&nbsp;{k('available')}: {lit('true')}</>,
      '}',
    ],
  },
  {
    method: 'GET',
    path: '/api/bedirhan/stack',
    status: '200 OK',
    ms: 38,
    body: [
      '{',
      <>&nbsp;&nbsp;{k('mobile')}: [{v('Flutter')}, {v('SwiftUI')}],</>,
      <>&nbsp;&nbsp;{k('web')}: [{v('React')}, {v('Next.js')}],</>,
      <>&nbsp;&nbsp;{k('backend')}: [{v('.NET')}, {v('Postgres')}]</>,
      '}',
    ],
  },
  {
    method: 'POST',
    path: '/api/projects',
    status: '201 Created',
    ms: 57,
    body: ['{', <>&nbsp;&nbsp;{k('idea')}: {v('yours')},</>, <>&nbsp;&nbsp;{k('status')}: {v("let's build it 🚀")}</>, '}'],
  },
]

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

/** A tiny terminal that types requests and streams the JSON response, on loop. */
export default function ApiCard() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'loading' | 'done'>('typing')
  const [lines, setLines] = useState(0)

  useEffect(() => {
    if (reduced) {
      // Show the first response, fully written, without the typing loop
      setTyped(calls[0].path.length)
      setPhase('done')
      setLines(calls[0].body.length)
      return
    }
    let alive = true
    ;(async () => {
      await wait(1400)
      for (let i = 0; alive; i = (i + 1) % calls.length) {
        const call = calls[i]
        setIndex(i)
        setLines(0)
        setTyped(0)
        setPhase('typing')
        for (let c = 1; c <= call.path.length && alive; c++) {
          setTyped(c)
          await wait(55 + Math.random() * 45)
        }
        setPhase('loading')
        await wait(650)
        setPhase('done')
        for (let l = 1; l <= call.body.length && alive; l++) {
          setLines(l)
          await wait(140)
        }
        await wait(3200)
      }
    })()
    return () => {
      alive = false
    }
  }, [reduced])

  const call = calls[index]

  return (
    <div className="h-[178px] w-72 rounded-2xl border border-white/10 bg-[#0c0c14]/95 p-4 font-mono text-[10.5px] leading-relaxed text-white/80 shadow-2xl">
      <div className="mb-2.5 flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-auto text-[9px] text-white/30">localhost:5000</span>
      </div>
      <p className="whitespace-nowrap">
        <span className={call.method === 'GET' ? 'text-cyan' : 'text-[#febc2e]'}>{call.method}</span> {call.path.slice(0, typed)}
        {phase === 'typing' && <span className="ml-px inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-white/80" />}
      </p>
      <p className="mt-1 flex h-4 items-center gap-2">
        {phase === 'loading' && (
          <motion.span className="text-white/40" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.6, repeat: Infinity }}>
            sending…
          </motion.span>
        )}
        {phase === 'done' && (
          <motion.span className="flex items-center gap-2" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}>
            <span className="size-1.5 rounded-full bg-lime" />
            <span className="text-lime">{call.status}</span>
            <span className="text-white/40">· {call.ms}ms</span>
          </motion.span>
        )}
      </p>
      <div className="mt-1.5 text-white/55">
        {call.body.slice(0, lines).map((line, i) => (
          <motion.p key={`${index}-${i}`} className="whitespace-nowrap" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  )
}
