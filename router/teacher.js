const express = require('express');
const baseAPI = "/api/v1/router";
const app = express.Router();

var id=1;

var teacher=[
    {
        'idteacher':id++,
        'name': 'Filipe' ,
        'lastname': 'Costa',
        'phd': false
    },

    {
        'idteacher':id++,
        'name': 'Fabiano',
        'lastname': 'Silva',
        'phd': true
    }
]

function findid(teacherid) {
    return teacher.find((l)=>{return l.idteacher === teacherid});

}

app.post("/", function(req,res){
    var teachers = req.body;
    teachers.idteacher =id++;
    teacher.push(teachers);

    res.send('Professor cadastrado com sucesso.');

});

app.get('/',function (req,res) {
    res.send(teacher);
})

app.delete('/',function(req,res){
    teacher = [];
    res.send('Professores removidos com sucesso.');
})

app.delete('/:id',function(req,res){
    var id = parseInt(req.params.id);
    var teachers = findid(id);

    for(var aux=0;aux<teacher.length;aux++)
    {
        if(teacher[aux].idteacher=== teachers.idteacher)
        {
            teacher.splice(aux,1);
            res.send('Professor deletado com sucesso.');
        }
        else
        if(aux===teacher.length)
        {
            res.status(404).send('Professor não encontrado.');

        }

    }
})

app.get('/:id',function(req,res){
    var id = parseInt(req.params.id);
    var teachers = findid(id);
    if(teachers){
        res.send(teachers);
    }else{
        res.status(404).send('Professor não encontrado');
    }
});

app.put('/:id', function(req,res){
    var id = parseInt(req.params.id);
    var teachers = findid(id);
    var bodyteacher = req.body;

    if(teachers)
    {
        teachers.name = bodyteacher.name||teachers.name;
        teachers.lastname = bodyteacher.lastname||teachers.lastname;
        teachers.profile = teachers['profile']||teachers.profile;
        res.send('Professor atualizado');
    }
    else
    {
        res.send('Professor não encontrado');
    }
});

module.exports = app;





