import { AbstractComponent } from '../00-abstract-component/component'
import { Trie } from './trie'
import styles from './typeahead.module.css'
import type { TTypeaheadEntry } from './typeahead.react'

type TTypeaheadProps = {
  id?: string
  onQuery: (query: string) => Promise<TTypeaheadEntry<any>[]>
  itemRender?: (item: TTypeaheadEntry<any>) => string
}

export class Typeahead extends AbstractComponent<TTypeaheadProps> {
  private trie: Trie<TTypeaheadEntry<any>>
  private items: TTypeaheadEntry<any>[] = []
  private query: string = ''
  private isLoading: boolean = false

  constructor(config: TTypeaheadProps & { root: HTMLElement }) {
    super({ ...config, listeners: ['input'] })
    this.trie = new Trie()
    this.config.id = this.config.id || 'typeahead-vanilla'
  }

  private get itemRender() {
    return this.config.itemRender || ((item: TTypeaheadEntry<any>) => item.id)
  }

  private updateTrie(entries: TTypeaheadEntry<any>[]) {
    entries.forEach((entry) => {
      this.trie.insert(entry.query, entry)
    })
  }

  private updateVisibleItems() {
    this.items = this.trie.getWithPrefix(this.query)
    this.renderList()
  }

  public onInput(e: Event) {
    const target = e.target as HTMLInputElement
    if (!target.matches('input')) return

    this.query = target.value
    this.updateVisibleItems()
    this.fetchSuggestions()
  }

  private async fetchSuggestions() {
    this.isLoading = true
    this.renderList() // Update loading state UI

    const timestamp = Date.now()
    this.lastRequestTimestamp = timestamp

    try {
      const entries = await this.config.onQuery(this.query)
      if (this.lastRequestTimestamp !== timestamp) return

      this.updateTrie(entries)
      this.updateVisibleItems()
    } catch (error) {
      console.error(error)
    } finally {
      if (this.lastRequestTimestamp === timestamp) {
        this.isLoading = false
        this.renderList()
      }
    }
  }

  // Track last request time for race condition
  private lastRequestTimestamp: number = 0

  toHTML() {
    return `
            <section class="${styles.container}">
                <div role="status" class="${styles.visuallyHidden}" aria-live="polite">
                    ${this.items.length} results available.
                </div>
                <input 
                    id="${this.config.id}"
                    role="combobox" 
                    aria-autocomplete="list" 
                    aria-expanded="false" 
                    aria-controls="${this.config.id}-listbox"
                    class="${styles.input}" 
                    type="text" 
                    value="${this.query}" 
                />
                <ul id="${this.config.id}-listbox" role="listbox" class="${styles.list}" style="display: none;">
                </ul>
            </section>
        `
  }

  private renderList() {
    if (!this.container) return
    const list = this.container.querySelector(`.${styles.list}`) as HTMLElement
    const input = this.container.querySelector(`.${styles.input}`) as HTMLInputElement
    const status = this.container.querySelector(`.${styles.visuallyHidden}`) as HTMLElement
    if (!list || !input || !status) return

    const show = this.items.length > 0 || this.isLoading
    list.style.display = show ? 'grid' : 'none'
    input.setAttribute('aria-expanded', String(this.items.length > 0))
    status.textContent = `${this.items.length} results available.`

    let html = this.items
      .map(
        (item) => `
            <li tabindex="0" role="option" aria-selected="false" class="${styles.item}" data-id="${item.id}">
                ${this.itemRender(item)}
            </li>
        `,
      )
      .join('')

    if (this.isLoading) {
      html += `<li role="status" class="${styles.item}" style="color: #888">Loading...</li>`
    }

    list.innerHTML = html
  }
}
