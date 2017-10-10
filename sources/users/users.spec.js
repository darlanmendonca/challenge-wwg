const {request, expect} = require('chai')
const app = require('../index.js')

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
