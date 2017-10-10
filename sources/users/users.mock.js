const faker = require('faker')

module.exports = {
  email: 'iknownothing@snow.com',
  password: 'ygridiloveyou',

  invalidPassword: faker.internet.password(),
}
