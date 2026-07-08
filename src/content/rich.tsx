/**
 * Rich — randează un string de conținut cu markup de accent `[[...]]`.
 * `[[cuvânt]]` → accent(cuvânt, i) (fără `accent` → span simplu).
 * `\n` în text → <br />. Zero dependențe; nu adaugă stiluri proprii.
 */
import { Fragment, type ReactNode } from 'react'

function withBreaks(chunk: string, key: string): ReactNode {
  const lines = chunk.split('\n')
  if (lines.length === 1) return chunk
  return lines.map((l, i) => (
    <Fragment key={`${key}-${i}`}>
      {i > 0 && <br />}
      {l}
    </Fragment>
  ))
}

export function Rich({
  text,
  accent,
  ...rest
}: {
  text: string
  accent?: (chunk: string, i: number) => ReactNode
  [k: string]: unknown
}) {
  const parts = text.split(/\[\[(.*?)\]\]/g) // indecșii impari = accente
  let a = 0
  return (
    <span {...rest}>
      {parts.map((p, i) => {
        if (i % 2 === 1) {
          const n = a++
          return <Fragment key={i}>{accent ? accent(p, n) : <span>{p}</span>}</Fragment>
        }
        return <Fragment key={i}>{withBreaks(p, String(i))}</Fragment>
      })}
    </span>
  )
}
