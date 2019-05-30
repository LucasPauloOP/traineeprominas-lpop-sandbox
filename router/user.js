const express = require('express');
// const baseAPI = '/api/v1/router';
const app = express.Router();

const mongoClient = require('mongodb').MongoClient;

const mdbURL='mongodb+srv://lucaspauloop:Lucio3237*@cluster0-5y6gh.mongodb.net/test?retryWrites=true';

var db;//variavel global (pode ser vista nas rotas
var collection;
//const collection = db.collection('user');

mongoClient.connect(mdbURL,{native_parser:true},(err,database) =>{
    if(err){
        console.error("Ocorreu um erro ao conectar ao mongoDB", err);
        //res.status(500);//internal server error
    }
    else {
        db = database.db('trainee-prominas');
        collection =db.collection('user');
    }
});



var idusers=1;


var user = []

app.post("/", function(req,res){
    var users = req.body;
    users.id = idusers++;
    users.status=1;
    collection.insert(users);

    res.send('Usuário cadastrado com sucesso.');

});


app.get("/",function (req,res) {

    var status= collection.find({"status":1});
    if(status) {

        collection.find({}).toArray((err, users) => {
            if (err) {
                console.error("Ocorreu um erro ao conectar a collection User");
                res.status(500);
            }
            else {
                res.send(users)
            }
        });
    }
    else
    if(!status){
        res.status(404);
        res.send("Usuário não encontrado.");
    }

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

    }

    //user = [];
   // res.send("Todos os usuários foram deletados.");
});

app.get("/:id",function(req,res){
    var id = parseInt(req.params.id);

    var status = collection.find({"status":1});
        if(status)
        {
            collection.find({"id":id}).toArray((err,user)=>{
                if(err){
                    console.error("Ocorreu um erro ao conectar a collection User");
                    res.status(500);
                }
                else{
                        res.send(user);
                    }
            });
        }
        else
        {
            if(!status)
            {
                res.status(404);
                res.send("Usuário não encontrado.");
            }
        }
});

app.delete('/:id',function(req,res) {
    var id = parseInt(req.params.id);
    var status = collection.find({"status":1});
    if(status)
    {
        collection.update({"id": id}, true, function (err, info) {
            if (err) {
                console.error("Ocorreu um erro ao deletar o documento da coleção.");
                res.status(500);
            } else {
                var numRemoved = info.result.n;
                if (numRemoved > 0) {
                    console.log("INF: Todos os documentos (" + numRemoved + ") foram removidos");
                    res.status(204);//No content
                    res.send("O usuário foi removido.");
                } else {
                    console.log("Nenhum documento foi removido");
                    res.status(404);
                    res.send("Usuário não encontrado.");
                }

            }

        });

    }
    else{
        res.status(404).send("Usuário nao encontrado.");
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