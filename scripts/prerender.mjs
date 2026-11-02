// Renders the app to static HTML after `vite build`, so the first paint doesn't wait for JS.
import { readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const dist = resolve('dist')
const ssrDir = resolve('dist-ssr')

const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)
let html = readFileSync(resolve(dist, 'index.html'), 'utf8')

// Preload the Latin subsets of the two text fonts so headings don't swap late
const fonts = readdirSync(resolve(dist, 'assets')).filter((f) => /^(bricolage-grotesque|manrope)-latin-wght-normal-.*\.woff2$/.test(f))
const preloads = fonts.map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`).join('\n    ')

html = html.replace('</head>', `  ${preloads}\n  </head>`).replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
writeFileSync(resolve(dist, 'index.html'), html)
rmSync(ssrDir, { recursive: true, force: true })

console.log(`prerendered index.html (${fonts.length} font preloads)`)
