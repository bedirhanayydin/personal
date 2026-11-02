import { education, profile } from '../data/cv'
import { Reveal, Section, spotlight } from './ui'

const values = [
  ['One point of contact', 'You talk directly to the developer writing the code — no hand-offs, no account managers.'],
  ['Built to last', 'Clean Architecture, MVVM and tested modules, so your product is easy to grow later.'],
  ['Ships everywhere', 'App Store, Google Play, AppGallery, the web and your servers — all handled for you.'],
]

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Hi, I’m Bedirhan">
      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-7 sm:p-10">
          <div className="relative space-y-5 text-lg leading-relaxed sm:text-xl">
            {profile.about.map((p, i) => (
              <p key={i} className={i ? 'text-muted' : ''}>
                {p}
              </p>
            ))}
          </div>
          <div className="relative mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6 font-mono text-xs text-muted">
            <span>{education.degree}</span>
            <span>{profile.location}</span>
          </div>
        </Reveal>

        <div className="grid gap-4">
          {values.map(([title, body], i) => (
            <Reveal key={title} delay={0.1 + i * 0.08}>
              <div onMouseMove={spotlight} className="spotlight group flex h-full gap-5 rounded-[1.5rem] border border-line bg-surface p-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-lime font-display font-extrabold text-[#0b0b10] transition group-hover:rotate-[360deg] group-hover:duration-700">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-display text-xl font-bold">{title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{body}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
