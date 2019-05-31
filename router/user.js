const express = require('express');
// const baseAPI = '/api/v1/router';
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
        collection =db.collection('user');
    }
});

var iduser=1;

let count=0;

var user = []

app.post("/", function(req,res){
    var users =req.body;

  /* collection.find({}).toArray((err,user)=>{
        for (let aux = 0; aux < user.length; aux++) {

            iduser = aux;
        }
        console.log(iduser);
    });*/
    console.log("body",users);
    if(users.name == '' || users.lastName == '' || users['profile'] == '')
    {
        res.status(401).send("Campos obrigatorios não prenchidos.");
    }
    else
    {
        /*users.id=iduser;*/
        console.log('id2',users.id);
        users.status=1;
        collection.insert(users);
        res.status(200).send('Usuário cadastrado com sucesso.');
    }

    /*else{
            sen.status(401).send("Campo de cadastro vazio.");
    }*/


});



app.get("/",function (req,res) {
        collection.find({'status':1}).toArray((err, users) => {
            if (err) {
                console.error("Ocorreu um erro ao conectar a collection User");
                res.status(500);
            }
            else {
                    count=1;
                    res.status(201).send(users);
                }
        });
        /*if(count===0) {
            res.status(404).send("Nenhum usuário cadastrado");
        }*/
});

app.delete("/",function(req,res){
    var status = collection.find({"status":1});
    if(status)
    {
        collection.remove({},false,function (err,info) {
            if(err){
                console.error("Ocorreu um erro ao deletar os documentos da coleção.");
                res.status(500);
            }
            else{
                var numRemoved = info.result.n;
                if(numRemoved>0){
                    console.log("INF: Todos os documentos ("+numRemoved+") foram removidos");
                    res.status(204);//No content
                    res.send("Todos os usuários foram removidos.");
                }
                else{
                    console.log("Nenhum documento foi removido");
                    res.status(404);
                    res.send("Nenhum usuário foi removido.");
                }
            }
        });

    }
    else{
        res.status(204).send("Usuário não encontrado.");
    }

    //user = [];
   // res.send("Todos os usuários foram deletados.");
});

app.get("/:id",function(req,res){
    var id = parseInt(req.params.id);
            collection.find({"id":id}).toArray((err,user)=>{
                if(err){
                    console.error("Ocorreu um erro ao conectar a collection User");
                    res.status(500);
                }
                else{
                        res.send(user);
                    }
            });
});

app.delete('/:id',function(req,res) {
    var id = parseInt(req.params.id);
    var status = collection.find({"status":1});

    if(status)
    {
        collection.find({"id": id}, true, function (err, info) {
            if (err) {
                console.error("Ocorreu um erro ao deletar o documento da coleção.");
                res.status(500);
            } else {
                    collection.update({"status":1},{$set:{'status':0}},{upset:true});
                    res.status(204);//No content
                    res.send("O usuário foi removido.");
                }
        });

    }
    else{
        console.log("Nenhum documento foi removido");
        res.status(204).send("Usuário nao encontrado.");
    }

});

app.put('/:id', function(req,res){
    var id = parseInt(req.params.id);
    var status= collection.find({"status":1});
    var bodyuser= req.body;

       /* users.name = bodyuser.name;//||users.name;
        users.lastname = bodyuser.lastname;//||users.lastname;
        users.profile = bodyuser['profile'];//||users.profile;*/
    if(status) {
        collection.update({"id": id}, bodyuser);
        if (bodyuser === {}) {
            res.status("400");
            res.send("Solicitação não autorizada");
        } else {
            collection.update({"id": id}, bodyuser);
            res.send('Usuário atualizado');
        }
    }
    else
    {
        res.status("404").send("Usuário não encontrado.");
    }
});



module.exports = app;