import { profile } from '../data/cv'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <Logo className="text-3xl" />
          <p className="border-l border-line pl-3 text-sm text-muted">
            Apps, websites & backends,
            <br />
            built end to end.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm font-medium">
          <a href={`mailto:${profile.email}`} className="transition hover:text-violet">Email</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-violet">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="transition hover:text-violet">GitHub</a>
          <a href="#top" className="transition hover:text-violet">Back to top ↑</a>
        </div>
      </div>

      <p
        className="mt-10 text-center font-display text-[18.5vw] leading-[0.8] font-extrabold tracking-[-0.06em] select-none bg-gradient-to-b from-ink/15 to-transparent bg-clip-text text-transparent"
        aria-hidden
      >
        BEDIRHAN
      </p>
      <div className="mx-auto flex max-w-7xl justify-between px-4 py-6 font-mono text-xs text-muted sm:px-6">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.location}</span>
      </div>
    </footer>
  )
}
