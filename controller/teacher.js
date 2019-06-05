var express = require('express');
var router = express.Router();

modelTeacher = require('../models/teacher');
modelCourse = require('../models/course');
modelStudent=require('../models/student');

//-----------get all-----------------------------------
exports.getAll = (req,res) => {
    let status={status:1};

    let project = { projection:{ _id: 0, status: 0 } };

    modelTeacher.getall(status, project)
        .then(teachers => {
            //console.log('----->controlller',teachers);
            res.status(201).send(teachers);
        }).catch(err=>{
        console.error("Erro ao conectar a collection 'teacher'", err);
        res.status(500).send("Erro ao conectar a collection 'teacher'");
    });
};


//-----------get one-------------------------------
exports.getOne = (req,res)=>{
    let id = parseInt(req.params.id);

    let where = {status:1,'id':id};

    let project = { projection: {  _id: 0, status: 0 } };

    modelTeacher.getone(where,project)
        .then(teachers => {
            res.status(201).send(teachers);
        }).catch(err => {
        console.error("Erro ao conectar a collection 'teacher'", err);
        res.status(500).send("Erro ao conectar a collection 'teacher'");
    });
};


//---------------post------------------------------
exports.post=function(req,res){

    let status = {status:1};

    var newTeacher = {
        name: req.body.name,
        lastName: req.body.lastName,
        phd: req.body.phd.hasOwnProperty('phd')||'Não informado',
        status : 1
    };
    if(!newTeacher.name && !newTeacher.lastName )
    {
        res.status(401).send("Campos obrigatorios não prenchidos.");
    }
    else {
        if(newTeacher.name && newTeacher.lastName)
        {
            modelTeacher.post(newTeacher).then(teacher=>{
                res.status(200).send('Professor cadastrado com sucesso.');

            }).catch(err=>{
                console.error('Erro ao conectar a collection teacher',err);
                res.status(500).send("Erro ao conectar a collection 'teacher'");
            });

        }
    }

};


//---------------------put--------------------------------
exports.put=function (req,res) {
    let id = parseInt(req.params.id);

    let where = {status:1,'id':id};

    var newTeacher = {
        name: req.body.name,
        lastName: req.body.lastName,
    };
    if(req.body.phd)
    {
        newTeacher.phd= req.body.phd ||' ';
    }

    if(!newTeacher.name && !newTeacher.lastName)
    {
        res.status(401).send('Campos obrigatorios foram deixados em branco');
    }

    modelTeacher.updateOne(newTeacher,{'id':id,status:1}).then(result=> {
        let updatedTeacher = result.value;
        console.log('----->result:',result.value);
        (async () => {

            try {

                // Updates the teacher from all courses that he is associated
                await modelCourse.updateMany(
                    {"status": 1, "teacher.id": updatedTeacher.id},
                    {"teacher.$": updatedTeacher});

                // Updates the teacher from all student.course that he is associated
                await modelStudent.updateMany(
                    {"status": 1, "course.teacher.id": updatedTeacher.id},
                    {"course.teacher.$": updatedTeacher});

            } catch (err) {
                console.error(err);
            }

            console.log(`INF: Professor Atualizado`);
            res.status(200).send(`Professor Atualizado`);

        })();
    })
        .catch(err => {
            console.error("Erro ao conectar a collection teacher", err);
            res.status(500).send("Erro ao conectar a collection teacher");
        });


};


//----------------------delete----------------------------------
/*exports.delete=function(req,res,err){
    let id = parseInt(req.params.id);

    let where = {status:1,'id':id};
    modelCourse.delete(where).then(result=>{
        if (result)
        {
            console.log(`INF: Curso Removido`);
            res.status(200).send('Curso removido com sucesso');
        }
        else
        {
            console.log('Nenhum curso Removido');
            res.status(204).send('Nenhum curso Removido');
        }
    }).catch(err=>{
        console.error("Erro ao remover o curso", err);
        res.status(500).send("Erro ao remover o curso");

    });
};*/
