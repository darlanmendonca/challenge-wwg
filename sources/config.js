const configs = {
  test: {
    port: 5000,
    database: 'wwg_test',
    secret: 'kljj4hhsdih.8j32h',
    token: {
      expiresIn: '24h',
    },

  },
  development: {
    port: process.env.PORT || 4000,
    database: 'wwg',
    secret: 'kljj4hhsdih.8j32h',
    token: {
      expiresIn: '24h',
    },
  },
  production: {
    port: 4000,
    database: 'wwg',
    secret: 'tkta0kjxjkur3sor',
    token: {
      expiresIn: '24h',
    },
  },
}

const env = process.env.NODE_ENV || 'production'

module.exports = configs[env]
