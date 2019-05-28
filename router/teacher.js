const express = require('express');
const baseAPI = "/api/v1/router";
const app = express.Router();

var id=1;

var teacher=[
    {
        'idteacher':id++,
        'name': 'Filipe' ,
        'lastName': 'Costa',
        'phd': false
    },

    {
        'idteacher':id++,
        'name': 'Fabiano',
        'lastName': 'Silva',
        'phd': true
    }
]

function verificarid(idteacher,id) {
    if (idusers.getElementById('id') == null) {

        return id=0;

    } else {

        return id =1;

    }
}

app.get('/',function (req,res) {
    res.send(teacher);
})

app.delete('/',function(req,res){
    teacher = [];
    res.send('Professores removidos com sucesso.');
})

app.delete('/:id',function(req,res){
    var id = prseInt(req.params.id);
    id = verificarid('idteacher',id);
    if(Filteredid.lenght >=1)
        res.send(Filteredid[0]);
    else
        res.status(404).send(' não encontrado.');
})

app.get('/:id',function(req,res){
    var id = prseInt(req.params.id);
    id = verificarid('idteacher',id);
    if(teacher) {
        res.send(course);
    }
    else{
        res.status(404).send('Curso não Encontrado');
    }
})

module.exports = app;





