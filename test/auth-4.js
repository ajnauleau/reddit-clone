var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var agent = chai.request.agent(server);

var User = require('../models/user');

// login
it('should be able to login', done => {
  agent
    .post('/login')
    .send({ username: 'userN', password: 'passW' })
    .end(function(err, res) {
      res.should.have.status(200);
      //res.should.have.cookie('nToken'); waiting on cookies to work
      done();
    });
});
