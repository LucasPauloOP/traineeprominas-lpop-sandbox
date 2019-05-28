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

function findid(teacherid) {
    return teacher.find((l)=>{return l.idteacher === idteacher});

}

app.post("/", function(req,res){
    var teachers = req.body;
    teachers.idteacher =id++;
    teacher.push(teachers);

    res.send('Usuário cadastrado com sucesso.');

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
    teacher = findid(id);

    if(teacher)
    {
        teacher= teacher.map((s)=> {return (s.id !== id);});
        res.send("Usuário deletado.");
    }
    else {

        res.status(404).send(' não encontrado.');
    }
})

app.get('/:id',function(req,res){
    var id = parseInt(req.params.id);
   var teacher = findid(id);

    if(teacher){
        res.send(teacher);
    }else{
        res.status(404).send('Usuário não encontrado');
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
        res.send('Usuário atualizado');
    }
    else
    {
        res.send('Usuário não encontrado');
    }
});

module.exports = app;





