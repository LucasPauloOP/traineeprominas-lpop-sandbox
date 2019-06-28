//constant to use express
const express = require('express');

//constant to use bodyParser
const bodyParser = require('body-parser');

//constant app for export
const app = express();

//import for security jwt
var jwt = require('express-jwt');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

//url base of API
const baseAPI = "/api/v1";
const API_BASE= "/api/v1.1/"; 

const cors = require('cors');
app.use(cors());
app.options('*', cors());

//allows app use body parser
app.use(bodyParser.json());

//connect to bd
const database = require('./database');

// //post hello world on the home screen
// database.connect()
//   .then(() => {

    // app.get(baseAPI, function (req, res) {
    //   res.status(200).send('Hello World!');
    // });

//function to accept RS256 signed tokens
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://jknvlvxs.auth0.com/.well-known/jwks.json'
}),
  audience: 'https://traineeprominas-lpop-sandbox.herokuapp.com/api/v1.1/',
  issuer: 'https://jknvlvxs.auth0.com/',
  algorithms: ['RS256']
});

app.get('/authorized', function (req, res) {
   res.send('Secured Resource');
});

//API routes
app.use(baseAPI, require('./routes/student'));
app.use(baseAPI,require('./routes/user'));
app.use(baseAPI, require('./routes/course'));
app.use(baseAPI, require('./routes/teacher'));
// app.use(baseAPI, require('./routes/login'));

app.use(API_BASE,jwtCheck ,require('./routes/student'));
app.use(API_BASE,jwtCheck ,require('./routes/user'));
app.use(API_BASE,jwtCheck ,require('./routes/course'));
app.use(API_BASE,jwtCheck ,require('./routes/teacher'));

// app.use(API_BASE, auth ,require('./routes/login'));

app.get(baseAPI+'/', function (req, res){
  res.send('Endpoints: \n '+baseAPI+'/user \n '+baseAPI+'/student \n '+baseAPI+'/course \n '+baseAPI+'/teacher');
});

app.get('/'+baseAPI, function (req, res){
  res.send('Endpoints: \n /user \n /student \n /course \n /teacher');
});


//handles the error sent by jwt
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Faça seu cadastro ou login para ter permissão para acessar esse conteúdo.');
  }
});

app.listen(process.env.PORT || 3000);
//app.listen(process.env.PORT);
// });

module.exports = app;
