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


app.post("/", function(req,res){
    var teachers = req.body;
    teachers.id =idteachers++;

    collection.insert(teachers);

    res.send('Professor cadastrado com sucesso.');

});

app.get('/',function (req,res) {
    collection.find({}).toArray((err,teachers)=>{
        if(err){
            console.error("Ocorreu um erro ao conectar a collection teacher");
            res.status(500);
        }
        else{
            res.send(teachers);
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

    collection.remove({"id": id}, true, function (err, info) {
        if (err) {
            console.error("Ocorreu um erro ao deletar os documentos da coleção.");
            res.status(500);
        } else {
            var numRemoved = info.result.n;
            if (numRemoved > 0) {
                console.log("INF: Todos os documentos (" + numRemoved + ") foram removidos");
                res.send("Professor foi removido.");
                res.status(204);//No content

            }
            else {
                console.log("Nenhum documento foi removido");
                res.status(404);
                res.send("Nenhum professor foi removido.");
            }

        }

    });
});

app.get('/:id',function(req,res){
    var id = parseInt(req.params.id);
  //  var teachers = findid(id);

    collection.find({"id":id}).toArray((err,teachers)=>{
        if(err){
            console.error("Ocorreu um erro ao conectar a collection Teacher");
            res.status(500);
        }
        else{
            if(teachers === []){
                res.status(404);
                res.send("Professor não encontrado.");
            }
            else{
                res.send(teachers);
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
        res.send('Usuário atualizado');
    }
});

function findteacher(id)
{
    return teacher.find((l)=>{return l.id === id});
}

module.exports = {app,findteacher};





