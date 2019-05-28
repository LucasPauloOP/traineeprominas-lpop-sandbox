const express = require('express');
const baseAPI = "/api/v1/router";
const app = express.Router();


var id=1;

var student = [
    {
        'idstudents': id++,
        'name': 'Lucas',
        'lastname':'Paulo',
        'age':'19',
        'course':'CCO'
    },

    {
        'idstudents': id++,
        'name': 'Luan',
        'lastname': 'gomes',
        'age': '19',
        'course': 'SIN'
    }
]

function  findid(studentid) {
    return student.find(l => l.id === id);
}

app.get('/',function (req,res) {
    res.send(student);
})

app.get('/:id',function(req,res){
    var id = parseInt(req.params.id);
    student=findid(id);
    if(student) {
        res.send(student);
    }
    else{
        res.status(404).send('Curso não Encontrado');
    }
})

app.delete('/',function(req,res){
    student=[];
    res.send('Todos os estudantes foram deletados.');
})

app.delete('/:id',function(req,res){
    var id = parseInt(req.params.id);
    student = findid(id);
    if(student){
            student = student.map((s) => {return (s.id !== id);});
        }
    else
    {
        res.status(404).send("Estudante não encontrado.")
    }

})

module.exports = app;

