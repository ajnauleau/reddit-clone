var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var agent = chai.request.agent(server);

var User = require('../models/user');

it('should not be able to login if they have not registered', done => {
  agent
    .post('/login', { username: 'userman', password: 'nope' })
    .end(function(err, res) {
      res.status.should.be.equal(401);
      done();
    });
});
