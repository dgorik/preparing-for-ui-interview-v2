import {
    tokenize as _tokenize,
    toRpn as _toRpn,
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
        this.#value.set(id, raw) // Set value as raw text for now (no evaluation yet)

        // TODO: Step 4 - Tie it together
        // const deps = this.#compile(id, raw)
        // this.#setDeps(id, deps)

        // Return { changed: [id] }
        throw new Error('TODO: compile and track dependencies')
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

    // @ts-ignore
    #setDeps(_id: CellId, _nextDeps: Set<CellId>) {
        // TODO: Step 3 - Dependency Diffing
        // 1. Grab `prevDeps` from state
        // 2. For every old dependency no longer present in the new set, *delete* `id` from that dependency's #revDeps
        // 3. For every new dependency not present in the old set, *add* `id` to that dependency's #revDeps
        // 4. Forcefully update the #deps map with your new `nextDeps`!
        throw new Error('TODO: Update dependency and reverse dependency maps')
    }

    // @ts-ignore
    #compile(_id: CellId, _raw: string): Set<CellId> {
        // TODO: Step 1 - Handle raw string
        // Check if raw starts with `=`. If not, delete any compiled state for this id and return an empty Set.

        // TODO: Step 2 - Parser Pipeline
        // Run tokenize() and toRpn(). If either returns `ok: false`, save the `{ error: xxx }` state 
        // to the #compiled map and return an empty Set.

        // TODO: Step 3 - Extract References (Graph Nodes)
        // Iterate over the final RPN tokens. If a token is of type `ref`, add its `id` to your dependencies set!
        // Save the successful compiled { rpn } state to your map, and return the dependencies set.
        throw new Error('TODO: Use tokenize and toRpn to compile expression into RPN tokens')
    }

    // Exposed for testing
    _getCompiled(id: CellId): Compiled | undefined {
        return this.#compiled.get(id)
    }
}
