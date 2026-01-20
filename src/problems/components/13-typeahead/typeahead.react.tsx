import { useCallback, useDeferredValue, useEffect, useRef, useState } from 'react'
import { Trie } from './trie'
import styles from './typeahead.module.css'

export type TTypeaheadEntry<T> = {
  query: string
  id: string
  value: T
}

type TTypeaheadProps<T> = {
  id?: string
  entries?: TTypeaheadEntry<T>[]
  onQuery: (query: string) => Promise<TTypeaheadEntry<T>[]>
  itemRender: (item: TTypeaheadEntry<T>) => React.ReactNode
}

const DEFAULT_ITEM_RENDER = (item: TTypeaheadEntry<any>) => item.id
const DEFAULT_ENTRIES: TTypeaheadEntry<any>[] = []

export function Typeahead<T>({
  id = 'typeahead',
  entries = DEFAULT_ENTRIES,
  onQuery,
  itemRender = DEFAULT_ITEM_RENDER,
}: TTypeaheadProps<T>) {
  const trieRef = useRef<Trie<TTypeaheadEntry<T>>>(new Trie<TTypeaheadEntry<T>>())

  const [items, setItems] = useState<TTypeaheadEntry<T>[]>([])
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const deferredQuery = useDeferredValue(query)

  const updateTrie = useCallback(
    (entries: TTypeaheadEntry<T>[]) =>
      entries.forEach((entry) => {
        trieRef.current.insert(entry.query, entry)
      }),
    [],
  )

  const updateVisibleItems = useCallback(() => {
    const trie = trieRef.current
    const items = trie.getWithPrefix(deferredQuery)
    setItems(items)
  }, [deferredQuery])

  const normalizedEntries = entries || DEFAULT_ENTRIES

  useEffect(() => {
    trieRef.current = new Trie<TTypeaheadEntry<T>>()
    updateTrie(normalizedEntries)
  }, [normalizedEntries, updateTrie])

  useEffect(() => {
    updateVisibleItems()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true)

    let ignore = false

    onQuery(deferredQuery)
      .then((entries) => {
        if (ignore) return
        updateTrie(entries)
        updateVisibleItems()
      })
      .finally(() => {
        if (ignore) return
        setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [deferredQuery, onQuery, updateTrie, updateVisibleItems])

  useEffect(() => {
    const id = setInterval(() => {
      trieRef.current = new Trie<TTypeaheadEntry<T>>()
      updateTrie(normalizedEntries)
    }, 60 * 1000)
    return () => clearInterval(id)
  }, [normalizedEntries, updateTrie])

  return (
    <section className={styles.container}>
      <div role="status" className={styles.visuallyHidden} aria-live="polite">
        {items.length} results available.
      </div>
      <input
        id={id}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={items.length > 0}
        aria-controls={`${id}-listbox`}
        className={styles.input}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {(items.length > 0 || isLoading) && (
        <ul id={`${id}-listbox`} role="listbox" className={styles.list}>
          {items.map((item) => (
            <li
              tabIndex={0}
              role="option"
              aria-selected={false}
              key={item.id}
              className={styles.item}
            >
              {itemRender(item)}
            </li>
          ))}
          {isLoading && (
            <li role="status" className={styles.item} style={{ color: '#888' }}>
              Loading...
            </li>
          )}
        </ul>
      )}
    </section>
  )
}
