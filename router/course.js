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

function findid(couserid) {
    return course.find((s) => {return s.idcourse === courserid})
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
    var id = parseInt(req.params.id);
    course = findid(id);
    if(course) {
        res.send(course);
    }
    else{
        res.status(404).send('Curso não Encontrado');
    }
})

app.delete('/:id',function(req,res){
    var id = parseInt(req.params.id);
    course = findid(id);
    if(course)
    {
        course = course.map((s) => {return (s.id !== id);});
    }
    else {
        res.status(404).send('Cursos não encontrado.');
    }
})

app.delete('/',function(req,res){
    couser = [];
    res.send('Cursos removidos com sucesso.');
})


module.exports = app;