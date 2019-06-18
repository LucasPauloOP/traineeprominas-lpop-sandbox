//constants to use the required models
const courseModel = require('../model/course');
const teacherModel = require('../model/teacher');
const studentModel = require('../model/student');

//constant to use moongose
const mongoose = require('mongoose');

//constants to call the moongose ​​scheme
const courseSchema = require('../moongose_schema').schemaCourse;
const Course = mongoose.model('Course', courseSchema,'course');

//define id of course

var id;

//async function to count documents and send their size
var id;
Course.countDocuments({}, (err, count) => {
  id = count;
});


//joi schema of validation
const Joi = require('joi');

//which will be used to validate the required fields
const joiSchemaCourse = Joi.object().keys({
  name: Joi.string().required(),
  city: Joi.string().required(),
  period:Joi.number().default(8).required(),
  teacher:Joi.array().required()
});

//------------------------GET ALL----------------------------------------------------------------
exports.getAllCourses = (req, res) => {
  //  define query and projection for search
  let query = {status:1};
  let projection = {_id:0, id:1, name:1, period:1, city:1, 'teacher.id':1, 'teacher.name':1, 'teacher.lastName':1, 'teacher.phd':1};

  // send to model
  //if the return is greater than 0 it shows on the screen
  // if it does not show an error message
  courseModel.getAll(query, projection)
  .then(courses => {
    if(courses.length == 0){
        res.status(204).json('Nenhum curso cadastrado');
    }else{
      res.status(200).json(courses);
    }
  })
  .catch(err => {
    console.error('Erro ao conectar a collection course:', err);
    res.status(500);
  });
};

//--------------------------------------------GET FOR ID---------------------------------------------------------------
exports.getFilteredCourse = (req,res) => {
  //  define query and projection for search
  let query = {'id':parseInt(req.params.id), 'status':1};
  let projection = {_id:0, id:1, name:1, period:1, city:1, 'teacher.id':1, 'teacher.name':1, 'teacher.lastName':1, 'teacher.phd':1};

  // send to model
  ////if the return is greater than 0 it shows on the screen
  // if it does not show an error message
  courseModel.getFiltered(query, projection)
  .then(course => {
    if(course.length == 0){
      res.status(204).json('O curso não foi encontrado');
    }else{
      res.status(200).json(course);
    }
  })
  .catch(err => {
    console.error('Erro ao conectar a collection course:', err);
    res.status(500);
  });
};

//------------------------------------------POST-----------------------------------------------------------------------
exports.postCourse = (req, res) => {

  // check required attributes by joi schema
  //receives the data by the body and validates them,
  // abortEarly false avoids sending messages
  // if passed, the validations continue if you do not send an error message
  joiSchemaCourse.validate(req.body,{abortEarly:false}).then(result=>{
    (async () => {
      // check if any teacher id has been entered
      if(req.body.teacher == undefined || req.body.teacher.length == 0){
        delete course.teacher;
      }else{
        // check if any teacher id has been entered
        if(req.body.teacher){
          for(let i = req.body.teacher.length-1; i > -1 ; i--){
            teacher = await teacherModel.getTeacher(req.body.teacher[i],i);
            if(teacher.length > 0){
              req.body.teacher[i] = teacher[0];
            }else{ // if teacher exists
              req.body.teacher.splice(i, 1);
            }
          }
        }

        //variable that validates by mongoose the data of the body
        let course = new Course ({
          id:parseInt(++id),
          name:req.body.name,
          period:req.body.period || 8,
          city:req.body.city,
          teacher:req.body.teacher,
          status:1,
        });

        //validation if no error returns and proceeds with data
        // if error return sends error message.
        course.validate(error=>{
          console.log(course);
            if(!error){

              // send to model
              courseModel.post(course)
                  .then(result => {
                    res.status(201).json('Curso cadastrado com sucesso!');

                  })
                  .catch(err => {
                    console.error('Erro ao conectar a collection course:', err);
                    res.status(500);
                  });
            }
          else{
              //decrements the id to prevent id
              // from leaving the expected count
            course.id=parseInt(--id);

              //sends a custom error message accordingly if
              // client try to register a course with 2 invalid teachers
              if(course.teacher.length < 2 ){
                res.status(401).json('Curso precisa ter no mínimo 2 professores para ser cadastrado.');
              }
          }
        })
      }

    })();

  }).catch(err=>{
    res.status(401).json('Campos obrigatórios não preenchidos.');
  });
};


//---------------------------------------PUT------------------------------------------------------------------------
exports.putCourse = (req, res) => {
  //  define query and set for search and update
  let query = {'id': parseInt(req.params.id),'status': 1};

  //check required attributes by joi schema
  // receives the data by the body and validates them,
  // abortEarly false avoids sending messages
  //if passed, the validations continue if you do not send an error message
  joiSchemaCourse.validate(req.body,{abortEarly:false})
      .then(result=>{
        //variable that validates by mongoose the data of the body
        let course = {
          id: parseInt(req.params.id),
          name:req.body.name,
          period:req.body.period || 8,
          city:req.body.city,
          teacher:req.body.teacher,
          status:1
        };

        (async () => {
          if(req.body.teacher){//if course is inserted
            // receive the teacher related to the inserted id
            for(let i = req.body.teacher.length-1; i > -1 ; i--){
              teacher = await teacherModel.getTeacher(req.body.teacher[i]);
              if(teacher.length > 0){
                req.body.teacher[i]=teacher[0];
              }else{ // if teacher exists
                req.body.teacher.splice(i, 1);
              }
            }

          }
          //variable that validates by mongoose the data of the body
          let validate  = new Course(course);

          //validation if no error returns and proceeds with data
          // if error return sends error message
          validate.validate(error =>{
            if(!error){
              // send to model
              courseModel.put(query, course)
                  .then(result => {
                    if(result)
                    {
                     // console.log(">>>>>>>>>",result);
                      // update course in student
                      res.status(200).json('Curso editado com sucesso!');
                      studentModel.updateCourse(parseInt(req.params.id), result);
                    }
                    else{
                      res.status(401).json('Não é possível editar curso inexistente');
                    }
                  })
                  .catch(err => {
                    console.error('Erro ao conectar a collection course:', err);
                    res.status(500);
                  });

            }
            else{
                //sends a custom error message accordingly if
                // client try to register a course with 2 invalid teachers
                if(course.teacher.length < 2 ){
                  res.status(401).json('Curso precisa ter no mínimo 2 professores para ser cadastrado.');
                }
            }
          });

        })();

      }).catch(err=>{

        res.status(401).json('Campos obrigatórios não preenchidos.');
  });

};

//-------------------------------------------DELETE--------------------------------------------------------------
exports.deleteCourse = (req, res) => {
  // define query and set to search and delete
  let query = {'id': parseInt(req.params.id),'status':1};
  let set = {status:0};
  // console.log("entrou");
  // send to model
  courseModel.delete(query, set)
  .then(result => {
    // delete course in student
    studentModel.deleteCourse(parseInt(req.params.id));
    if(result){
      // console.log('O curso foi removido');
      res.status(200).json('O curso foi removido com sucesso');
    }else{
      // console.log('Nenhum curso foi removido');
      res.status(204).json('Nenhum curso foi removido');
    }
  })
  .catch(err => {
    console.error('Erro ao conectar a collection course:', err);
    res.status(500);
  });
};