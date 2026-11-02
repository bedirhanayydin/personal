export default function Logo({ className = 'text-2xl' }: { className?: string }) {
  return (
    <a href="#top" className={`font-display leading-none font-extrabold tracking-[-0.04em] ${className}`} aria-label="Bedirhan Aydın — home">
      bedirhan<span className="text-violet">.</span>
    </a>
  )
}
