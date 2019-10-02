var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node.JS + Express' });
});

module.exports = router;

// MongoDB get all of the documents from the collection & render information in views/mongodb.ejs
router.get('/mongodb', function (request, response) {
  mongodb.MongoClient.connect(process.env.MONGODB_URI, { "useNewUrlParser": true, "useUnifiedTopology": true }, function(err, client) {

    if(err) throw err;

    // Get the collection
    var db = client.db(process.env.MONGODB_DBNAME);
    var collection = db.collection(process.env.MONGODB_COLLECTION);

    // Get all documents from the collection
    collection.find().toArray(function (err, docs) {
      if(err) throw err;
      response.render('mongodb', {results: docs});
    });

    // Close connection when your app is terminating.
    client.close(false,function (err) {
      if(err) throw err;
    });
  });//end of connect
});//end app.get
