var express = require('express');
var router = express.Router();

modelStudent = require('../models/student');
modelCourse = require('../models/course');

//-----------get all-----------------------------------
exports.getAll = (req,res) => {
    let status={status:1};

    let project = { projection:{ _id: 0, status: 0 } };

    modelStudent.getall(status,project)
        .then(students => {
            //console.log('----->controlller',students);
            res.status(201).send(students);
        }).catch(err=>{
        console.error("Erro ao conectar a collection student", err);
        res.status(500).send("Erro ao conectar a collection student");
    });
};


//-----------get one-------------------------------
exports.getOne = (req,res)=>{
    let id = parseInt(req.params.id);

    let where = {status:1,'id':id};

    let project = { projection: {  _id: 0, status: 0 } };

    modelStudent.getone(where,project)
        .then(students => {
            res.status(201).send(students);
        }).catch(err => {
        console.error("Erro ao conectar a collection student", err);
        res.status(500).send("Erro ao conectar a collection student");
    });
};



//---------------post------------------------------
exports.post=function(req,res){


    var newStudent = {
        name: req.body.name,
        lastName: req.body.lastName,
        age: req.body.age,
        status : 1
    };
    if(!newStudent.name || !newStudent.lastName|| !newStudent.age)
     {
         res.status(401).send("Campos obrigatorios não prenchidos.");
     }

    (async () => {

        // replace course id by the entire course object
        let where = {'id':parseInt(req.body.course),status:1};
        let course = await modelCourse.getone(where);

        // if course id is invalid abort the creation of the student
        if (!course)
            return res.status(401).send('O Curso Informado Não Existe.');

        // If course is valid continues
        newStudent.course = course;


        // persists the new course on database
        modelStudent.post(newStudent).then(students => {
            res.status(201).send("Estudante Cadastrado com Sucesso.");
        }).catch(err=>{
            console.error("Erro ao Criar Um Novo Estudante", err);
            res.status(500).send("Erro ao Criar Um Novo Estudante");
        });
    })();

};


/*
//---------------------put--------------------------------
exports.put=function (req,res) {
    let id = parseInt(req.params.id);

    let where = {status:1,'id':id};

    var newCourse = {
        name: req.body.name,
        period:req.body.period,
        city:req.body.city,
    };
    console.log(newCourse);

    (async () => {

        let validTeachers = [];
        let invalidTeachers = [];

        // If some teacher id is informed replace teachers ids by the entire teacher object
        if (req.body.hasOwnProperty('teacher') && Array.isArray(req.body.teacher) && req.body.teacher.length > 0) {

            for (let i = 0; i < req.body.teacher.length; i++) {
                let where = {'id':parseInt(req.body.teacher[i]),status:1};
                let teacher = await modelTeacher.getone(where);

                if (teacher)
                    validTeachers.push(teacher);
                else
                    invalidTeachers.push(req.body.teacher[i]);
            }

            newCourse.teacher = validTeachers;
        }


        // persists the new course on database
        if(!newCourse.name || !newCourse.city )
        {
            res.status(401).send("Campos obrigatorios não prenchidos.");
        }
        if(newCourse.name && newCourse.city)
        {
            modelCourse.put(newCourse,where).then(course=>{

                // If some invalid teacher id was informed
                if (invalidTeachers.length > 0)
                    return res.status(201).send(`Curso atualizado com Sucesso. Os seguintes ids de professores não foram encontrados: ${invalidTeachers}`);

                res.status(200).send('Curso atualizado com sucesso.');

            }).catch(err=>{
                console.error('Erro ao conectar a collection course',err);
                res.status(500).send("Erro ao conectar a collection course");
            });

        }

    })();

};
*/


//----------------------delete----------------------------------
exports.delete=function(req,res,err){
    let id = parseInt(req.params.id);

    let where = {status:1,'id':id};
    modelStudent.delete(where).then(result=>{
        if (result)
        {
            console.log(`INF: estudante removido`);
            res.status(200).send(`estudante removido`);
        }
        else
        {
            console.log('Nenhum estudante removido');
            res.status(204).send('Nenhum estudante removido');
        }
    }).catch(err=>{
        console.error("Erro ao remover o estudante", err);
        res.status(500).send("Erro ao estudante o curso");

    });
};
