const {request, expect} = require('chai')
const app = require('../index.js')

describe('Votes', () => {
  describe('.vote - POST /users/vote', () => {
    const user = require('../users/users.mock.js')
    const places = require('../places/places.mock.js')

    it('required token', (done) => {
      request(app)
        .get('/users/vote')
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message', 'required token')
          done()
        })
    })

    it('invalid token from query', (done) => {
      request(app)
        .get('/users/vote')
        .query({authorization: user.invalidToken})
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message', 'invalid token')
          done()
        })
    })

    it('invalid token from body', (done) => {
      request(app)
        .get('/users/vote')
        .field('authorization', user.invalidToken)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message', 'invalid token')
          done()
        })
    })

    it('invalid token from header', (done) => {
      request(app)
        .get('/users/vote')
        .set('authorization', user.invalidToken)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message', 'invalid token')
          done()
        })
    })

    it('should be bad request if missing fields', (done) => {
      request(app)
        .post('/users/vote')
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(401)
          done()
        })
    })

    it('should create a vote', (done) => {
      request(app)
        .post('/users/vote')
        .set('authorization', user.token)
        .send({places: [places[0].id]})
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('message', 'created')
          done()
        })
    })

    it('should update vote if vote again', (done) => {
      request(app)
        .post('/users/vote')
        .set('authorization', user.token)
        .send({places: [places[0].id]})
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('message', 'updated')
          done()
        })
    })
  })
})
