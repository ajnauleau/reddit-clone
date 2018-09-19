var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var agent = chai.request.agent(server);

var User = require('../models/user');
// test/posts.js

before(done => {
  agent
    .post('/login')
    .send({ username: 'userN', password: 'passW' })
    .end(function(err, res) {
      done();
    });
});

it('should not be able to post', done => {
  agent
    .post('/posts/new', {
      title: 'String', //required
      url: 'http://url.com', //required
      summary: 'String', //required
      comments: '5ba1f3dcb1cf412189a43010',
      author: '5ba1f3dcb1cf412189a43010',
    })
    .end(function(err, res) {
      res.status.should.be.equal(401);
      done();
    });
});
