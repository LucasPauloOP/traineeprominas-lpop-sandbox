const express = require('express');
const baseAPI = "/api/v1/router";
const app = express.Router();
const arqcourse = require('./course');


const mongoClient = require('mongodb').MongoClient;

const mdbURL='mongodb+srv://lucaspauloop:Lucio3237*@cluster0-5y6gh.mongodb.net/test?retryWrites=true';

var db;//variavel global (pode ser vista nas rotas
var collection;



mongoClient.connect(mdbURL,{native_parser:true},(err,database) =>{
    if(err){
        console.error("Ocorreu um erro ao conectar ao mongoDB", err);
        res.status(500);//internal server error
    }
    else {

        db = database.db('trainee-prominas');
        collection = db.collection('student');
    }
});

var idstudent=1;

var student = []





app.get('/',function (req,res) {
    collection.find({}).toArray((err,students) =>{
        if(err){
            console.error("Ocorreu um erro ao conectar a collection student");
            res.status(500);
        }
        else{
            res.send(students);
        }
    });
});

app.get('/:id',function(req,res){
    var id = parseInt(req.params.id);

    collection.find({'id':id}).toArray((err,students) =>{
        if(err){
            console.error("Ocorreu um erro ao conectar a collection student");
            res.status(500);
        }
        else{
            res.send(students);
        }
    });
});

app.delete('/',function(req,res){
    collection.remove({}, true, function (err, info) {
        if (err) {
            console.error("Ocorreu um erro ao deletar os documentos da coleção.");
            res.status(500);
        } else {
            var numRemoved = info.result.n;
            if (numRemoved > 0) {
                console.log("INF: Todos os documentos (" + numRemoved + ") foram removidos");
                res.send("Estudante foi removido com sucesso.");
                res.status(204);//No content

            }
            else {
                console.log("Nenhum documento foi removido");
                res.status(404);
                res.send("Nenhum Estudante foi removido.");
            }

        }

    });
});

app.delete('/:id',function(req,res){
    var id = parseInt(req.params.id);

    collection.remove({"id": id}, true, function (err, info) {
        if (err) {
            console.error("Ocorreu um erro ao deletar os documentos da coleção.");
            res.status(500);
        } else {
            var numRemoved = info.result.n;
            if (numRemoved > 0) {
                console.log("INF: Todos os documentos (" + numRemoved + ") foram removidos");
                res.send("Estudante foi removido com sucesso.");
                res.status(204);//No content

            }
            else {
                console.log("Nenhum documento foi removido");
                res.status(404);
                res.send("Nenhum estudante foi removido.");
            }

        }

    });

});

app.put('/:id', function(req,res){
    var id = parseInt(req.params.id);
    console.log(id);
    var students = findid(id);

    var bodystudent = req.body;

    if(students)
    {
        students.name = bodystudent.name||students.name;
        students.lastname = bodystudent.lastname||students.lastname;
        students.age = bodystudent.age||students.age;
        students.course= bodystudent.course||students.course;
        if(bodystudent.course)
        {
            for(var aux=0;aux< students.course.length;aux++)
            {
                students.course[aux] = arqcourse.findcourse(bodystudent.course[aux]);
                console.log(arqcourse.findcourse(bodystudent.course[aux]));
            }
        }

        res.send('Estudante atualizado');
    }
    else
    {
        res.send('Estudante não encontrado');
    }
});

app.post('/', function(req, res) {
    var students = req.body;
    students.id = idstudent++;
    for(var aux=0;aux<students.course.length;aux++)
    {
        students.course[aux] = arqcourse.findcourse(students.course[aux]);
    }
    student.push(students);
    res.send("Estudante cadastrado");
});

module.exports = app;

