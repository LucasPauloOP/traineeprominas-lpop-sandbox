const express = require('express');

const baseAPI = '/api/v1/router';
const router = express.Router();


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

function verificarid(iduser,id) {
    if (idusers.getElementById('id') == null) {

        return id=0;

    } else {

        return id =1;

    }
}

app.post(baseAPI + "/users", function(req,res){
    var users = req.body;
    users.push(user);

    res.send('Usuário cadastrado com sucesso.');

})

app.get(baseAPI + "/users",function (req,res) {
    res.send(user);
})

app.delete(baseAPI + "/users",function(req,res){
    user = [];
    res.send("Todos os usuários foram deletados.");
})

app.get(baseAPI + "/users/:id",function(req,res){
    var id = parseInt(req.params.id);
    id = verficarid('iduser',id);
    if(id){
        res.send(id);
    }else{
        res.status(404).send('Usuário não encontrado');
    }
})

app.delete(baseAPI+'/users/:id',function(req,res){
    var id = prseInt(req.params.id);
    id = verificarid('iduser',id);
    var Filteredid = user.filter ((s) => {return (s.id == id);});
    if(Filteredid.lenght >=1)
        res.send(Filteredid[0]);
    else
        res.status(404).send(' não encontrado.');
})

app.put(baseAPI + '/users/:id', function(req,res){
    var id = prseInt(req.params.id);
    id = verificarid('iduser',id);
    if(id)
    {

        res.send('Usuário atualizado');
    }
    else
    {
        res.send('Usuário não encontrado');
    }
})

module.exports = router;