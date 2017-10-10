const faker = require('faker')
let restaurants = [...Array(20).keys()]
  .map(() => faker.name.firstName())

const categories = [
  'Japanese',
  'Mexican',
  'Brasilian',
  'Italian',
  'Food truck',
  'Pub',
]

const mock = Array
  .from(new Set(restaurants))
  .map(name => {
    const randomIndex = parseInt(Math.random() * categories.length)
    const category = categories[randomIndex]
    return {name, category}
  })

module.exports = mock

