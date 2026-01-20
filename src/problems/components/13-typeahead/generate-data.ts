const FRUITS = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Honeydew',
  'Kiwi',
  'Lemon',
  'Mango',
  'Nectarine',
  'Orange',
  'Papaya',
  'Quince',
  'Raspberry',
  'Strawberry',
  'Tangerine',
  'Ugli Fruit',
  'Watermelon',
  'Apricot',
  'Blackberry',
  'Blueberry',
  'Cantaloupe',
  'Dragonfruit',
  'Grapefruit',
  'Guava',
  'Lime',
  'Lychee',
  'Passion Fruit',
  'Peach',
  'Pear',
  'Pineapple',
  'Plum',
  'Pomegranate',
  'Starfruit',
  'Avocado',
  'Coconut',
  'Cranberry',
  'Durian',
]

const ADJECTIVES = [
  'Sweet',
  'Sour',
  'Fresh',
  'Ripe',
  'Juicy',
  'Tart',
  'Delicious',
  'Tasty',
  'Yummy',
  'Bitter',
  'Green',
  'Red',
  'Yellow',
  'Purple',
  'Orange',
  'Blue',
  'Small',
  'Large',
  'Giant',
  'Tiny',
]

const generateData = () => {
  const data = []
  let id = 1

  // Generate simple combinations to reach 1000
  for (let i = 0; i < 25; i++) {
    // Loop to create duplicates with variations
    for (const fruit of FRUITS) {
      for (const adj of ADJECTIVES) {
        if (data.length >= 1000) break
        data.push({
          id: String(id++),
          query: `${adj} ${fruit}`,
          value: `${adj} ${fruit} (Item #${id})`,
        })
      }
      if (data.length >= 1000) break
    }
  }

  // Fill remaining if any (fallback)
  while (data.length < 1000) {
    data.push({
      id: String(id++),
      query: `Generic Item ${id}`,
      value: `Generic Item ${id}`,
    })
  }

  return data
}

import fs from 'fs'
import path from 'path'

const data = generateData()
const outputPath = path.join(__dirname, 'data.json')

fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
console.log(`Generated ${data.length} entries to ${outputPath}`)
