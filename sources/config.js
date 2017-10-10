const configs = {
  test: {
    port: 5000,
  },
  development: {
    port: process.env.PORT || 4000,
  },
  production: {
    port: 4000,
  },
}

const env = process.env.NODE_ENV || 'production'

module.exports = configs[env]
