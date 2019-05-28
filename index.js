const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const baseAPI = "/api/v1";

const courseRoute = require('.router/course');
const userRoute = require('.router/user');
const studentRoute=require('.router/student');


app.use(baseAPI + '/user',userRoute)
app.use(baseAPI+ 'course',courseRoute)
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000);

/*var students = [
		{"name": "Marcos", "age": "23"},
		{"name": "Pedro", "age": "27"},
		{"name": "Lucas", "age": "20"}
	];

app.listen(process.env.PORT || 3000);

/*
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

