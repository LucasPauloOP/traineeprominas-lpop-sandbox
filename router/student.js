const express = require('express');
const baseAPI = "/api/v1/router";
const app = express.Router();
const arqcourse = require('./course');

var idstudent=1;

var student = [
    {
        'id': idstudent++,
        'name': 'Lucas',
        'lastname':'Paulo',
        'age':'19',
        'course': [
            { 'id':'1',
                'name': 'Ciência da computação',
                'period': 'Noturno',
                'city' : 'Ipatinga',
                'teacher':
            [{'id': '1', 'name': 'Filipe', 'lastname': 'Costa', 'phd': false}]
            }
        ]
    },

    {
        'id': idstudent++,
        'name': 'Luan',
        'lastname': 'gomes',
        'age': '19',
        'course': [
        {'id' : '2',
            'name': 'Sistema da computação',
            'period':'Matutino',
            'city' : 'Fabriciano',
            'teacher':
            {'id':'2','name': 'Fabiano','lastname': 'Silva','phd': true}
        }
    ]
    }
]

function  findid(studentid) {
    return student.find(l => l.id === studentid);
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
        if(student[aux].id === students.id)
        {
            student.splice(aux,1);
            res.send('Estudante deletado com sucesso.');
        }
        else
        if(aux===student.length)
        {
            res.status(404).send('Estudante não encontrado.');

        }

    }

})

app.put('/:id', function(req,res){
    var id = parseInt(req.params.id);
    console.log(id);
    var students = findid(id);

    var bodystudent = req.body;

    if(students)
    {
        students.name = bodystudent.name||students.name;
        students.lastname = bodystudent.lastname||students.lastname;
        students.age = bodystudent.age||students.age;
        students.course= bodystudent.course||students.course;
        if(bodystudent.course)
        {
            for(var aux=0;aux< students.course.length;aux++)
            {
                students.course[aux] = arqcourse.findcourse(bodystudent.course[aux]);
                console.log(arqcourse.findcourse(bodystudent.course[aux]));
            }
        }

        res.send('Estudante atualizado');
    }
    else
    {
        res.send('Estudante não encontrado');
    }
});

app.post('/', function(req, res) {
    var students = req.body;
    students.id = idstudent++;
    for(var aux=0;aux<students.course.length;aux++)
    {
        students.course[aux] = arqcourse.findcourse(students.course[aux]);
    }
    student.push(students);
    res.send("Estudante cadastrado");
})

module.exports = app;

