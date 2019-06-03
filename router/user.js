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

  /*collection.find({}).toArray((err,user)=>{
        for (let aux = 0; aux < user.length; aux++) {

            iduser = user.length;
            iduser++;
        }
        console.log("idi",iduser);
    });*/

    console.log("body",users);
    if(!users.name || !users.lastName || !users['profile'] )
    {
        res.status(401).send("Campos obrigatorios não prenchidos.");
    }
    else
     if(users.name && users.lastName && users['profile'])
    {
        users.id=iduser++;
        console.log('id2',users.id);
        users.status=1;
        collection.insert(users);
        res.status(200).send('Usuário cadastrado com sucesso.');
    }

});



app.get("/",function (req,res) {
        collection.find({"status":1},{projection:{_id:0,id:0,status:0}}).toArray((err, users) => {
            if (err) {
                console.log(err);
                console.error("Ocorreu um erro ao conectar a collection User");
                res.status(500);
            }
            else {
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

app.get("/:id",function(req,res) {
    var id = parseInt(req.params.id);
    collection.find({'id': id,'status': 1},{projection:{ _id: 0,status:0}}).toArray((err, users) => {
        if (err) {
            console.log("algo",err);
            console.error("Ocorreu um erro ao conectar a collection User");
            res.status(500);
        } else {
            if (users === []) {
                res.status(404).send("Usuário não encontrado.");
            } else {
                res.status(201).send(user);
            }
        }
    });
});

app.delete('/:id',function(req,res) {
    var id = parseInt(req.params.id);
        collection.find({"id": id,'status':1},function (err,users) {
            if (err) {
                console.error("Ocorreu um erro ao deletar o documento da coleção.");
                res.status(500);
            } else {
                if (users.value != null) {
                    collection.update({"status": 1}, {$set: {'status': 0}}, {upset: true});
                    res.status(204);//No content
                    res.send("O usuário foi removido.");
                }
               else{
                   console.log("Nenhum documento foi removido.");
                    res.status(401).send("Usuário não foi removido ou por não existir ou por ja ter sido deletado");

                }
            }

        });
});

app.put('/:id', function(req,res){
    var id = parseInt(req.params.id);
    var users = user;
    var bodyuser= req.body;
    users.name=bodyuser.name;
    users.lastName=bodyuser.lastName;
    users.profile=bodyuser.profile;

    if(bodyuser.name  &&  bodyuser.lastName  &&  bodyuser.profile){
        collection.findOneAndUpdate({'id':id, 'status':1},{$set:users},function(err,results){
        console.log(results);
            if(results  ==    null)
            {
                res.status(403).send('Não foi possível realizar a atualização.');
            }
            else
            {
                res.status(200).send('Usuário atualizado.');
            }
    });
        }
    else{
        res.status(403).send("Campo inválido.");
    }


});



module.exports = app;