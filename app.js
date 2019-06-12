//constant to use express
const express = require('express');

//constant to use bodyParser
const bodyParser = require('body-parser');

//constant app for export
const app = express();

//url base of API
const baseAPI = "/api/v1";

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

//API routes
app.use(baseAPI, require('./routes/student'));
app.use(baseAPI,require('./routes/user'));
app.use(baseAPI, require('./routes/course'));
app.use(baseAPI, require('./routes/teacher'));

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
