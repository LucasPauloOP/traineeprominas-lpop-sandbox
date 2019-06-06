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

    modelTeacher.change(newTeacher,{'id':id,status:1}).then(result=> {
        if(result == null)
        {
            res.status(403).send("Não foi possivel completar a atualização");
        }
        else {
            modelCourse.updateMany(
                {'teacher.id': newTeacher.id},
                {$set: {'teacher.$': newTeacher}}).then(results => {
                if (results) {
                    modelCourse.get({'teahcer.id': id, 'status': 1}, {}).then(courses => {
                        courses.forEach((found) => {
                            modelStudent.replace(
                                {'status': 1, 'course.id': found.id},
                                {$set: {'course': found}})
                        })
                    });
                    res.status(201).send('Professor atualizado');
                } else {
                    res.send('Erro na modificação');
                }

            })
        }
            }).catch(found =>{
        console.error('Ocorreu um erro ao se conectar a colecao teacher',found);
        res.status(500);
    })

};

    //let where = {status:1,'id':id};


//----------------------delete----------------------------------
exports.delete=function(req,res,err){
    let id = parseInt(req.params.id);
    let where = {status:1,'id':id};

    modelTeacher.delete(where).then(result =>{
            if (results.value == null) {
                res.status(204).send("Não foi possivel encontrar o usuário")
            }
            else {
                modelCourse.updateMany({}, {$pull: {"teacher": {"id": id}}}).then(result => {
                    modelCourse.get({"status": 1}).then(courses => {
                        courses.forEach((found) => {
                            modelStudent.replace(
                                {"status": 1, "course.id": found.id},
                                {$set: {"course": found}})
                        })
                    })});
                res.status(201).send('O professor foi removido com sucesso')
            }
    }).catch(found=>{
        console.error("Erro ao remover o Professor", found);
        res.status(500).send("Erro ao remover o Professor");
    })

};
