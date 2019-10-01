var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node.JS + Express' });
});

module.exports = router;

// MongoDB get all of the Users from the Users collection & render information in views/mongodb.ejs

router.get('/mongodb', function (request, response) {
  mongodb.MongoClient.connect(process.env.MONGODB_URI, { "useNewUrlParser": true, "useUnifiedTopology": true }, function(err, client) {

    if(err) throw err;

    // Get Users collection
    var db = client.db('heroku_v1ch6rsq');  // in v3 we need to get the db from the client
    var Users = db.collection('Users');

    // Get all documents from Users collection
    Users.find().toArray(function (err, docs) {
      if(err) throw err;
      response.render('mongodb', {results: docs});
    });

    // Close connection when your app is terminating.
    client.close(false,function (err) {
      if(err) throw err;
    });
  });//end of connect
});//end app.get
