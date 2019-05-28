const express = require('express');
const baseAPI = '/api/v1/router';
const app = express.Router();


var id=1;


var user = [
    {
        'iduser': id++,
        'name': 'Lucas',
        'lastname':'Paulo',
        'profile':'Estudante'},

    {
        'iduser': id++,
        'name': 'Luan',
        'lastname':'Pedro',
        'profile':'Visitante'
    }
]

function findid(userid) {
   return user.find(l => l.id === id);

}

app.post("/", function(req,res){
    var users = req.body;
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
    var user = verficarid(id);
    if(user){
        res.send(user);
    }else{
        res.status(404).send('Usuário não encontrado');
    }
});

app.delete('/:id',function(req,res){
    var id = parseInt(req.params.id);
    user = verificarid(id);

    if(user) {
        user = user.map((s) => {
            return (s.id !== id);
        });
    }

    else{
        res.status(404).send(' não encontrado.');

    }
});

app.put('/:id', function(req,res){
    var id = prseInt(req.params.id);
    user = verificarid(id);
    if(user)
    {

        res.send('Usuário atualizado');
    }
    else
    {
        res.send('Usuário não encontrado');
    }
});

module.exports = app;