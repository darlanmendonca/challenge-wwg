const {request, expect} = require('chai')
const app = require('../index.js')

describe('Users', () => {
  describe('.list - GET /users', () => {
    it('should have a status 200', (done) => {
      request(app)
        .get('/users')
        .end((err, res) => {
          expect(res).to.have.status(200)
          done()
        })
    })

    it('should be a json', (done) => {
      request(app)
        .get('/users')
        .end((err, res) => {
          expect(res).to.be.json
          done()
        })
    })

    it('should have an array as body', (done) => {
      request(app)
        .get('/users')
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          done()
        })
    })

    it('should have keys _id, and email', (done) => {
      request(app)
        .get('/users')
        .end((err, res) => {
          expect(res.body).all.have.property('_id')
          expect(res.body).all.have.property('email')
          expect(res.body).all.not.have.property('password')
          expect(res.body).all.not.have.property('__v')
          done()
        })
    })
  })

  describe('.signup - POST /users', () => {
    it('should be bad request if missing fields', (done) => {
      request(app)
        .post('/users')
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(400)
          done()
        })
    })

    it('should signup with email and password', (done) => {
      const faker = require('faker')

      request(app)
        .post('/users')
        .field('email', faker.internet.email())
        .field('password', faker.internet.password())
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('message', 'created')
          done()
        })
    })
  })

  describe('.authenticate - POST /users/authenticate', () => {
    const user = require('./users.mock.js')

    it('should be invalid', (done) => {
      request(app)
        .post('/users/authenticate')
        .field('email', user.email)
        .field('password', user.invalidPassword)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message', 'invalid credentials')
          done()
        })
    })

    it('should require email', (done) => {
      request(app)
        .post('/users/authenticate')
        .field('email', user.email)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message', 'invalid credentials')
          done()
        })
    })

    it('should require password', (done) => {
      request(app)
        .post('/users/authenticate')
        .field('email', user.email)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message', 'invalid credentials')
          done()
        })
    })

    it('should authenticate', (done) => {
      request(app)
        .post('/users/authenticate')
        .field('email', user.email)
        .field('password', user.password)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('id')
          expect(res.body).to.have.property('token')
          done()
        })
    })
  })
})
