var express = require('express');
var router = express.Router();

modelTeacher = require('../models/teacher');


//-----------get all-----------------------------------
exports.getAll = (req,res) => {
    let status={status:1};

    let project = { projection:{ _id: 0, status: 0 } };

    modelTeacher.getall(status, project)
        .then(teachers => {
            console.log('----->controlller',teachers);
            res.status(201).send(teachers);
        }).catch(err=>{
        console.error("Erro ao conectar a collection 'user'", err);
        res.status(500).send("Erro ao conectar a collection 'user'");
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
        console.error("Erro ao conectar a collection 'user'", err);
        res.status(500).send("Erro ao conectar a collection 'user'");
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
    if(!newTeacher.name || !newTeacher.lastName )
    {
        res.status(401).send("Campos obrigatorios não prenchidos.");
    }
    else {
        if(newTeacher.name && newTeacher.lastName)
        {
            modelTeacher.post(newTeacher).then(teacher=>{
                res.status(200).send('Usuário cadastrado com sucesso.');

            }).catch(err=>{
                console.error('Erro ao conectar a collection user',err);
                res.status(500).send("Erro ao conectar a collection 'user'");
            });

        }
    }

};


//---------------------put--------------------------------
exports.put=function (req,res) {
    let id = parseInt(req.params.id);

    let where = {status:1,'id':id};

    var newTeacher = {
        name: req.body.name.hasOwnProperty('name'),
        lastName: req.body.lastName.hasOwnProperty('lastName'),
        phd: req.body.phd.hasOwnProperty('phd')||""
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
};
