const {request, expect} = require('chai')
const app = require('../index.js')

describe('.list - GET /users', () => {
  it('should have a status 200', (done) => {
    request(app)
      .get('/users')
      .end((err, res) => {
        expect(res).to.be.json
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

  it('should have a body json', (done) => {
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
        done()
      })
  })
})
