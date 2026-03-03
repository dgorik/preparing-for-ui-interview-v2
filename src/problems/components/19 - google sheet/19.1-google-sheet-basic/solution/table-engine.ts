import type { CellId } from '../../../../../utils/google-sheet-parser'
export type { CellId } from '../../../../../utils/google-sheet-parser'

export class TableEngine {
  #raw: Map<CellId, string> = new Map()
  #value: Map<CellId, string> = new Map()
  #deps: Map<CellId, Set<CellId>> = new Map()
  #rev: Map<CellId, Set<CellId>> = new Map()

  setRaw(id: CellId, raw: string): { changed: CellId[] } {
    this.#raw.set(id, raw)

    // In basic step, value is just the raw text
    this.#value.set(id, raw)

    // For now, no dependent tracking or recalculation in 19.1
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

}
