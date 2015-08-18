var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');
var request = require('request');
var methodOverride = require('method-override');
var ejsLayouts = require('express-ejs-layouts');
var session = require('express-session');
var flash = require('connect-flash');
var Zillow  = require('node-zillow')
var zwsid = process.env.ZILLOW_KEY
var zillow = new Zillow(zwsid)
var app = express();
var instagram = require('instagram-node').instagram();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);
app.use(session({
  secret:"o12i3qwreaq3roj4t5haw4",
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.get("/signup", function(req,res){
  // TODO: ENTER CODE HERE
  res.render('main/signup');
});

app.post("/signup", function(req, res){
    // TODO: ENTER CODE HERE
})

app.get("/login", function(req,res){
    // TODO: ENTER CODE HERE
    res.render('main/login');
});

app.get("/favorites", function(req,res){
    // TODO: ENTER CODE HERE
    res.render('main/favorites');
})

app.get("/", function(req, res) {

var params = {
  address: "106 NW 42nd St",
  citystatezip: "Seattle, WA 98107"
  // city: 'Seattle',
  // state: 'WA',
  // zip: '98107'
};

// var zip = req.body.zip_code


var zpid = zillow.callApi('GetSearchResults', params)
  .then(function(result){
    var id = result.response[0].results[0].result[0].zpid[0]

    var parameters = {
      zpid: parseInt(id)
    };
    //var zpid = parseInt(id)
  zillow.callApi('GetUpdatedPropertyDetails', parameters)
      .then(function(data) {
        var results = data.response
        console.log(results)
      })
    });

// zillow.getDemographics({zip: '98107'})
//   .then(function(data) {
//     //LATITUDE
//     //var results = data.response[0].region[0].latitude[0]
//     //LONGITUDE
//     //var results = data.response[0].region[0].longitude[0]


//     console.log(results);
//   })

res.render('main/index')
});






app.get("/:id/results", function(req, res){
  // TODO: ENTER CODE HERE
  res.render('main/results')
});


// instagram.use({
//   client_id:'2abce53e983e40ab88c6cc465ae221cf',
//   client_secret:'d67c163621454349a4449625b745af33'
// });

// app.get('/',function(req, res){
//   instagram.meda_popular(function(err, medias, remaining, limit){
//     res.render('main/results/', {grams: medias })
//   });
// });


app.listen(3000)