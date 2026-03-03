import {
    CYCLE as _CYCLE,
    ERROR,
    tokenize,
    toRpn,
    evalRpn,
    type CellId,
    type Compiled,
} from '../../../../utils/google-sheet-parser'

export type { CellId } from '../../../../utils/google-sheet-parser'

export class TableEngine {
    #raw: Map<CellId, string> = new Map()
    #value: Map<CellId, string> = new Map()
    #deps: Map<CellId, Set<CellId>> = new Map()
    #rev: Map<CellId, Set<CellId>> = new Map()
    #compiled: Map<CellId, Compiled> = new Map()

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

    _affectedFrom(start: CellId): Set<CellId> {
        const affected = new Set<CellId>()
        const queue: CellId[] = [start]

        for (let i = 0; i < queue.length; i++) {
            const id = queue[i]!
            if (affected.has(id)) continue
            affected.add(id)
            for (const dep of this.#getRevDeps(id)) queue.push(dep)
        }

        return affected
    }

    _topoSort(affected: Set<CellId>): { order: CellId[]; cyclic: Set<CellId> } {
        const inDegree = new Map<CellId, number>()

        for (const id of affected) {
            let deg = 0
            for (const dep of this.#getDeps(id)) {
                if (affected.has(dep)) deg++
            }
            inDegree.set(id, deg)
        }

        const queue: CellId[] = []
        for (const [id, deg] of inDegree) {
            if (deg === 0) queue.push(id)
        }

        const order: CellId[] = []
        for (let i = 0; i < queue.length; i++) {
            const id = queue[i]!
            order.push(id)

            for (const dependent of this.#getRevDeps(id)) {
                if (!affected.has(dependent)) continue
                const next = (inDegree.get(dependent) ?? 0) - 1
                inDegree.set(dependent, next)
                if (next === 0) queue.push(dependent)
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

    #parseNumericCellValue(id: CellId): { ok: true; n: number } | { ok: false; err: string } {
        const v = this.#value.get(id)
        if (!v) return { ok: true, n: 0 }
        const n = Number(v)
        if (Number.isNaN(n)) return { ok: false, err: v }
        return { ok: true, n }
    }

    _evalCell(id: CellId): string {
        const compiled = this.#compiled.get(id)

        if (compiled == null) {
            return this.#raw.get(id) ?? ''
        }
        if ('error' in compiled) {
            return ERROR
        }

        return evalRpn(compiled.rpn, (refId) => this.#parseNumericCellValue(refId))
    }

    #recomputeFrom(_start: CellId): CellId[] {
        // TODO: Step 1 - Recomputation Pipeline
        // 1. Pass the edited `start` cell `id` into `#affectedFrom`. 
        // 2. Pass that output into `#topoSort`.
        // 3. Create a `changed` array.
        // 4. Iterate over the `cyclic` array outputted from your Topo sort, and force update 
        //    their `engine.#value` maps to `#CYCLE!`. Push them to `changed`.
        // 5. Iterate over the chronological `order` timeline outputted from your Topo sort. 
        //    Ensure the cell is not in the circular array, then run `this.#evalCell()` on it! 
        //    Update its `engine.#value` to whatever the AST computed. Push to `changed`!
        // 6. Return the `changed` array!
        throw new Error('TODO: Combine affectedFrom, topoSort, and evalCell into recompute pipeline!')
    }
}
