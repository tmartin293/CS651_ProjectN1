var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//*************************************************************************
//***** mongodb get all of the Routes in Routes collection where frequence>=1
//      and sort by the name of the route.  Render information in the views/pages/mongodb.ejs

router.get('/mongodb', function (request, response) {
  mongodb.MongoClient.connect('mongodb://heroku_v1ch6rsq:k7r9ljr7sbji70jdaairb6ihvv@ds157857.mlab.com:57857/heroku_v1ch6rsq', function(err, client) {

    if(err) throw err;

    //get collection of routes
    var db = client.db('heroku_v1ch6rsq');  // in v3 we need to get the db from the client
    var Routes = db.collection('Routes');

    //get all Routes with frequency >=1
    Routes.find({ frequency : { $gte: 0 } }).sort({ name: 1 }).toArray(function (err, docs) {
      if(err) throw err;
      response.render('mongodb', {results: docs});
    });

    //close connection when your app is terminating.
    // db.close(function (err) {
    client.close(function (err) {
      if(err) throw err;
    });
  });//end of connect
});//end app.get
