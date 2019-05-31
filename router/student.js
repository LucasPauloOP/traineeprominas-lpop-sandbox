const express = require('express');
const baseAPI = "/api/v1/router";
const app = express.Router();



const mongoClient = require('mongodb').MongoClient;

const mdbURL='mongodb+srv://lucaspauloop:Lucio3237*@cluster0-5y6gh.mongodb.net/test?retryWrites=true';

var db;//variavel global (pode ser vista nas rotas
var collection;



mongoClient.connect(mdbURL,{native_parser:true},(err,database) =>{
    if(err){
        console.error("Ocorreu um erro ao conectar ao mongoDB", err);
       //res.status(500);//internal server error
    }
    else {

        db = database.db('trainee-prominas');
        collection = db.collection('student');
    }
});

var idstudent=1;

var student = []




async function aggregate (student,res) {
    if(student.course !== null){

        let course;
        course = await _getOneCourse(student.course);

        student.course = course;

    }

    console.log("qualquercoisa",student);
    collection.insertOne(student, (err, result) => {
        if (err) {
            console.error("Erro ao criar um novo estudante", err);
            res.status(500).send("Erro ao criar um novo Estudante");

        } else {
            res.status(201).send("Estudante criado com sucesso");
        }
    });
}

const _getOneCourse = function (id) {
    return new Promise((resolve, reject) => {
        db.collection('course').findOne({"id": parseInt(id)}, (err, course) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(course);
            }
        });

    });
};

async function put_aggregate (id,student,res) {
    console.log("qq",student);

    if(student.course !== null) {
        let course;
        course = await _getOneCourse(student.course);

        student.course = course;

    }

    console.log("qualquer coisa",student);


    collection.updateOne({'id':id},{$set:student},(err,result) => {
        console.log("qq14",result);
        if(err){
            console.error("Erro ao conectar a collection studant");
            res.status(500).send("Erro ao conectar a collection studant");
        } else{
            res.send("Estudante atualizado com sucesso.");
        }
    })
}





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
    var bodystudent  = req.body;

    put_aggregate(id,bodystudent,res);
});

app.post('/', function(req, res) {
    var students = req.body;

    students.id =idstudent++;

    aggregate(students,res);
});

module.exports = app;

