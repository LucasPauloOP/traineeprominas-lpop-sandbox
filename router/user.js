const express = require('express');
// const baseAPI = '/api/v1/router';
const app = express.Router();


var idusers=1;


var user = [
    {
        'iduser': idusers++,
        'name': 'Lucas',
        'lastname':'Paulo',
        'profile':'Estudante'},

    {
        'iduser': idusers++,
        'name': 'Luan',
        'lastname':'Pedro',
        'profile':'Visitante'
    }
]

function findid(userid) {
   return user.find((s) => {return s.iduser === userid})

}

app.post("/", function(req,res){
    var users = req.body;
    users.iduser =idusers++;
    user.push(users);

    res.send('Usuário cadastrado com sucesso.');

});

app.get("/",function (req,res) {
    res.send(user);
});

app.delete("/",function(req,res){
    user = [];
    res.send("Todos os usuários foram deletados.");
});

app.get("/:id",function(req,res){
    var id = parseInt(req.params.id);
    var user = findid(id);
    if(user){
        res.send(user);
    }else{
        res.status(404).send('Usuário não encontrado');
    }
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
    var users = findid(id);
    var bodyuser= req.body;

    if(users)
    {
        users.name = bodyuser.name||users.name;
        users.lastname = bodyuser.lastname||users.lastname;
        users.profile = bodyuser['profile']||users.profile;
        res.send('Usuário atualizado');
    }
    else
    {
        res.send('Usuário não encontrado');
    }
});



module.exports = app;