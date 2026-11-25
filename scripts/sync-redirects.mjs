// Atualiza os 301 do vercel.json e do public/.htaccess a partir de content/redirects.json.
// Uso: npm run redirects
import { readFileSync, writeFileSync } from 'node:fs'

const { redirects } = JSON.parse(readFileSync('content/redirects.json', 'utf8'))
const entries = Object.entries(redirects)

// vercel.json
const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'))
vercel.redirects = entries.map(([source, destination]) => ({ source, destination, permanent: true }))
writeFileSync('vercel.json', `${JSON.stringify(vercel, null, 2)}\n`)

// .htaccess (bloco entre marcadores)
const START = '# >>> redirects (gerado por npm run redirects)'
const END = '# <<< redirects'
const block = [START, ...entries.map(([from, to]) => `RewriteRule ^${from.slice(1)}/?$ ${to} [R=301,L]`), END].join('\n')
let ht = readFileSync('public/.htaccess', 'utf8')
if (ht.includes(START)) {
  ht = ht.replace(new RegExp(`${START}[\\s\\S]*?${END}`), block)
} else {
  // entra antes da regra de barra final, para valer também com /url/
  ht = ht.replace('# Remove barra final', `${block}\n\n# Remove barra final`)
}
writeFileSync('public/.htaccess', ht)

console.log(`${entries.length} redirecionamentos aplicados em vercel.json e public/.htaccess`)
