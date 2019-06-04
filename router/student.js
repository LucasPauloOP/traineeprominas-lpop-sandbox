const express = require('express');
const baseAPI = "/api/v1/router";
const app = express.Router();



const mongoClient = require('mongodb').MongoClient;

const mdbURL='mongodb+srv://lucaspauloop:Lucio3237*@cluster0-5y6gh.mongodb.net/test?retryWrites=true';

var db;//variavel global (pode ser vista nas rotas
var collection;

var id;

mongoClient.connect(mdbURL,{native_parser:true},(err,database) =>{
    if(err){
        console.error("Ocorreu um erro ao conectar ao mongoDB", err);
       //res.status(500);//internal server error
    }
    else {

        db = database.db('trainee-prominas');
        collection = db.collection('student');
        collection.count().then((count) => {
            id = count;
        });
    }
});

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

async function put_aggregate (id,newStudent,res) {
    //console.log("qq",newStudent);

    if(newStudent.course !== null) {
        let course;
        course = await  _getOneCourse(newStudent.course);

        newStudent.course = course;
    }

    console.log("----->",newStudent);
    collection.updateOne({'id':id},{$set:{'course.name':newStudent.course.name,'course.period':newStudent.course.period,
            'course.teacher':newStudent.course.teacher,'course.city':newStudent.course.city}},(err) => {
        if(err){
            console.error("Erro ao conectar a collection student");
           console.log(err);
            res.status(500).send("Erro ao conectar a collection student");
        } else{
            res.send("Estudante atualizado com sucesso.");
        }
    })
}





app.get('/',function (req,res) {
    collection.find({'status': 1},{projection:{ _id: 0,status: 0}}).toArray((err, students) => {
        if (err) {
            console.log(err);
            console.error("Ocorreu um erro ao conectar a collection student");
            res.status(500);
        }
        else {
            res.status(200).send(students);
        }
    });
});

app.get('/:id',function(req,res){
    var id = parseInt(req.params.id);

    collection.find({'id': id,'status': 1},{projection:{ _id: 0,status:0}}).toArray((err, students) => {
        if (err) {
            console.log (err);
            console.error("Ocorreu um erro ao conectar a collection student");
            res.status(500);
        } else {
            if (students === []) {
                res.status(404).send("Estudante não encontrado.");
            } else {
                res.status(201).send(students);
            }
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

    collection.find({"id": id,'status':1},function (err,students) {
        if (err) {
            console.error("Ocorreu um erro ao deletar o documento da coleção.");
            res.status(500);
        } else {
            if (students != null) {
                collection.update({"status": 1}, {$set: {'status': 0}}, {upset: true});
                res.status(204);//No content
                res.send("O estudante foi removido.");
            }
            else{
                console.log("Nenhum documento foi removido.");
                res.status(401).send("Estudante não foi removido ou por não existir ou por ja ter sido deletado");

            }
        }

    });

});

app.put('/:id', function(req,res){
    var id = parseInt(req.params.id);

    var newStudent={

        name:   req.body.name,
        lastName:  req.body.lastName,
        age: req.body.age,
        course: req.body.course
    };
    put_aggregate(id, newStudent, res);

});

app.post('/', function(req, res) {
    var newStudent={
        name: req.body.name,
        lastName:req.body.lastName,
        age:req.body.age,
        course:req.body.course,
        status:1,
        id:parseInt(++id)
    };

    if(newStudent.name && newStudent.lastName && newStudent.age && newStudent.course)
    {
        insertOne
        aggregate(newStudent,res);
    }
    else
    {
        res.status(401).send("Campos obrigatórios não prenchidos.");
    }

});

module.exports = app;

