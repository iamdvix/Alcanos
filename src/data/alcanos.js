// Datos y lógica química de la app. Toda respuesta correcta sale de aquí.

export const CHAIN = ['', 'metano', 'etano', 'propano', 'butano', 'pentano', 'hexano', 'heptano', 'octano', 'nonano', 'decano']
const PREFIX = ['', '', 'di', 'tri', 'tetra']
const SUB = { m: 'metil', e: 'etil' }
export const SUB_C = { m: 1, e: 2 } // carbonos por sustituyente

// Una estructura se describe así: { n: carbonos de la cadena principal, subs: [{ p: posición (1..n), t: 'm' | 'e' }] }
const s = (n, ...b) => ({ n, subs: b.map(([p, t]) => ({ p, t })) })

export const LEVELS = {
  facil: {
    label: 'Nivel 1: cadenas lineales',
    items: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => s(n)),
  },
  medio: {
    label: 'Nivel 2: una ramificación',
    items: [
      s(4, [2, 'm']), s(5, [2, 'm']), s(5, [3, 'm']), s(6, [2, 'm']), s(6, [3, 'm']),
      s(7, [3, 'm']), s(7, [4, 'm']), s(8, [2, 'm']), s(5, [3, 'e']),
    ],
  },
  dificil: {
    label: 'Nivel 3: varias ramificaciones',
    items: [
      s(4, [2, 'm'], [2, 'm']), s(4, [2, 'm'], [3, 'm']), s(5, [2, 'm'], [4, 'm']),
      s(5, [2, 'm'], [2, 'm']), s(5, [3, 'm'], [3, 'm']), s(5, [2, 'm'], [3, 'm']),
      s(6, [2, 'm'], [5, 'm']), s(5, [2, 'm'], [3, 'e']), s(5, [3, 'm'], [3, 'e']),
      s(5, [2, 'm'], [2, 'm'], [4, 'm']), s(5, [2, 'm'], [3, 'm'], [4, 'm']),
      s(4, [2, 'm'], [2, 'm'], [3, 'm']),
    ],
  },
}

// ---------- Nomenclatura ----------
export function compose(n, subs) {
  const groups = {}
  subs.forEach((x) => (groups[x.t] ||= []).push(x.p))
  const parts = Object.keys(groups)
    .sort((a, b) => SUB[a].localeCompare(SUB[b]))
    .map((t) => {
      const loc = [...groups[t]].sort((a, b) => a - b).join(',')
      return `${loc}-${PREFIX[groups[t].length]}${SUB[t]}`
    })
  return parts.join('-') + (CHAIN[n] ?? '')
}

const flip = (n, subs) => subs.map((x) => ({ ...x, p: n + 1 - x.p }))
const cmp = (a, b) => {
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] - b[i]
  return 0
}

// Elige el sentido de numeración que da los localizadores más bajos (regla IUPAC).
export function bestNumbering({ n, subs }) {
  const other = flip(n, subs)
  const locs = (l) => l.map((x) => x.p).sort((a, b) => a - b)
  let c = cmp(locs(subs), locs(other))
  if (c === 0) {
    const alpha = (l) => [...l].sort((x, y) => SUB[x.t].localeCompare(SUB[y.t]) || x.p - y.p).map((x) => x.p)
    c = cmp(alpha(subs), alpha(other))
  }
  return c <= 0 ? subs : other
}

export const iupacName = (spec) => compose(spec.n, bestNumbering(spec))

export function explain(spec) {
  const best = bestNumbering(spec)
  let t = `Cadena principal de ${spec.n} carbonos (${CHAIN[spec.n]}). `
  if (best.length) {
    t += 'Ramificaciones: ' + [...best].sort((a, b) => a.p - b.p).map((x) => `${SUB[x.t]} en C${x.p}`).join(', ')
    t += '. Se numera desde el extremo que da los localizadores más bajos.'
  }
  return t
}

const validPos = (n, subs) => n >= 1 && n <= 10 && subs.every((x) => x.p >= 2 && x.p <= n - 1)

export function distractors(spec) {
  const { n, subs } = spec
  const right = iupacName(spec)
  const pool = []
  if (subs.length) {
    pool.push(compose(n, flip(n, subs)))
    if (validPos(n + 1, subs)) pool.push(compose(n + 1, subs))
    if (validPos(n - 1, subs)) pool.push(compose(n - 1, subs))
    pool.push(compose(n, subs.map((x, i) => (i === 0 ? { ...x, t: x.t === 'm' ? 'e' : 'm' } : x))))
    const first = subs[0]
    const shifted = first.p + 1 <= n - 1 ? first.p + 1 : first.p - 1
    pool.push(compose(n, subs.map((x, i) => (i === 0 ? { ...x, p: shifted } : x))))
    if (subs.length > 1) pool.push(compose(n, subs.slice(1)))
  }
  [n + 1, n - 1, n + 2, n - 2, n + 3].forEach((k) => CHAIN[k] && pool.push(compose(k, [])))
  const uniq = [...new Set(pool)].filter((x) => x && x !== right)
  return shuffle(uniq).slice(0, 3)
}

export const normalize = (t) =>
  t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\s\-–—]/g, '')

export const shuffle = (a) => {
  const r = [...a]
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[r[i], r[j]] = [r[j], r[i]]
  }
  return r
}

export function pickChallenge(level, prev) {
  const items = LEVELS[level].items.filter((x) => x !== prev)
  return items[Math.floor(Math.random() * items.length)]
}

// ---------- Estructura como grafo (para validar lo construido) ----------
export const totalC = ({ n, subs }) => n + subs.reduce((a, x) => a + SUB_C[x.t], 0)
export const formula = (spec) => `C${totalC(spec)}H${2 * totalC(spec) + 2}`

function toAdj({ n, subs }) {
  const adj = Array.from({ length: n }, () => [])
  const link = (a, b) => { adj[a].push(b); adj[b].push(a) }
  for (let i = 0; i < n - 1; i++) link(i, i + 1)
  subs.forEach((x) => {
    let prev = x.p - 1
    for (let k = 0; k < SUB_C[x.t]; k++) {
      adj.push([])
      const id = adj.length - 1
      link(prev, id)
      prev = id
    }
  })
  return adj
}

// Forma canónica de un árbol: dos moléculas son la misma si su cadena canónica coincide.
function canonical(adj) {
  const n = adj.length
  if (n === 1) return '()'
  const deg = adj.map((a) => a.length)
  let leaves = deg.map((d, i) => (d <= 1 ? i : -1)).filter((i) => i >= 0)
  let rem = n
  while (rem > 2) {
    rem -= leaves.length
    const next = []
    for (const l of leaves) for (const nb of adj[l]) if (--deg[nb] === 1) next.push(nb)
    leaves = next
  }
  const enc = (v, p) => '(' + adj[v].filter((x) => x !== p).map((x) => enc(x, v)).sort().join('') + ')'
  return leaves.map((c) => enc(c, -1)).sort()[0]
}

export const sameStructure = (a, b) => canonical(toAdj(a)) === canonical(toAdj(b))
