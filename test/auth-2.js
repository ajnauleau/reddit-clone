var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var agent = chai.request.agent(server);

var User = require('../models/user');

// signup
it('should be able to signup', done => {
  User.findOneAndRemove({ username: 'userN' }, function() {
    agent
      .post('/sign-up')
      .send({ username: 'userN', password: 'passW' })
      .end(function(err, res) {
        console.log(res.body);
        res.should.have.status(200);
        res.should.have.cookie('nToken');
        done();
      });
  });
});
