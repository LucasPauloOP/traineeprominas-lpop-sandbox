var express = require('express');
var router = express.Router();

modelCourse = require('../models/course');


//-----------get all-----------------------------------
exports.getAll = (req,res) => {
    let status={status:1};

    let project = { projection:{ _id: 0, status: 0 } };

    modelCourse.getall(status, project)
        .then(courses => {
            console.log('----->controlller',courses);
            res.status(201).send(courses);
        }).catch(err=>{
        console.error("Erro ao conectar a collection course", err);
        res.status(500).send("Erro ao conectar a collection course");
    });
};


//-----------get one-------------------------------
exports.getOne = (req,res)=>{
    let id = parseInt(req.params.id);

    let where = {status:1,'id':id};

    let project = { projection: {  _id: 0, status: 0 } };

    modelCourse.getone(where,project)
        .then(coursers => {
            res.status(201).send(coursers);
        }).catch(err => {
        console.error("Erro ao conectar a collection course", err);
        res.status(500).send("Erro ao conectar a collection course");
    });
};


//---------------post------------------------------
exports.post=function(req,res){

    let status = {status:1};

    var newCourse = {
        name: req.body.name,
        period:req.body.period||8,
        teachers: req.body.teachers||' ',
        city:req.body.city,
        status : 1
    };
    if(!newCourse.name || !newCourse.city )
    {
        res.status(401).send("Campos obrigatorios não prenchidos.");
    }
    else {
        if(newCourse.name && newCourse.city)
        {
            modelCourse.post(newCourse).then(course=>{
                res.status(200).send('Usuário cadastrado com sucesso.');

            }).catch(err=>{
                console.error('Erro ao conectar a collection user',err);
                res.status(500).send("Erro ao conectar a collection 'user'");
            });

        }
    }

};

/*
//---------------------put--------------------------------
exports.put=function (req,res) {
    let id = parseInt(req.params.id);

    let where = {status:1,'id':id};

    var newTeacher = {
        name: req.body.name,
        lastName: req.body.lastName,
        phd: req.body.phd||""
    };

    if(newTeacher.name && newTeacher.lastName )
    {
        modelTeacher.put(newTeacher,where).then(teacher=>{
            res.status(201).send('Usuário atualizado com sucesso.');
        }).catch(err=>{
            console.error('Erro ao conectar a collection user',err);
            res.status(500).send("Erro ao conectar a collection 'user'");
        });
    }

    else{
        res.status(401).send("Campos obrigatorios não prenchidos.");
    }

};


//----------------------delete----------------------------------
exports.delete=function(req,res,err){
    let id = parseInt(req.params.id);

    let where = {status:1,'id':id};
    modelTeacher.delete(where).then(result=>{
        if (result)
        {
            console.log(`INF: Usuário Removido`);
            res.status(200).send(`Usuário Removido`);
        }
        else
        {
            console.log('Nenhum Usuário Removido');
            res.status(204).send('Nenhum Usuário Removido');
        }
    }).catch(err=>{
        console.error("Erro ao remover o usuário", err);
        res.status(500).send("Erro ao remover o usuário");

    });
};
*/