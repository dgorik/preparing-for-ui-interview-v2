import {
  tokenize,
  toRpn,
  type CellId,
  type Compiled,
} from '../../../../../utils/google-sheet-parser'

export type { CellId } from '../../../../../utils/google-sheet-parser'

export class TableEngine {
  #raw: Map<CellId, string> = new Map()
  #value: Map<CellId, string> = new Map()
  #deps: Map<CellId, Set<CellId>> = new Map()
  #rev: Map<CellId, Set<CellId>> = new Map()
  #compiled: Map<CellId, Compiled> = new Map()

  setRaw(id: CellId, raw: string): { changed: CellId[] } {
    this.#raw.set(id, raw)

    // Set value as raw text for now (no computation yet)
    this.#value.set(id, raw)

    const deps = this.#compile(id, raw)
    this.#setDeps(id, deps)

    return { changed: [id] }
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

  // Helper to test if compilation worked
  _getCompiled(id: CellId): Compiled | undefined {
    return this.#compiled.get(id)
  }
}
