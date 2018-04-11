const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const Signature = require('./models/signature.js')
const app = express();
const localdburl = 'mongodb://localhost:27017/signatures';
const dburl = process.env.MONGOLAB_URI || "";
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', (req,res) =>{
    res.json('you did it')
});

app.get('/api/signatures', (req,res)=>{
    Signature.find({}).then(eachOne => {
        res.json(eachOne);
    })
});

app.post('/api/signatures', function(req, res) {
    console.log('signature ' +  req.body.SignatureOfGuest + ' message ' + req.body.MessageofGuest);
    Signature.create({
      guestSignature: req.body.SignatureOfGuest,
      message: req.body.MessageofGuest,
    }).then(signature => {
      res.json(signature)
    });
  });

  mongoose.connect(dburl, (err, db) => {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', dburl);
    }
   });

app.listen(port,()=>{
    console.log(`listening on ${port}`);
});