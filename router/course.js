const express = require('express');
const baseAPI = "/api/v1/router";
const app = express.Router();
const arqteacher=require('./teacher');

var idcourses = 1;

var course = [
    {
        'idcourse': idcourses++,
        'name': 'Ciência da computação',
        'period': 'Noturno',
        'city' : 'Ipatinga',
        'teachers': [
            {'idteacher': '1', 'name': 'Filipe', 'lastname': 'Costa', 'phd': false}
        ]    },

    {
        'idcourse' : idcourses++,
        'name': 'Sistema da computação',
        'period':'Matutino',
        'city' : 'Fabriciano',
        'teachers':[
                        {'idteacher':'2','name': 'Fabiano','lastname': 'Silva','phd': true}
                    ]}
]

function findid(courseid) {
    return course.find((s) => {return s.idcourse === courseid})

}

app.get('/',function (req,res) {
    res.send(course);
})

app.post('/', function(req, res) {
    var courses = req.body;
    courses.id = idcourses++;
    for(var aux=0;aux<courses.teachers.length;aux++)
    {
        courses.teachers[aux] = arqteacher.findteacher(courses.teachers[aux]);

    }
    course.push(courses);
    res.send("teste.");
})


app.get('/:id',function(req,res){
    var id = parseInt(req.params.id);
    var courses = findid(id);
    if(courses) {
        res.send(courses);
    }
    else{
        res.status(404).send('Curso não Encontrado');
    }
})

app.delete('/:id',function(req,res){
    var id = parseInt(req.params.id);
    var courses = findid(id);

    for(var aux=0;aux<course.length;aux++)
    {
        if(course[aux].idcourse=== courses.idcourse)
        {

            course.splice(aux,1);
            res.send('Curso deletado com sucesso.');
        }
        else
        if(aux===course.length)
        {
            res.status(404).send('Curso não encontrado.');

        }

    }
})

app.delete('/',function(req,res){
    course = [];
    res.send('Cursos removidos com sucesso.');
})

app.put('/:id', function(req,res){
    var id = parseInt(req.params.id);
    var courses = findid(id);
    var bodycourse= req.body;

    if(courses)
    {
        courses.name = bodycourse.name||courses.name;
        courses.period = bodycourse.period||courses.period;
        courses.city = bodycourse.city||courses.city;
        courses.teachers= bodycourse.teachers||courses.teachers;
        if(bodycourse.teachers)
        {
            for(var aux=0;aux< courses.teachers.length;aux++)
            {
                courses.teachers[aux] = arqteacher.findteacher(bodycourse.teachers[aux])
            }
        }

        res.send('Curso atualizado');
    }
    else
    {
        res.send('Curso não encontrado');
    }
});

function findcourse(id){
    return course.find((l)=>{return l.idcourse === id});
}

module.exports = [app,findcourse];