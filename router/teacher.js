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
        res.status(500);//internal server error
    }
    else {

        db = database.db('trainee-prominas');
        collection = db.collection('teacher');
        collection.count().then((count) => {
            console.log(count);
            id = count;
        });
    }
});


app.post("/", function(req,res){

    var newTeacher = {
            name : req.body.name,
           lastName : req.body.lastName,
            phd:req.body.phd||"Não informado",
            id:parseInt(id+1),
            status:1
    };
    console.log('------>',newTeacher);
    if(!newTeacher.name || !newTeacher.lastName )
    {
        res.status(401).send("Campos obrigatorios não prenchidos.");
    }
    else
    if(newTeacher.name && newTeacher.lastName )
    {
        collection.insert(newTeacher);
        res.status(200).send('Professor cadastrado com sucesso.');
    }

});

app.get('/',function (req,res) {
    collection.find({"status":1},{projection:{_id:0,status:0}}).toArray((err, teachers) => {
        if (err) {
            console.log(err);
            console.error("Ocorreu um erro ao conectar a collection teacher");
            res.status(500);
        }
        else {
            res.status(201).send(teachers);
        }
    });
});

// delete all
/*app.delete('/',function(req,res){
    collection['remove']({},false,function(err, info) {
        if (err) {
            console.error("Ocorreu um erro ao deletar os documentos da coleção.");
            res.status(500);
        } else {
            var numRemoved = info.result.n;
            if (numRemoved > 0) {
                console.log("INF: Todos os documentos (" + numRemoved + ") foram removidos");
                res.status(204);//No content
                res.send("Todos os professores foram removidos.");
            } else {
                console.log("Nenhum documento foi removido");
                res.status(404);
                res.send("Nenhum professor foi removido.");
            }

        }

    });
});*/

app.delete('/:id',function(req,res){
    var id = parseInt(req.params.id);
    collection.find({"id": id,'status':1},function (err,teachers) {
        if (err) {
            console.error("Ocorreu um erro ao deletar o documento da coleção.");
            res.status(500);
        } else {
            if (teachers != null) {
                collection.update({"status": 1}, {$set: {'status': 0}}, {upset: true});
                res.status(204);//No content
                res.send("O professor foi removido.");
            }
            else{
                console.log("Nenhum documento foi removido.");
                res.status(401).send("Professor não foi removido ou por não existir ou por ja ter sido deletado");

            }
        }

    });
});

app.get('/:id',function(req,res){
    var id = parseInt(req.params.id);
    collection.find({'id': id,'status': 1},{projection:{ _id: 0,status:0}}).toArray((err, teachers) => {
        if (err) {
            console.log (err);
            console.error("Ocorreu um erro ao conectar a collection teacher");
            res.status(500);
        } else {
            if (teachers === []) {
                res.status(404).send("Professor não encontrado.");
            } else {
                res.status(201).send(teachers);
            }
        }
    });
});

app.put('/:id', function(req,res){
    var id = parseInt(req.params.id);
    var teachers = [];
    var bodyteacher= req.body;
    teachers.name=bodyteacher.name;
    teachers.lastName=bodyteacher.lastName;

    if(typeof(req.body.phd) == 'boolean'){
        teachers.phd = bodyteacher.phd;
    }

    if(bodyteacher.name  &&  bodyteacher.lastName ){
        teachers.id = id;
        collection.update({'id':id, 'status':1},{$set:{'name':teachers.name,'lastName':teachers.lastName,'phd':teachers.phd}},function(err,results){
            if(results  ==    null)
            {
                res.status(403).send('Não foi possível realizar a atualização.');
            }
            else
            {
                res.status(200).send('Profesor atualizado.');
            }
        });
    }
    else{
        res.status(403).send("Campo inválido.");
    }
});


module.exports = {app};





