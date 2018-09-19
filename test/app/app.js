/*

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

/* Mongoose Connection */

const mongoose = require('mongoose');
assert = require('assert');

const url = 'mongodb://localhost/reddit-clone';
mongoose.Promise = global.Promise;
mongoose.connect(
  url,
  { useNewUrlParser: true },
  function(err, db) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    // db.close(); turn on for testing
    insertDocuments(db, function() {
      db.close();
    });
  }
);
mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection Error:')
);
mongoose.set('debug', true);
