const express = require('express');
const baseAPI = "/api/v1/router";
const app = express.Router();
const arqcourse = require('./course');

var idstudent=1;

var student = [
    {
        'idstudents': idstudent++,
        'name': 'Lucas',
        'lastname':'Paulo',
        'age':'19',
        'course': [
            { 'idcourse':'1',
                'name': 'Ciência da computação',
                'period': 'Noturno',
                'city' : 'Ipatinga',
                'teacher':
            [{'idteacher': '1', 'name': 'Filipe', 'lastname': 'Costa', 'phd': false}]
            }
        ]
    },

    {
        'idstudents': idstudent++,
        'name': 'Luan',
        'lastname': 'gomes',
        'age': '19',
        'course': [
        {'idcourse' : '2',
            'name': 'Sistema da computação',
            'period':'Matutino',
            'city' : 'Fabriciano',
            'teacher':
            {'idteacher':'2','name': 'Fabiano','lastname': 'Silva','phd': true}
        }
    ]
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
   var students = findid(id);
    if(students) {
        res.send(students);
    }
    else{
        res.status(404).send('Estudante não Encontrado');
    }
})

app.delete('/',function(req,res){
    student=[];
    res.send('Todos os estudantes foram deletados.');
})

app.delete('/:id',function(req,res){
    var id = parseInt(req.params.id);
    var students = findid(id);

    for(var aux=0;aux<student.length;aux++)
    {
        if(student[aux].idstudents === students.idstudents)
        {
            student.splice(aux,1);
            res.send('Curso deletado com sucesso.');
        }
        else
        if(aux===student.length)
        {
            res.status(404).send('Curso não encontrado.');

        }

    }

})

app.put('/:id', function(req,res){
    var id = parseInt(req.params.id);
    var students = findid(id);
    var bodystudent = req.body;

    if(students)
    {
        students.name = bodystudent.name||students.name;
        students.period = bodystudent.period||students.period;
        students.city = bodystudent.city||students.city;
        students.teachers= bodystudent.teachers||students.teachers;
        if(bodystudent.courses)
        {
            for(var aux=0;aux< students.course.length;aux++)
            {
                students.courses[aux] = arqcourse.findcourse(bodystudent.courses[aux])
            }
        }

        res.send('Curso atualizado');
    }
    else
    {
        res.send('Curso não encontrado');
    }
});

app.post('/', function(req, res) {
    var students = req.body;
    courses.id = idstudent++;
    for(var aux=0;aux<students.courses.length;aux++)
    {
        students.courses[aux] = arqcourse.findcourse(students.courses[aux]);

    }
    student.push(students);
    res.send("teste.");
})

module.exports = app;

