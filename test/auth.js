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

/*
var testLogin = function('User', function()) {
  it('should not be able to login if they have not registered', done => {
    agent
      .post('/login', { email: 'wrong@wrong.com', password: 'nope' })
      .end(function(err, res) {
        res.status.should.be.equal(401);
        done();
      });
  });
});

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log('Inserted 3 documents into the collection');
    callback(result);
  });
};

*/
