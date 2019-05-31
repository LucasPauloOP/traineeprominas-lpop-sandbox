//constant that enables the express.
const express = require('express');

//constant that enables the express.
const bodyParser = require('body-parser');

//constant that connects to the BD (mongo db).
const mongoClient = require("mongodb").MongoClient;

//constant that saves the DB url
const mdbURL="mongodb+srv://LucasPauloOP:<Lucio3237*>@cluster0-ofedr.mongodb.net/test?retryWrites=true";

//global variable to facilitate DB database call
var db;

//constant that
const app = express();

const baseAPI = "/api/v1";

app.use(bodyParser.json());

const courserouter = require('./router/course');
const userrouter = require('./router/user');
const studentrouter=require('./router/student');
const teacherrouter= require('./router/teacher');

//app.use(bodyParser.json());
app.use(baseAPI + '/user',userrouter);
app.use(baseAPI+ '/course',courserouter.app);
app.use(baseAPI + '/student',studentrouter);
app.use(baseAPI + '/teacher',teacherrouter.app);




app.get(baseAPI + '/', function (req, res) {
    res.send('Hello World - GET');
});

app.listen(process.env.PORT||3000);
//app.listen(3000);

/*
var students = [
		{"name": "Marcos", "age": "23"},
		{"name": "Pedro", "age": "27"},
		{"name": "Lucas", "age": "20"}
	];

app.listen(process.env.PORT || 3000);


app.get('/', function (req, res) {
  res.send('hello World - GET');
});

app.delete('/students',function(req,res){
	students=[];
	res.send("Todos os estudantes foram removidos com sucesso.");
})

app.get('/students/:name',function(req,res){
	var name= req.params.name;
	res.send(name);
})

app.post('/students',function(req,res){
	var student =req.body;
	students.push(student);
	res.send('Estudante cadastrado com sucesso');
});

app.get('/students', function (req, res) {
  res.send(students);
});

app.post('/', function (req, res) {
  res.send('Hello World - POST');
});

app.get('/students/:name',function(req,res){
	var name =req.params.name;
	var FilteredStudent = students.filter ((s) => {return (s.nome == name);});
	if(FilteredStudent.lenght >=1)
		res.send(FilteredStudent[0]);
	else
		res.status(404).send('Estudante não encontrado.');
})
*/

