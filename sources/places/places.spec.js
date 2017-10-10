const {request, expect} = require('chai')
const app = require('../index.js')

describe('Places', () => {
  describe('.list - GET /places', () => {
    it('should have a status 200', (done) => {
      request(app)
        .get('/places')
        .end((err, res) => {
          expect(res).to.be.json
          done()
        })
    })

    it('should be a json', (done) => {
      request(app)
        .get('/places')
        .end((err, res) => {
          expect(res).to.be.json
          done()
        })
    })

    it('should have a body json', (done) => {
      request(app)
        .get('/places')
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          done()
        })
    })

    it('should have keys name, and lastname', (done) => {
      request(app)
        .get('/places')
        .end((err, res) => {
          expect(res.body).all.have.property('name')
          expect(res.body).all.have.property('category')
          expect(res.body).all.not.have.property('__v')
          done()
        })
    })

    it('should filter fields', (done) => {
      request(app)
        .get('/places')
        .set('filters', 'name')
        .end((err, res) => {
          expect(res.body).all.have.property('name')
          expect(res.body).all.not.have.property('category')
          done()
        })
    })
  })
})
