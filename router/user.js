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

  collection.find({}).toArray((err,user)=>{
        for (let aux = 0; aux < user.length; aux++) {

            iduser = user.length;
            iduser++;
        }
        console.log("idi",iduser);
    });

    console.log("body",users);
    if(users.name === '' || users.lastName === '' || users['profile'] === '')
    {
        res.status(401).send("Campos obrigatorios não prenchidos.");
    }
    else
     if(users.name != ''||users.lastName != ''||users['profile']!=''||users != {})
    {
        users.id=iduser++;
        console.log('id2',users.id);
        users.status=1;
        collection.insert(users);
        res.status(200).send('Usuário cadastrado com sucesso.');
    }

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
                collection.find({"status":1}).toArray((err,user)=>
                {
                    if (err) {
                        console.error("Ocorreu um erro ao conectar a collection User");
                        res.status(500);
                    }

                    else
                        {
                            res.status(201).send(user);
                        }

                })
            });

});

app.delete('/:id',function(req,res) {
    var id = parseInt(req.params.id);

        collection.find({"id": id}, true, function (err,users) {
            if (err) {
                console.error("Ocorreu um erro ao deletar o documento da coleção.");
                res.status(500);
            } else {
                if(users.status === 1) {
                    collection.update({"status": 1}, {$set: {'status': 0}}, {upset: true});
                    res.status(204);//No content
                    res.send("O usuário foi removido.");
                }
                else{
                    res.status(401).send("Usuário não foi removido ou por não existir ou por ja ter sido deletado");

                }
            }

        });

});

app.put('/:id', function(req,res){
    var id = parseInt(req.params.id);
    var users;
    var bodyuser= req.body;
    users.name=bodyuser.name;users.name;
    users.lastName=bodyuser.lastName;users.lastName;
    users.profile=bodyuser['profile'];users.profile;


    if(bodyuser.name === '' || bodyuser.lastName === '' || bodyuser['profile'] === ''){
        res.status(401).send("Campos obrigatorios não prenchidos.");
    }
    else {
            //collection.update({"id": id}, bodyuser);
            collection.find({"status":1}).toArray((err,user)=>{
            if (err) {
                res.status("400");
                res.send("Solicitação não autorizada");
            } else {
                console.log("body2",user);
                bodyuser.id = user.id;
                bodyuser.status = user.status;
                collection.update({"id": id},{$set:{'name':bodyuser.name,'lastName':bodyuser.lastName,'profile':bodyuser['profile']}},
                    {upset:true});
                res.send('Usuário atualizado');
            }
        });
    }
});

/* users.name = bodyuser.name;||users.name;
       users.lastname = bodyuser.lastname;||users.lastname;
       users.profile = bodyuser['profile'];||users.profile;*/


module.exports = app;