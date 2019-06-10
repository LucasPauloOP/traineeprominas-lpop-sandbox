const studentModel = require('../model/student');
const courseModel = require('../model/course');

//moongose
const mongoose = require('mongoose');
const studentSchema = require('../moongose_schema').schemaStudent;
const Student = mongoose.model('Student', studentSchema);

//id
const database = require('../database');
const collection = database.getCollection('student');

var id;

(async () => {
    id = await collection.countDocuments({});
})();

exports.getAllStudents = (req, res) => {
    //  define query and projection for search
    let query = {status:1};
    let projection = {projection: {_id:0, id: 1, name: 1, lastName: 1, age:1, "course.id":1, "course.name":1, "course.period":1, "course.city":1, "course.teacher.id":1, "course.teacher.name":1, "course.teacher.lastName":1, "course.teacher.phd":1}};

    // send to model
    studentModel.getAll(query, projection)
    .then(students => {
        if(students.length > 0){
            res.status(200).send(students);        
        }else{
            res.status(204).send('Nenhum estudante cadastrado');
        }
    })
    .catch(err => {
        console.error("Erro ao conectar a collection student: ", err);
        res.status(500);
    });
};

exports.getFilteredStudent = (req,res) => {
    //  define query and projection for search
    let query = {'id':parseInt(req.params.id), 'status':1};
    let projection = {projection: {_id:0, id: 1, name: 1, lastName: 1, age:1, "course.id":1, "course.name":1, "course.period":1, "course.city":1, "course.teacher.id":1, "course.teacher.name":1, "course.teacher.lastName":1, "course.teacher.phd":1}};

    // send to model
    studentModel.getFiltered(query, projection)
    .then(student => {
        if(student.length > 0){
            res.status(200).send(student);
        }else{
            res.status(204).send('O estudante não foi encontrado');
        }
    })
    .catch(err => {
        console.error("Erro ao conectar a collection student: ", err);
        res.status(500);
    });
};

exports.postStudent = (req, res) => {

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
              // creates student array to be inserted
              let student = new Student ({
                  id:parseInt(++id),
                  name:req.body.name,
                  lastName:req.body.lastName,
                  age:req.body.age,
                  course:req.body.course,
                  status:1
              });

            console.log('---------->', student);
              student.validate(error=>{
                  console.log(error);
                  // send to model
                  if(!error){
                      studentModel.post(student)
                          .then(result => {

                                  res.status(201).send('Estudante cadastrado com sucesso!');
                          })
                          .catch(err => {
                              console.error("Erro ao conectar a collection student: ", err);
                              res.status(500);
                          });
                  }
                  else{
                      res.status(401).send('Não foi possivel cadastrar estudante, campos obrigatórios não preenchidos');
                  }

              });

    })();

};

exports.putStudent = (req, res) => {
    //  define query for search    
    let query = {'id': parseInt(req.params.id), 'status': 1};


        // creates student array to update
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
            
            // send to model
            let validate = new Student(student);
            validate.validate(error=>{
                if(!error)
                {
                    studentModel.put(query,student)
                        .then(result => {
                            if(result.value)
                            {
                                res.status(200).send('Estudante editado com sucesso!');
                            }
                             else{
                                res.status(401).send('Não foi possível editar o estudante (idade ou curso inválido)');
                            }

                        })
                        .catch(err => {
                            console.error("Erro ao conectar a collection student: ", err);
                            res.status(500);
                        });
                }
                else{
                    res.status(401).send('Não foi possível editar o estudante (idade ou curso inválido)');
                }
            });

        })();
};

exports.deleteStudent = (req, res) => {
    //  define query and set for search and delete    
    let query = {'id': parseInt(req.params.id), 'status':1};
    let set = {$set: {status:0}};

    // send to model
    studentModel.delete(query, set)
    .then(result => {
        if(result.value){ // if student exists
            console.log('O estudante foi removido');
            res.status(200).send('O estudante foi removido com sucesso');
          }else{
            console.log('Nenhum estudante foi removido');
            res.status(204).send();
          }
    })
    .catch(err => {
        console.error("Erro ao conectar a collection student: ", err);
        res.status(500);
    });
};