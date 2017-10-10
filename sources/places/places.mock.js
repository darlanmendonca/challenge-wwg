const faker = require('faker')
let places = [...Array(20).keys()]
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
  .from(new Set(places))
  .map(name => {
    const randomIndex = parseInt(Math.random() * categories.length)
    const category = categories[randomIndex]
    return {name, category}
  })

module.exports = mock

