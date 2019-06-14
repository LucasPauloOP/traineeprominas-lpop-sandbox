//constants to use the required models
const teacherModel = require('../model/teacher');
const courseModel = require('../model/course');
const studentModel = require('../model/student');

//constant to use moongose
const mongoose = require('mongoose');

//constants to call the moongose ​​scheme
const teacherSchema = require('../moongose_schema').schemaTeacher;
const Teacher = mongoose.model('Teacher', teacherSchema,'teacher');

//define id of teacher
// const database = require('../database');
// const collection = database.getCollection('teacher');

var id;

//async function to count documents and send their size
var id;
Teacher.countDocuments({}, (err, count) => {
    id = count;
});


//joi schema of validation
const Joi = require('joi');

//which will be used to validate the required fields
const joiSchemaTeacher = Joi.object().keys({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    phd:Joi.boolean().required()
});


//-----------------------------GET ALL------------------------------------------------------------
exports.getAllTeachers = (req, res) => {
    //  define query and projection for search
    let query = {'status':1};
    let projection = {_id:0, id: 1, name: 1, lastName: 1, phd:1};

    // send to model
    //if the return is greater than 0 it shows on the screen
    // if it does not show an error message
    teacherModel.getAll(query, projection)
    .then(teachers => {
        if(teachers.length > 0){
            res.status(200).send(teachers);
        }else{
            res.status(204).send('Nenhum professor cadastrado');
        }
    })
    .catch(err => {
        console.error("Erro ao conectar a collection teacher: ", err);
        res.status(500);
    });
};

//-------------------------GET FOR ID--------------------------------------------------------------
exports.getFilteredTeacher = (req,res) => {
    //  define query and projection for search    
    let query = {'id':parseInt(req.params.id), 'status':1};
    let projection = {_id:0, id: 1, name: 1, lastName: 1, phd:1};

    // send to model
    ////if the return is greater than 0 it shows on the screen
    // if it does not show an error message
    teacherModel.getFiltered(query, projection)
    .then(teacher => {
        if(teacher.length > 0){
            res.status(200).send(teacher);
        }else{
            res.status(204).send('O professor não foi encontrado');
        }
    })
    .catch(err => {
        console.error("Erro ao conectar a collection teacher: ", err);
        res.status(500);
    });
};


//-----------------------------POST-----------------------------------------------------------------
exports.postTeacher = (req, res) => {

    // check required attributes by joi schema
    //receives the data by the body and validates them,
    // abortEarly false avoids sending messages
    // if passed, the validations continue if you do not send an error message

    joiSchemaTeacher.validate(req.body,{abortEarly:false})
        .then(result=>{

            //variable that validates by mongoose the data of the body
            let teacher = new Teacher({
                id:parseInt(++id),
                name:req.body.name,
                lastName:req.body.lastName,
                phd:req.body.phd,
                status:1
            });

            //validation if no error returns and proceeds with data
            // if error return sends error message
            teacher.validate(error=>{
                if(!error){

                    //send for model
                    teacherModel.post(teacher)
                        .then(result => {
                            res.status(201).send('Professor cadastrado com sucesso!');
                        })
                        .catch(err => {
                            console.error("Erro ao conectar a collection teacher: ", err);
                            res.status(500);
                        });
                }
                else {
                    //decrements the id to prevent id
                    // from leaving the expected count
                    teacher.id = parseInt(--id);

                    //sends a custom error message accordingly if
                    // client try to register a phd different from true
                    if (!teacher.phd) {

                        res.status(401).send('Não foi possível cadastrar o professor (phd inválido) phd precisa ser verdadeiro.');
                    }
                }
            });

        }).catch(err=>{
            // console.log(err);
            res.status(401).send('Campos obrigatorios não preenchidos.');
    });
};


//--------------------------------PUT---------------------------------------------------------------
exports.putTeacher = (req, res) => {

    //  define query and set for search and update
    let query = {'id': parseInt(req.params.id), 'status': 1};

    //check required attributes by joi schema
    // receives the data by the body and validates them,
    // abortEarly false avoids sending messages
    //if passed, the validations continue if you do not send an error message
    joiSchemaTeacher.validate(req.body,{abortEarly:false})
        .then(result=>{
            // console.log(result);
            //variable that validates by mongoose the data of the body
            let teacher = {
                id: parseInt(req.params.id),
                name: req.body.name,
                lastName: req.body.lastName,
                phd: req.body.phd,
                status: 1
            };

            //variable that validates by mongoose the data of the body
            let validate = new Teacher(teacher);

            //validation if no error returns and proceeds with data
            // if error return sends error message
            validate.validate(error => {
                if (!error) {
                    // send to model
                    teacherModel.put(query, teacher)
                        .then(async (result) => {
                            if (result) { // if professor exists
                                res.status(200).send('Professor editado com sucesso!');

                                //updates the course that contains this teacher
                                await courseModel.updateTeacher(parseInt(req.params.id), result);

                                // receives the updated teacher and updates the student that contains this teacher
                                courseModel.getCoursebyTeacher().then(courses => {
                                    for (var i = 0; i < courses.length; i++) {
                                        studentModel.updateTeacher(courses[i]);
                                    }

                                });

                            } else {
                                res.status(401).send('Não é possível editar professor inexistente');
                            }

                        }).catch(err => {
                        console.error("Erro ao conectar a collection teacher: ", err);
                        res.status(500);
                    })
                }

                else {
                    //sends a custom error message accordingly if
                    // client try to register a phd different from true
                        if(!teacher.phd ){
                            res.status(401).send('Não foi possível cadastrar o professor (phd inválido) phd deverá ser verdadeiro.');
                        }

                }
            });

        }).catch(err=>{
            // console.log(err);
        res.status(401).send('Campos obrigatórios não preenchidos.');
    });
};


//--------------------------------DELETE FOR ID----------------------------------------------------
exports.deleteTeacher = async(req, res) => {
    //  define query and set for search and delete

        let session = await mongoose.startSession();
        session.startTransaction();
            try{

                const opts={session,new: true};

                let query = {'id': parseInt(req.params.id), 'status':1};
                let set = {status:0};
                // send to model
                 await teacherModel.delete(query, set).session(session);
                     //  updates the course that contains that teacher
                        await courseModel.deleteTeacher(parseInt(req.params.id)).session(session);

                        // receives the updated teacher and updates the student that contains this teacher
                        await courseModel.getCoursebyTeacher().session(session).then((async courses => {
                            for(var i = 0; i<courses.length; i++){
                              await studentModel.updateTeacher(courses[i].session(session));
                            }
                        }));

                        if(set){ // if professor exists
                            // console.log('O professor foi removido');
                            res.status(200).send('O professor foi removido com sucesso');

                        }else{
                            // console.log('Nenhum professor foi removido');
                            res.status(204).send('Nenhum professor foi removido');
                        }
                    // .catch(err => {
                    //     console.error("Erro ao conectar a collection teacher: ");
                    //     res.status(500).send("Erro ao conectar ao banco de dados.");
                    // });
                await session.commitTransaction();
                session.endSession();

            }catch (error) {
                console.error("Erro ao conectar a collection teacher: ");
                res.status(500).send("Erro ao conectar ao banco de dados.");
                await session.abortTransaction();
                session.endSession();
                console.error(error);
            }

};