
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/config');
const url = require('url');

mongoose.connect(config.Key);
const schema = mongoose.Schema;
var myschema = new schema({

name :String,
phone :Number,
address:String,
speacility:String,
timing:String,
services:String,
areahead:String,
longitude:Number,
latitude:Number

});
const app =express();
 const doctorDatabase=  mongoose.model("doctorDatabase",myschema);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(__dirname + '../public'));
app.get('/',(req,res)=>{res.render('apps')});
app.get('/database*',(req,res)=>{
 var query =url.parse(req.url,true).query;

 const data = new doctorDatabase({name:query.doctor,phone:query.phone,address:query.address,speacility:query.speacility,timing:query.timing,services:query.services,areahead:query.areahead,longitude:query.long,latitude:query.lat });
 data.save().then(()=>{console.log("Ok");});
res.send(query.doctor);


});
app.listen('5000');
