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
        res.status(500);//internal server error
    }
    else {
        db = database.db('trainee-prominas');
        collection =db.collection('user');
    }
});

var idusers=1;


var user = []//como utiliza banco não precisa ter nada de conteudo.

/*function findid(userid) {
   return user.find((s) => {return s.id === userid})

}*/

app.post("/", function(req,res){
    var users = req.body;
    users.id =idusers++;
    //user.push(users);
    collection.insert(users);

    res.send('Usuário cadastrado com sucesso.');

});

app.get("/",function (req,res) {
    //res.send(user);
    collection.find({}).toArray((err,users)=>{
        if(err){
            console.error("Ocorreu um erro ao conectar a collection User");
            res.status(500);
        }
        else{
            res.send(users)
        }
    });
});

app.delete("/",function(req,res){
    user = [];
    res.send("Todos os usuários foram deletados.");
});

app.get("/:id",function(req,res){
    var id = parseInt(req.params.id);
  //  var user = findid(id);

        collection.find({"id":id}).toArray((err,user)=>{
            if(err){
                console.error("Ocorreu um erro ao conectar a collection User");
                res.status(500);
            }
            else{
                if(user === []){
                    res.status(404);
                    res.send("Usuário não encontrado.");
                }
                else{
                    res.send(user);
                }

            }
        });


    });

app.delete('/:id',function(req,res){
    var id = parseInt(req.params.id);
    var users = findid(id);

    for(var aux=0;aux<user.length;aux++)
    {
          if(user[aux].iduser=== users.iduser)
          {
              user.splice(aux,1);
              res.send('Usuário deletado com sucesso.');
          }
          else
              if(aux===user.length)
              {
                  res.status(404).send('Usuário não encontrado.');

              }

    }

});

app.put('/:id', function(req,res){
    var id = parseInt(req.params.id);
    //var users = findid(id);
    var bodyuser= req.body;


       /* users.name = bodyuser.name;//||users.name;
        users.lastname = bodyuser.lastname;//||users.lastname;
        users.profile = bodyuser['profile'];//||users.profile;*/

        collection.update({"id":id},bodyuser);
        if(bodyuser ==={}){
            res.status("400");
            res.send("Solicitação não autorizada");
        }
        else{
            collection.update({"id":id},bodyuser);
            res.send('Usuário atualizado');
        }
        res.send('Usuário atualizado');

});



module.exports = app;