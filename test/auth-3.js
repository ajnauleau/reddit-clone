var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var agent = chai.request.agent(server);

var User = require('../models/user');

// logout
it('should be able to logout', done => {
  agent.get('/logout').end(function(err, res) {
    res.should.have.status(200);
    res.should.not.have.cookie('nToken');
    done();
  });
});
