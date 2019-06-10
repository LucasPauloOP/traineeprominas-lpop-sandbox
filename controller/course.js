const courseModel = require('../model/course');
const teacherModel = require('../model/teacher');
const studentModel = require('../model/student');

//schema moongose
const mongoose = require('mongoose');
const courseSchema = require('../moongose_schema').schemaCourse;
const Course = mongoose.model('Course', courseSchema);

//id
const database = require('../database');
const collection = database.getCollection('course');

var id;

(async () => {
  id = await collection.countDocuments({});
})();

//joi schema of validation
const Joi = require('joi');

const joiSchemaTeacher = Joi.object().keys({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  phd:Joi.boolean().required()
});

exports.getAllCourses = (req, res) => {
  //  define query and projection for search
  let query = {status:1};
  let projection = {projection: {_id:0, id:1, name:1, period:1, city:1, 'teacher.id':1, 'teacher.name':1, 'teacher.lastName':1, 'teacher.phd':1}}

  // send to model
  courseModel.getAll(query, projection)
  .then(courses => {
    if(courses.length == 0){
        res.status(204).send('Nenhum curso cadastrado');
    }else{
      res.status(200).send(courses);        
    }
  })
  .catch(err => {
    console.error('Erro ao conectar a collection course:', err);
    res.status(500);
  });
};

exports.getFilteredCourse = (req,res) => {
  //  define query and projection for search
  let query = {'id':parseInt(req.params.id), 'status':1};
  let projection = {projection: {_id:0, id:1, name:1, period:1, city:1, 'teacher.id':1, 'teacher.name':1, 'teacher.lastName':1, 'teacher.phd':1}}

  // send to model
  courseModel.getFiltered(query, projection)
  .then(course => {
    if(course.length == 0){
      res.status(204).send('O curso não foi encontrado');
    }else{
      res.status(200).send(course);        
    }
  })
  .catch(err => {
    console.error('Erro ao conectar a collection course:', err);
    res.status(500);
  });
};

exports.postCourse = (req, res) => {

  (async () => {
    // check if any teacher id has been entered
    if(req.body.teacher == undefined || req.body.teacher.length == 0){
      delete course.teacher;
    }else{
      // receive the teacher related to the inserted id
      for(let i = req.body.teacher.length-1; i > -1 ; i--){
        teacher = await teacherModel.getTeacher(req.body.teacher[i]);
        if(teacher == null){
          req.body.teacher.splice(i, 1);
        }else{ // if teacher exists
          req.body.teacher[i] = teacher[0];
        }
      }
      // creates course array to be inserted
    let course = new Course ({
      id:parseInt(++id),
      name:req.body.name,
      period:req.body.period || 8,
      city:req.body.city,
      teacher:req.body.teacher,
      status:1,
    });

    course.validate(error=>{
        if(!error){
          // send to model
          courseModel.post(course)
              .then(result => {
                  res.status(201).send('Curso cadastrado com sucesso!');
              })
              .catch(err => {
                console.error('Erro ao conectar a collection course:', err);
                res.status(500);
              });
        }
        else{
          course.id=parseInt(--id);
          res.status(401).send('Não foi possível cadastrar o curso');
        }
      })
    }

  })();


};

exports.putCourse = (req, res) => {
  // define query for search
  let query = {'id': parseInt(req.params.id),'status': 1};

  // check required attributes


      // creates course array to update
    let course = {
      id: parseInt(req.params.id),
      name:req.body.name,
      period:req.body.period || 8,
      city:req.body.city,
      teacher:req.body.teacher,
      status:1
    };



        (async () => {
          // receive the teacher related to the inserted id
          for(let i = req.body.teacher.length-1; i > -1 ; i--){
            teacher = await teacherModel.getTeacher(req.body.teacher[i]);
            if(teacher == null){
              req.body.teacher.splice(i, 1);
            }else{ // if teacher exists
              req.body.teacher[i] = teacher[0];
            }
          }
          // send to model
          let validate  = new Course(course);
          validate.validate(error =>{
           if(!error){
             courseModel.put(query, course)
                 .then(result => {
                   if(result.value)
                   {
                     // update course in student
                     res.status(200).send('Curso editado com sucesso!');
                     studentModel.updateCourse(parseInt(req.params.id), result.value);
                   }
                   else{
                     res.status(401).send('Não é possível editar curso inexistente');
                   }
                 })
                 .catch(err => {
                   console.error('Erro ao conectar a collection course:', err);
                   res.status(500);
                 });

           }
           else{
             res.status(401).send('Não é possível editar curso inexistente');
           }
          });

        })();

};

exports.deleteCourse = (req, res) => {
  // define query and set to search and delete
  let query = {'id': parseInt(req.params.id),'status':1};
  let set = {status:0};

  // send to model
  courseModel.delete(query, set)
  .then(result => {
    // delete course in student
    studentModel.deleteCourse(parseInt(req.params.id));
    if(result.value){
      console.log('O curso foi removido');
      res.status(200).send('O curso foi removido com sucesso');
    }else{
      console.log('Nenhum curso foi removido');
      res.status(204).send();
    }
  })
  .catch(err => {
    console.error('Erro ao conectar a collection course:', err);
    res.status(500);
  });
};