require('chai')
  .use(require('chai-http'))
  .use(require('chai-things'))

const {request, expect} = require('chai')
const app = require('../index.js')

describe('.list - GET /users', () => {
  it('list users', (done) => {
    request(app)
      .get('/users')
      .end((err, res) => {
        expect(res).to.be.json
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        done()
      })
  })
})
