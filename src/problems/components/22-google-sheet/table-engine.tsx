/* ============================================================
   TableEngine
============================================================ */

import { CYCLE, DIV0, ERROR, tokenize, toRpn, type CellId, type Compiled } from './utility'

export class TableEngine {
  #raw: Map<CellId, string> = new Map()
  #value: Map<CellId, string> = new Map()
  #deps: Map<CellId, Set<CellId>> = new Map()
  #rev: Map<CellId, Set<CellId>> = new Map()
  #compiled: Map<CellId, Compiled> = new Map()

  /* -------- public API -------- */

  setRaw(id: CellId, raw: string): { changed: CellId[] } {
    this.#raw.set(id, raw)

    const deps = this.#compile(id, raw)
    this.#setDeps(id, deps)

    const changed = this.#recomputeFrom(id)
    return { changed }
  }

  getRaw(id: CellId): string {
    return this.#raw.get(id) ?? ''
  }

  getValue(id: CellId): string {
    return this.#value.get(id) ?? ''
  }

  getDeps(id: CellId): ReadonlySet<CellId> {
    return this.#getDeps(id)
  }

  getRevDeps(id: CellId): ReadonlySet<CellId> {
    return this.#getRevDeps(id)
  }

  /* -------- graph helpers -------- */

  #getDeps(id: CellId): Set<CellId> {
    let s = this.#deps.get(id)
    if (!s) {
      s = new Set<CellId>()
      this.#deps.set(id, s)
    }
    return s
  }

  #getRevDeps(id: CellId): Set<CellId> {
    let s = this.#rev.get(id)
    if (!s) {
      s = new Set<CellId>()
      this.#rev.set(id, s)
    }
    return s
  }

  #setDeps(id: CellId, nextDeps: Set<CellId>) {
    const prevDeps = this.#getDeps(id)

    for (const dep of prevDeps) {
      if (!nextDeps.has(dep)) this.#getRevDeps(dep).delete(id)
    }
    for (const dep of nextDeps) {
      if (!prevDeps.has(dep)) this.#getRevDeps(dep).add(id)
    }

    this.#deps.set(id, nextDeps)
  }

  /* -------- compile -------- */

  #compile(id: CellId, raw: string): Set<CellId> {
    const deps = new Set<CellId>()
    raw = raw.trim()

    if (!raw.startsWith('=')) {
      this.#compiled.set(id, null)
      return deps
    }

    const expr = raw.slice(1).trim()

    const tokens = tokenize(expr)
    if (!tokens.ok) {
      this.#compiled.set(id, { error: tokens.error })
      return deps
    }

    const rpn = toRpn(tokens.tokens)
    if (!rpn.ok) {
      this.#compiled.set(id, { error: rpn.error })
      return deps
    }

    for (const t of rpn.rpn) {
      if (t.t === 'ref') deps.add(t.id)
    }

    this.#compiled.set(id, { rpn: rpn.rpn })
    return deps
  }

  /* -------- evaluation -------- */

  #parseNumericCellValue(id: CellId): { ok: true; n: number } | { ok: false; err: string } {
    const v = (this.#value.get(id) ?? '').trim()
    if (v === '') return { ok: true, n: 0 }
    if (v.startsWith('#')) return { ok: false, err: v }

    const n = Number(v)
    if (!Number.isFinite(n)) return { ok: false, err: ERROR }
    return { ok: true, n }
  }

  #evalCell(id: CellId): string {
    const raw = (this.#raw.get(id) ?? '').trim()
    if (!raw.startsWith('=')) return raw

    const compiled = this.#compiled.get(id)
    if (!compiled) return ERROR
    if ('error' in compiled) return ERROR

    const stack: number[] = []

    for (const tok of compiled.rpn) {
      if (tok.t === 'num') {
        stack.push(tok.v)
        continue
      }

      if (tok.t === 'ref') {
        const parsed = this.#parseNumericCellValue(tok.id)
        if (!parsed.ok) return parsed.err
        stack.push(parsed.n)
        continue
      }

      if (tok.t === 'op') {
        if (tok.op === 'NEG') {
          if (stack.length < 1) return ERROR
          stack.push(-stack.pop()!)
          continue
        }

        if (stack.length < 2) return ERROR
        const b = stack.pop()!
        const a = stack.pop()!

        switch (tok.op) {
          case '+':
            stack.push(a + b)
            break
          case '-':
            stack.push(a - b)
            break
          case '*':
            stack.push(a * b)
            break
          case '/':
            if (b === 0) return DIV0
            stack.push(a / b)
            break
          default:
            return ERROR
        }
      }
    }

    if (stack.length !== 1) return ERROR
    const result = Object.is(stack[0], -0) ? 0 : stack[0]
    return String(result)
  }

  #affectedFrom(start: CellId): Set<CellId> {
    const affected = new Set<CellId>()
    const q: CellId[] = [start]

    for (let i = 0; i < q.length; i++) {
      const id = q[i]!
      if (affected.has(id)) continue
      affected.add(id)
      for (const dep of this.#getRevDeps(id)) q.push(dep)
    }

    return affected
  }

  #topo(affected: Set<CellId>): { order: CellId[]; cyclic: Set<CellId> } {
    const inDegree = new Map<CellId, number>()

    for (const id of affected) {
      let deg = 0
      for (const dep of this.#getDeps(id)) {
        if (affected.has(dep)) deg++
      }
      inDegree.set(id, deg)
    }

    const q: CellId[] = []
    for (const [id, deg] of inDegree) {
      if (deg === 0) q.push(id)
    }

    const order: CellId[] = []
    for (let i = 0; i < q.length; i++) {
      const id = q[i]!
      order.push(id)

      for (const dependent of this.#getRevDeps(id)) {
        if (!affected.has(dependent)) continue
        const next = (inDegree.get(dependent) ?? 0) - 1
        inDegree.set(dependent, next)
        if (next === 0) q.push(dependent)
      }
    }

    const cyclic = new Set<CellId>()
    if (order.length !== affected.size) {
      const inOrder = new Set(order)
      for (const id of affected) {
        if (!inOrder.has(id)) cyclic.add(id)
      }
    }

    return { order, cyclic }
  }

  /* -------- recompute -------- */

  #recomputeFrom(start: CellId): CellId[] {
    const affected = this.#affectedFrom(start)
    const { order, cyclic } = this.#topo(affected)

    const changed: CellId[] = []

    for (const id of cyclic) {
      const prev = this.#value.get(id) ?? ''
      if (prev !== CYCLE) {
        this.#value.set(id, CYCLE)
        changed.push(id)
      }
    }

    for (const id of order) {
      if (cyclic.has(id)) continue

      const prev = this.#value.get(id) ?? ''
      const next = this.#evalCell(id)

      if (prev !== next) {
        this.#value.set(id, next)
        changed.push(id)
      }
    }

    return changed
  }
}
