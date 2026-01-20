const ALPHABET_SIZE = 27
const ALPHABET_START_INDEX = 'a'.charCodeAt(0)

const fromCharToIndex = (char: string) => {
  if (char === ' ') return ALPHABET_SIZE - 1
  const code = char.charCodeAt(0)
  if (code < ALPHABET_START_INDEX || code > ALPHABET_START_INDEX + ALPHABET_SIZE - 2) {
    throw Error('Invalid character')
  }
  return code - ALPHABET_START_INDEX
}
const normilise = (word: string) => word.toLowerCase()

class TrieNode<T> {
  constructor(
    public value: T | null = null,
    public isEnd: boolean = false,
    public index: Array<TrieNode<T> | undefined> = Array(ALPHABET_SIZE),
  ) {}
}

export class Trie<T> {
  private root: TrieNode<T>

  constructor() {
    this.root = new TrieNode<T>(null)
  }

  insert(word: string, value: T) {
    if (word.length === 0) {
      return
    }
    word = normilise(word)
    let node = this.root
    for (const char of word) {
      const index = fromCharToIndex(char)
      if (node.index[index] == null) {
        node.index[index] = new TrieNode<T>()
      }
      node = node.index[index]!
    }
    node.isEnd = true
    node.value = value
  }

  get(word: string): TrieNode<T> | null {
    word = normilise(word)
    let node = this.root
    for (const char of word) {
      const index = fromCharToIndex(char)
      if (node.index[index] == null) {
        return null
      }
      node = node.index[index]!
    }
    return node
  }

  contains(word: string) {
    return this.get(word)?.isEnd ?? false
  }

  getWithPrefix(prefix: string): Array<T> {
    prefix = normilise(prefix)
    const node = this.get(prefix)
    if (node == null) return []
    return this.#collect(node.isEnd && node.value != null ? [node.value] : [], node)
  }

  #collect(acc: Array<T>, node: TrieNode<T>): Array<T> {
    for (const n of node.index) {
      if (n == null) continue
      if (n.isEnd && n.value) {
        acc.push(n.value)
      }
      this.#collect(acc, n)
    }
    return acc
  }
}
