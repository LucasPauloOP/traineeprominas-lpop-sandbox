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
        res.status(500);//internal server error
    }
    else {

        db = database.db('trainee-prominas');
        collection = db.collection('teacher');

    }
});



var idteachers=1;

var teacher=[]

let count;

app.post("/", function(req,res){
    var teachers= teacher;
    var bodyteacher = req.body;

    teachers.id =idteachers++;
    teachers.status=1;

    teachers.name = bodyteacher.name;
    teachers.lastName = bodyteacher.lastName;
    if(bodyteacher.phd == ' ')
    teachers.phd="Não informado";
    else
        teachers.phd = bodyteacher.phd;

    if(!teachers.name || !teachers.lastName )
    {
        res.status(401).send("Campos obrigatorios não prenchidos.");
    }
    else
    if(teachers.name && teachers.lastName )
    {
        collection.insert(teachers);
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

app.delete('/',function(req,res){
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
});

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
                res.status(401).send("Usuário não foi removido ou por não existir ou por ja ter sido deletado");

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

    var bodyteacher = req.body;

    collection.update({"id":id},bodyteacher);
    if(bodyteacher ==={}){
        res.status("400");
        res.send("Solicitação não autorizada");
    }
    else{
        collection.update({"id":id},bodyteacher);
        res.send('Professor atualizado');
    }
});


module.exports = {app};





