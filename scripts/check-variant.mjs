#!/usr/bin/env node
/**
 * check-variant.mjs — validează o variantă de conținut față de default.
 *
 *   node scripts/check-variant.mjs <slug>
 *
 * ERORI (exit 1):  cale care nu există în default (cheile `_*` sunt ignorate,
 *                  la orice nivel), tip nepotrivit, marcaje [[ ]] neechilibrate.
 * AVERTISMENTE (exit 0): raport de lungime față de default >1.6 sau <0.4,
 *                  lungimea listelor diferă, sub 5 căi-frunză modificate.
 * Zero dependențe (Node ESM).
 */
import { readFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const slug = process.argv[2]
if (!slug) {
  console.error('Folosire: node scripts/check-variant.mjs <slug>')
  process.exit(1)
}
if (!/^[a-z0-9-]{1,64}$/.test(slug)) {
  console.error(`Slug invalid: „${slug}" (permis: a-z, 0-9, -, max 64 caractere)`)
  process.exit(1)
}

async function loadJson(path, label) {
  try {
    return JSON.parse(await readFile(path, 'utf8'))
  } catch (e) {
    console.error(`Nu pot citi ${label} (${path}): ${e.message}`)
    process.exit(1)
  }
}

const defaultContent = await loadJson(resolve(root, 'src/content/default.json'), 'conținutul default')
const variant = await loadJson(resolve(root, 'public/variants', slug + '.json'), 'varianta')

const errors = []
const warnings = []
const changes = [] // { path, oldVal, newVal }

const isObj = (x) => typeof x === 'object' && x !== null && !Array.isArray(x)
const typeName = (x) => (x === null ? 'null' : Array.isArray(x) ? 'listă' : typeof x === 'object' ? 'obiect' : typeof x === 'string' ? 'text' : typeof x)

/** [[ ]] echilibrate: fără ]] înainte de [[, fără [[ deschis la final, fără imbricare */
function balancedAccents(s) {
  let depth = 0
  for (let i = 0; i < s.length - 1; i++) {
    const two = s.slice(i, i + 2)
    if (two === '[[') {
      if (depth > 0) return false
      depth++
      i++
    } else if (two === ']]') {
      if (depth === 0) return false
      depth--
      i++
    }
  }
  return depth === 0
}

function checkLeaf(d, v, path) {
  if (typeName(d) !== typeName(v)) {
    errors.push(`tip nepotrivit la „${path}": default e ${typeName(d)}, varianta e ${typeName(v)}`)
    return
  }
  if (typeof v === 'string') {
    if (!balancedAccents(v)) errors.push(`marcaje [[ ]] neechilibrate la „${path}"`)
    if (v !== d) {
      changes.push({ path, oldVal: d, newVal: v })
      if (d.length > 0) {
        const ratio = v.length / d.length
        if (ratio > 1.6 || ratio < 0.4)
          warnings.push(`lungime foarte diferită la „${path}": ${d.length} → ${v.length} caractere (raport ${ratio.toFixed(2)})`)
      }
    }
  } else if (v !== d) {
    changes.push({ path, oldVal: d, newVal: v })
  }
}

function walk(defNode, varNode, path) {
  for (const key of Object.keys(varNode)) {
    if (key.startsWith('_')) continue
    const p = path ? `${path}.${key}` : key
    if (!(key in defNode)) {
      errors.push(`cale inexistentă în default: „${p}"`)
      continue
    }
    const d = defNode[key]
    const v = varNode[key]
    if (isObj(d)) {
      if (!isObj(v)) {
        errors.push(`tip nepotrivit la „${p}": default e obiect, varianta e ${typeName(v)}`)
        continue
      }
      walk(d, v, p)
    } else if (Array.isArray(d)) {
      if (!Array.isArray(v)) {
        errors.push(`tip nepotrivit la „${p}": default e listă, varianta e ${typeName(v)}`)
        continue
      }
      if (v.length !== d.length) warnings.push(`lungimea listei diferă la „${p}": ${d.length} → ${v.length} elemente`)
      v.forEach((item, i) => {
        const ref = d[i] ?? d[0] // elementele în plus se compară cu forma primului element din default
        const ip = `${p}[${i}]`
        if (ref === undefined) return
        if (isObj(ref)) {
          if (!isObj(item)) {
            errors.push(`tip nepotrivit la „${ip}": default e obiect, varianta e ${typeName(item)}`)
            return
          }
          walk(ref, item, ip)
        } else {
          checkLeaf(ref, item, ip)
        }
      })
    } else {
      checkLeaf(d, v, p)
    }
  }
}

walk(defaultContent, variant, '')

if (changes.length < 5) warnings.push(`doar ${changes.length} căi-frunză modificate (sub 5) — varianta pare prea puțin personalizată`)

const short = (s) => {
  const one = String(s).replace(/\n/g, '⏎')
  return one.length > 60 ? one.slice(0, 60) + '…' : one
}

console.log(`Verificare variantă „${slug}" față de src/content/default.json\n`)
console.log(`Modificări (${changes.length}):`)
for (const ch of changes) {
  console.log(`  ✎ ${ch.path}`)
  console.log(`      vechi: ${short(ch.oldVal)}`)
  console.log(`      nou:   ${short(ch.newVal)}`)
}
console.log(`\nErori (${errors.length}):`)
for (const e of errors) console.log(`  ✗ ${e}`)
console.log(`\nAvertismente (${warnings.length}):`)
for (const w of warnings) console.log(`  ⚠ ${w}`)

if (errors.length) {
  console.log('\nRezultat: EȘUAT — corectează erorile de mai sus.')
  process.exit(1)
}
console.log('\nRezultat: OK' + (warnings.length ? ' (cu avertismente)' : ''))
process.exit(0)
