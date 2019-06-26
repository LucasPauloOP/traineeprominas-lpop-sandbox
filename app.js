var jwt = require('express-jwt');
//constant to use express
const express = require('express');

//constant to use bodyParser
const bodyParser = require('body-parser');

//constant app for export
const app = express();

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

app.use(jwt({ secret: 'admin'}).unless({path: ['/api/v1']}));


// //post hello world on the home screen
// database.connect()
//   .then(() => {

    // app.get(baseAPI, function (req, res) {
    //   res.status(200).send('Hello World!');
    // });

//API routes
app.use(baseAPI, require('./routes/student'));
app.use(baseAPI,require('./routes/user'));
app.use(baseAPI, require('./routes/course'));
app.use(baseAPI, require('./routes/teacher'));
// app.use(baseAPI, require('./routes/login'));

app.use(API_BASE, auth ,require('./routes/student'));
app.use(API_BASE, auth ,require('./routes/user'));
app.use(API_BASE, auth ,require('./routes/course'));
app.use(API_BASE, auth ,require('./routes/teacher'));
// app.use(API_BASE, auth ,require('./routes/login'));

app.get(baseAPI+'/', function (req, res){
  res.send('Endpoints: \n '+baseAPI+'/user \n '+baseAPI+'/student \n '+baseAPI+'/course \n '+baseAPI+'/teacher');
});

app.get('/'+baseAPI, function (req, res){
  res.send('Endpoints: \n /user \n /student \n /course \n /teacher');
});

app.listen(process.env.PORT || 3000);
//app.listen(process.env.PORT);
// });

module.exports = app;
