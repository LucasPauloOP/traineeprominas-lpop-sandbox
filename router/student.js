const express = require('express');
const app = express();
const baseAPI = "/api/v1/router";

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

function verificarid(idstudents,id) {
    if (idusers.getElementById('id') == null) {

        return id=0;

    } else {

        return id =1;

    }
}

app.get(baseAPI + '/students',function (req,res) {
    res.send(student);
})

app.get(baseAPI + '/students/:id',function(req,res){
    var id = prseInt(req.params.id);
    id = verificarid('idusstudents',id);
    if(id) {
        res.send(course);
    }
    else{
        res.status(404).send('Curso não Encontrado');
    }
})

app.delete(baseAPI + '/students',function(req,res){
    student=[];
    res.send('Todos os estudantes foram deletados.');
})

app.delete(baseAPI+'/students/:id',function(req,res){
    var id = prseInt(req.params.id);
    id = verificarid('iduser',id);
    var Filteredid = student.filter ((s) => {return (s.id == id);});
    if(Filteredid.lenght >=1)
        res.send(Filteredid[0]);
    else
        res.status(404).send(' não encontrado.');
})

module.exports = router;

