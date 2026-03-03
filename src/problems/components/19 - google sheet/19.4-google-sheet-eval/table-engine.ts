// @ts-ignore
import {
    CYCLE as _CYCLE,
    ERROR as _ERROR,
    tokenize,
    toRpn,
    evalRpn as _evalRpn,
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

        // TODO: Update the value by evaluating the cell directly.
        // Replace this placeholder with: `this._evalCell(id)`
        this.#value.set(id, raw)

        const changed = [id]
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

    _parseNumericCellValue(_id: CellId): { ok: true; n: number } | { ok: false; err: string } {
        // TODO: Step 1 - Build Numeric Parser
        // 1. Fetch the value from the engine. If it's blank, resolve ok to `0`.
        // 2. If the value starts with `#` (like `#CYCLE!` or `#DIV/0!`), early-return the inherited error down the chain!
        // 3. Otherwise, cast to Number. If it is NOT finite, return an `#ERROR`. 
        // 4. Return the valid parsed number!
        throw new Error('TODO: Parse target cell ID logic into numeric or string error object')
    }

    // Exposed for 19.4 testing instead of full recompute loop
    _evalCell(_id: CellId): string {
        // TODO: Step 2 - Build the Evaluation Pipeline
        // 1. Fetch `#raw` text. If it doesn't start with `=`, just return the raw text.
        // 2. Fetch the `#compiled` properties for this cell. If it failed to compile in 19.2, it contains an `{ error }` to return!
        // 3. Finally, run the `evalRpn` library utility, passing in your RPN formula stream 
        //    AND `this._parseNumericCellValue.bind(this)` to serve as the external data lookup adapter!
        throw new Error('TODO: Run evalRpn on the referenced compiled cell tokens using _parseNumericCellValue context')
    }

    // We are copying Topo into the class early here, preparing for 19.5
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
}
