import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { profile } from '../data/cv'
import Confetti from './Confetti'
import { ArrowIcon, GitHubIcon, LinkedInIcon, Magnetic, Reveal, SplitWords } from './ui'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [bursts, setBursts] = useState(0)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setBursts((b) => b + 1)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-7xl scroll-mt-4 px-4 py-24 sm:px-6 md:scroll-mt-[-2.5rem] md:py-36">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0b0b10] px-6 py-16 text-white sm:px-14 sm:py-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="animate-blob absolute -top-72 -left-60 size-[48rem] rounded-full bg-[radial-gradient(circle,rgb(139_109_255/0.55),transparent_62%)]" />
          <div className="animate-blob absolute -right-60 -bottom-72 size-[48rem] rounded-full bg-[radial-gradient(circle,rgb(47_216_240/0.45),transparent_62%)] [animation-delay:-8s]" />
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgb(255_255_255/0.6)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        </div>

        <div className="relative grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-white/60 uppercase">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#d4ff3a] opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-[#d4ff3a]" />
              </span>
              Available for new projects
            </Reveal>
            <h2 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] font-extrabold tracking-[-0.045em]">
              <SplitWords text="Got an idea?" />
              <br />
              <span className="text-gradient">
                <SplitWords text="Let’s build it." delay={0.2} />
              </span>
            </h2>
            <Reveal delay={0.3} className="mt-8 max-w-lg text-lg text-white/70">
              Tell me what you want to build — a mobile app, a website, a backend or all of it. I’ll get back to you with next steps.
            </Reveal>

            <Reveal delay={0.4} className="mt-10 flex flex-wrap items-center gap-3">
              <button
                onClick={copy}
                data-cursor="Copy"
                className="group relative inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-3.5 font-mono text-sm backdrop-blur transition hover:border-white/50"
              >
                {bursts > 0 && <Confetti key={bursts} />}
                {profile.email}
                <span className="relative inline-grid h-5 w-14 overflow-hidden rounded-full bg-white/10 text-[10px] uppercase">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? 'done' : 'copy'}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -12, opacity: 0 }}
                      className={`grid place-items-center ${copied ? 'text-[#d4ff3a]' : 'text-white/70'}`}
                    >
                      {copied ? 'Copied' : 'Copy'}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </button>
              {[
                { href: profile.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
                { href: profile.github, label: 'GitHub', Icon: GitHubIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-12 place-items-center rounded-full border border-white/20 bg-white/5 transition hover:-translate-y-1 hover:border-white/50"
                >
                  <Icon />
                </a>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.3} className="justify-self-start lg:justify-self-end">
            <Magnetic strength={0.5}>
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent('New project')}`}
                data-cursor="Mail"
                className="group relative grid size-44 place-items-center rounded-full bg-[#d4ff3a] text-center font-display text-lg leading-tight font-bold text-[#0b0b10] transition-transform duration-500 hover:scale-110 sm:size-52"
              >
                <svg viewBox="0 0 200 200" className="animate-spin-slow absolute inset-0 size-full" aria-hidden>
                  <defs>
                    <path id="circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                  </defs>
                  <text className="fill-[#0b0b10] font-mono text-[12px] font-medium uppercase">
                    <textPath href="#circle" textLength="486" lengthAdjust="spacing">
                      Start a project ✦ Start a project ✦
                    </textPath>
                  </text>
                </svg>
                <ArrowIcon className="size-12 transition-transform duration-500 group-hover:rotate-45" />
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
