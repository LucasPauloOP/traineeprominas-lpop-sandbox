//constants to use the required models
const studentModel = require('../model/student');
const courseModel = require('../model/course');

//constant to use moongose
const mongoose = require('mongoose');

//constants to call the moongose ​​scheme
const studentSchema = require('../moongose_schema').schemaStudent;
const Student = mongoose.model('Student', studentSchema,'student');


// const database = require('../database');
// const collection = database.getCollection('student');

//define id of course

var id;
Student.countDocuments({}, (err, count) => {
    id = count;
});

//joi schema of validation
const Joi = require('joi');

//which will be used to validate the required fields
const joiSchemaStudent = Joi.object().keys({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    age:Joi.number().required(),
    course:Joi.array().required()
});

//------------------------------------GET ALL-----------------------------------------------------------------------
exports.getAllStudents = (req, res) => {
    //  define query and projection for search
    let query = {status:1};
    let projection = {_id:0, id: 1, name: 1, lastName: 1, age:1, "course.id":1, "course.name":1, "course.period":1, "course.city":1, "course.teacher.id":1, "course.teacher.name":1, "course.teacher.lastName":1, "course.teacher.phd":1};

    // send to model
    studentModel.getAll(query, projection)
    .then(students => {
        if(students.length > 0){
            res.status(200).json(students);
        }else{
            res.status(204).json('Nenhum estudante cadastrado');
        }
    })
    .catch(err => {
        console.error("Erro ao conectar a collection student: ", err);
        res.status(500);
    });
};

//-----------------------------------GET FOR ID-------------------------------------------------------------------------
exports.getFilteredStudent = (req,res) => {
    //  define query and projection for search
    let query = {'id':parseInt(req.params.id), 'status':1};
    let projection = {_id:0, id: 1, name: 1, lastName: 1, age:1, "course.id":1, "course.name":1, "course.period":1, "course.city":1, "course.teacher.id":1, "course.teacher.name":1, "course.teacher.lastName":1, "course.teacher.phd":1};

    // send to model
    studentModel.getFiltered(query, projection)
    .then(student => {
        if(student.length > 0){
            res.status(200).json(student);
        }else{
            res.status(204).json('O estudante não foi encontrado');
        }
    })
    .catch(err => {
        console.error("Erro ao conectar a collection student: ", err);
        res.status(500);
    });
};

//---------------------------------POST-------------------------------------------------------------------------
exports.postStudent = (req, res) => {

    // check required attributes by joi schema
    //receives the data by the body and validates them,
    // abortEarly false avoids sending messages
    // if passed, the validations continue if you do not send an error message
        joiSchemaStudent.validate(req.body,{abortEarly:false})
            .then(result=>{
                (async () => {
                    // receive the course related to the inserted id
                    for(let i = 0; i < req.body.course.length; i++){
                        let course = await courseModel.getCourse(req.body.course[i]);
                        if(course.length > 0){ // if course exists
                            req.body.course[i] = course[0];
                        }else{
                            req.body.course.splice(i, 1);
                        }
                    }
                    //variable that validates by mongoose the data of the body
                    let student = new Student ({
                        id:parseInt(++id),
                        name:req.body.name,
                        lastName:req.body.lastName,
                        age:req.body.age,
                        course:req.body.course,
                        status:1
                    });

                    //validation if no error returns and proceeds with data
                    // if error return sends error message.
                    student.validate(error=>{
                        if(!error){

                            // send to model
                            studentModel.post(student)
                                .then(result => {

                                    res.status(201).json('Estudante cadastrado com sucesso!');
                                })
                                .catch(err => {
                                    console.error("Erro ao conectar a collection student: ", err);
                                    res.status(500);
                                });
                        }
                        else{
                            //decrements the id to prevent id
                            // from leaving the expected count
                            student.id=parseInt(--id);

                            //sends a custom error message accordingly if
                            // client try to register a student with age < 17 or course that does not exist.
                                if (student.age < 17)
                                {

                                    res.status(401).json('Cadastro de estudantes só é possível com estudantes maiores de 17 anos.');
                                }

                                if(student.course.length!=1)
                                {

                                    res.status(401).json('Cadastro de estudantes só é possível com cursos existentes.');
                                }

                                // if(student.age<17 && student.course.length!=1)
                                // {
                                //     res.status(401).send('Cadastro de estudantes só é possível cadastrar  estudantes maiores de 17 anos e matriculados em um curso existente.');
                                // }

                        }

                    });

                })();

            }).catch(err=>{
                res.status(401).json('Campo obrigatório não cadastrado');
        });

};

//-------------------------------------------PUT-------------------------------------------------------------------------
exports.putStudent = (req, res) => {
    //  define query and set for search and update
    let query = {'id': parseInt(req.params.id), 'status': 1};

    //check required attributes by joi schema
    // receives the data by the body and validates them,
    // abortEarly false avoids sending messages
    //if passed, the validations continue if you do not send an error message
        joiSchemaStudent.validate(req.body,{abortEarly:false})
            .then(result=>{

                //variable that validates by mongoose the data of the body
                let student = {
                    id:parseInt(req.params.id),
                    name:req.body.name,
                    lastName:req.body.lastName,
                    age:req.body.age,
                    course:req.body.course,
                    status:1
                };
                (async () => {
                    // receive the course related to the inserted id
                    for(let i = 0; i < req.body.course.length; i++){
                        let course = await courseModel.getCourse(req.body.course[i]);

                        if(course.length > 0){ // if course exists
                            req.body.course[i] = course[0];
                        }else{
                            req.body.course.splice(i, 1);
                        }

                    }

                    //variable that validates by mongoose the data of the body
                    let validate = new Student(student);

                    //validation if no error returns and proceeds with data
                    // if error return sends error message
                    validate.validate(error=>{
                        if(!error)
                        {
                            // console.log('>>>>>>>>>>',error);
                            // send to model
                            studentModel.put(query,student)
                                .then(result => {
                                    if(result)
                                    {
                                        res.status(200).json('Estudante editado com sucesso!');
                                    }
                                    else{
                                        res.status(401).json('Não foi possível editar o estudante (idade ou curso inválido)');
                                    }

                                })
                                .catch(err => {
                                    console.error("Erro ao conectar a collection student: ", err);
                                    res.status(500);
                                });
                        }
                        else{
                            // console.log(">>>>>>>>>>>else",error);

                            //sends a custom error message accordingly if
                            // client try to register a student with age < 17 or course that does not exist.
                            if (student.age < 17)
                            {
                                res.status(401).json('Cadastro de estudantes só é possível com estudantes maiores de 17 anos.');
                            }
                            else if(student.course.length!=1)
                            {

                                res.status(401).json('Cadastro de estudantes só é possível com mais de 1 professor.');
                            }


                        }
                    });

                })();

            }).catch(err=>{
              res.status(401).json('Campos obrigatórios não preenchidos.');
        });
};


//----------------------------------------DELETE--------------------------------------------------------------------
exports.deleteStudent = (req, res) => {
    //  define query and set for search and delete    
    let query = {'id': parseInt(req.params.id), 'status':1};
    let set = {$set: {status:0}};

    // send to model
    studentModel.delete(query, set)
    .then(result => {
        if(result){ // if student exists
            // console.log('O estudante foi removido');
            res.status(200).json('O estudante foi removido com sucesso');
          }else{
            // console.log();
            res.status(204).json('Nenhum estudante foi removido');
          }
    })
    .catch(err => {
        console.error("Erro ao conectar a collection student: ", err);
        res.status(500);
    });
};