const express = require('express');
const baseAPI = "/api/v1/router";
const app = express.Router();

var id = 1;

var course = [
    {
        'idcourse': id++,
        'name': 'Ciência da computação',
        'period': 'Noturno',
        'city' : 'Ipatinga',
        'teachers': [
            {'idteacher': '1', 'name': 'Filipe', 'lastName': 'Costa', 'phd': false}
        ]
    },

    {
        'idcourse' : id++,
        'name': 'Sistema da computação',
        'period':'Matutino',
        'city' : 'Fabriciano',
        'teachers':[
                        {'idteacher':'2','name': 'Fabiano','lastName': 'Silva','phd': true}
                    ]}
]

function verificarid(idcourse,id) {
    if (idusers.getElementById('id') == null) {

        return id=0;

    } else {

        return id =1;

    }
}

app.get('/',function (req,res) {
    res.send(course);
})

/*app.post(baseAPI + '/courses', function(req, res) {
*/

app.put('/',function(req,res){
    res.send('Curso cadastrado com sucesso.');
})

app.get('/:id',function(req,res){
    var id = parqeInt(req.params.id);
    id = verificarid('idcourse',id)
    if(course) {
        res.send(course);
    }
    else{
        res.status(404).send('Curso não Encontrado');
    }
})

app.delete('/:id',function(req,res){
    var id = prseInt(req.params.id);
    id = verificarid('idcourse',id);
    var Filteredid = course.filter ((s) => {return (s.id == id);});
    if(Filteredid.lenght >=1)
        res.send(Filteredid[0]);
    else
        res.status(404).send(' não encontrado.');
})

app.delete('/',function(req,res){
    couser = [];
    res.send('Cursos removidos com sucesso.');
})


module.exports = app;