var express = require('express');
var router = express.Router();

modelCourse = require('../models/course');
modelTeacher = require('../models/teacher');

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
        city:req.body.city,
        status : 1
    };
   /* if(!newCourse.name || !newCourse.city )
    {
        res.status(401).send("Campos obrigatorios não prenchidos.");
    }
    else {
        if(newCourse.name && newCourse.city)
        {
            modelCourse.post(newCourse).then(course=>{
                res.status(200).send('Curso cadastrado com sucesso.');

            }).catch(err=>{
                console.error('Erro ao conectar a collection course',err);
                res.status(500).send("Erro ao conectar a collection course");
            });

        }
    }*/

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
        /*courseCollection.insertOne(course, (err, result) => {

            if (err) {
                console.error("Erro ao Criar Um Novo Curso", err);
                res.status(500).send("Erro ao Criar Um Novo Curso");
            } else {*/
                if(!newCourse.name || !newCourse.city )
                {
                    res.status(401).send("Campos obrigatorios não prenchidos.");
                }
                //else {
                    if(newCourse.name && newCourse.city)
                    {
                        modelCourse.post(newCourse).then(course=>{

                            // If some invalid teacher id was informed
                            if (invalidTeachers.length > 0)
                                return res.status(201).send(`Curso Cadastrado com Sucesso. Os seguintes ids de professores não foram encontrados: ${invalidTeachers}`);

                            res.status(200).send('Curso cadastrado com sucesso.');

                        }).catch(err=>{
                            console.error('Erro ao conectar a collection course',err);
                            res.status(500).send("Erro ao conectar a collection course");
                        });

                    }
                //}

            //}
     //   });

    })();

};


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
        modelCourse.put(newTeacher,where).then(course=>{
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

/*
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