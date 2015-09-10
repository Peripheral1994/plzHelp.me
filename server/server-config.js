var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var serverUtils = require('./serverUtils.js');
var path = require('path');
var models = require('./db/orm-model.js');
var models = models();
var ServiceProvider = models.ServiceProvider;
var Client = models.Client;
var Project = models.Project;


app.use('/', express.static("./client"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//↓↓↓↓↓↓REQUESTS↓↓↓↓↓↓
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// get all closed projects
app.get('/closedProj',function(req, res){  //WORKING
  var withAttr = {isActive:false};
  serverUtils.getAll(req, res, Project, withAttr);
});

// get open projs for specific servProv
app.get('/providerOpenProj', function(req, res){
  var withAttr = {
    isActive:true, 
    ServiceProviderId: req.query.ServiceProviderUserId //this is what I will need
  };  
  serverUtils.getAll(req, res, Project, withAttr);
});

//get closed projs for specific servProv
app.get('/providerClosedProj', function(req, res){
  var withAttr = {
    isActive:false,
    ServiceProviderUserId: req.query.ServiceProviderUserId
  };  
  serverUtils.getAll(req, res, Project, withAttr);
});

// get closed projects for a SPECIFIC USER
app.get('/clientClosedProj', function(req, res){
  var withAttr = {
    isActive: false,
    ClientUserId: req.query.ClientUserId 
  };  
  serverUtils.getAll(req, res, Project, withAttr);
});

// get open projs for a SPECIFIC USER
app.post('/clientOpenProj', function(req, res){
  var withAttr = {
    isActive: true,
    ClientUserId: req.body.user_id
  };  
  serverUtils.getAll(req, res, Project, withAttr);
});

app.post('/clientAllProj', function(req, res){
  var withAttr = {
    ClientUserId: req.body.user_id
  }
  serverUtils.getAll(req, res, Project, withAttr);
});

// close proj (set from active from true to false)
app.post('/closeProj', function(req, res){
  var newValues = {
    isActive: false,  
  };
  var withAttr =  {
    isActive: true,
    id: req.body.id
  };
  serverUtils.updateInstance(req, res, Project, newValues, withAttr);
});

// add servProvID to open proj (STILL NEED TODO)
app.post('/providerAcceptProj', function(req, res){
  var newValues = { //need value below to associate them
    ServiceProviderUserId: req.body.ServiceProviderUserId
  };
  var withAttr = {
    id:req.body.id
  };
  serverUtils.updateInstance(req, res, Project, newValues, withAttr);
});

//create new Client
app.post('/createUser', function(req, res){
  var attributes = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    gravatar: req.body.gravatar,
    user_id: req.body.user_id,
    phone: req.body.phone
  };
  serverUtils.createInstance(req, res, Client, attributes);
});

//create new ServiceProvider
app.post('/createServiceProvider', function(req, res){
  var attributes = {
     businessName: req.body.businessName,
     poc: req.body.poc,
     email: req.body.email,
     address: req.body.address,
     city: req.body.city,
     state: req.body.state,
     zipcode: req.body.zipcode,
     phone: req.body.phone,
     specialty: req.body.specialty,
     user_id: req.body.user_id,
     gravatar: req.body.gravatar
  };
  serverUtils.createInstance(req, res, ServiceProvider, attributes);
});

//creates a new Project
app.post('/createProject', function(req, res){  
  // console.log('description', req.body.description);
  // console.log('DATE', req.body.date);
  // console.log(req.body);
  var attributes = {
    description: req.body.description,
    date: req.body.date,
    address: req.body.address,
    name: req.body.name,
    phone: req.body.phone,
    time: req.body.time,
    category: req.body.category,
    isActive: true,
    ClientUserId: req.body.ClientUserId
  };

  serverUtils.createInstance(req, res, Project, attributes)
});

// get all open projs
app.post('/openProj',function(req, res){ 
  var withAttr = {isActive:true};
  serverUtils.getAll(req, res, Project, withAttr);
});

// get all open projs in a certain category
app.post('/openProjwCat',function(req, res){ 
  console.log('fjdsalkfjlds;kfjl;kdasjflkdsjlkfasj;lfads', req.body);
  var withAttr = {isActive:true, category: req.body.category};
  serverUtils.getAll(req, res, Project, withAttr);
});


// UNUSED ROUTES SO FAR
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓


//get client info
app.post('/clientInfo', function(req, res){
  var withAttr = {
    user_id: req.body.user_id
  };
  serverUtils.getOne(req, res, Client, withAttr);
});

//get ServiceProvider info
app.post('/serviceProviderInfo', function(req, res){
  var withAttr = {
    //attr to associate with serviceProvider such as spID
    // businessName: req.body.businessName,
    user_id: req.body.user_id            //either will work
  };
  serverUtils.getOne(req, res, ServiceProvider, withAttr);
});


module.exports = app;