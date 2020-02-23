const express = require('express');
const body_parser = require('body-parser');
const router = require('express').Router();

const app = express()

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended : true}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(function(err, req, res, next){
    if(err.name === 'ValidationError'){
      return res.status(422).json({
        errors: Object.keys(err.errors).reduce(function(errors, key){
          errors[key] = err.errors[key].message;
  
          return errors;
        }, {})
      });
    }
  
    return next(err);
  });

app.use('/authenticate', require('./authenticate'));
//router.use('/profiles', require('./profiles'));

app.get('/',(req,res) => {
    res.send("now using express server");
})

const port = 3000

app.listen(port, () => {
    console.log("running on port: ", port);
})

module.exports=router;
