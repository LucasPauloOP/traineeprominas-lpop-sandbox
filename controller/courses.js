var express = require('express');
var router = express.Router();

modelCourse = require('../models/course');
modelTeacher = require('../models/teacher');
modelStudent = require('../models/student');

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
        period:req.body.period.hasOwnProperty('period')||8,
        city:req.body.city,
        status : 1
    };
   if(!newCourse.name && !newCourse.city )
    {
        res.status(401).send("Campos obrigatorios não prenchidos.");
    }

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
    })();

};


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
        if(!newCourse.name && !newCourse.city )
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



    modelCourse.updateOne(newCourse,where).then(results =>{
       if(results.value){
           //updates all students who have this course
           modelStudent.updateStudent({'status':1,'course._id': results.value._id},{course:{...results.value}})
               .then(results=>{
                   if(invalidTeachers.length>0) {

                       return res.status(201).send('Curso atualizado com sucesso. Porem os professores com ' +
                           'esses ids não foram encontrados:${invalidTeachers}');
                   }

                       console.log('INF: Curso Atualizado');
                       res.status(200).send(`Curso Atualizado`);

               }).catch(err=>{
                   console.error(err);
           });

           }
       else{
           console.log('Curso não encontrado.');
           res.status(404).send('Curso não encontrado');
       }

       }).catch(err=>{
          console.error('Erro ao conectar a collection course',err);
          res.status(500).send('Erro ao conectar a collection course');

        });

    })();
};


//----------------------delete----------------------------------
exports.delete=function(req,res,err){

    (async()=> {
        let id = parseInt(req.params.id);
        let where = {status: 1, 'course.id': id};

        let numStudents;
        numStudents = await modelStudent.countStudents(where);

        if (numStudents > 0) {
            return res.status(401).send("Curso não pode ser removido, pois contem estudantes matriculados.");
        }

        where={id:'id',status:1};

        modelCourse.delete(where).then(result => {
            if (result) {
                console.log(`INF: curso removido`);
                res.status(200).send(`curso removido`);
            } else {
                console.log('Nenhum curso removido');
                res.status(204).send('Nenhum curso removido');
            }
        }).catch(err => {
            console.error("Erro ao remover o curso", err);
            res.status(500).send("Erro ao remover o curso");

        });

    })();
};
