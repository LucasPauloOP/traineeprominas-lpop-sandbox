// constants to use the database and its respective collection
const database = require('../database');
// const collection = database.getCollection('course');
//constant to use moongose
const mongoose = require('mongoose');

//constants to call the moongose ​​scheme
const courseSchema = require('../moongose_schema').schemaCourse;
const Course = mongoose.model('Course', courseSchema,'course');

// ------------------------GET ALL----------------------------------------------
exports.getAll = (query, projection) => {

  //search in the bd according to the parameters received in the variable query
  // and projects according to the variable projection
  return Course.find(query, projection);
};

//------------------------GET ID---------------------------------------------------
exports.getFiltered = (query, projection) => {

  //search in the bd according to the parameters received in the variable query
  // and projects according to the variable projection
  return Course.find(query, projection);
};

//------------------------POST----------------------------------------------------
exports.post = (course) => {

  //insert in the bd the data passed by parameter
    return Course.create(course);
};

//---------------------------PUT------------------------------------------------------
exports.put = (query, set) => {
  // edits according to the parameters in the query variable
    return Course.findOneAndUpdate(query, {$set: set}, {new:true});
};

//------------------------------DELETE------------------------------------------------
exports.delete = (query, set) => {

  //change the status according to what was passed in the query variable
  return Course.findOneAndUpdate(query, {$set: set});
};

//-----------------------------COUNT COURSE---------------------------------------------
exports.getCourse = (id) => {

  // find the courses according to the ids passed by parameters
  return Course.find({'id':id, 'status':1})
};

//------------------------------PROPAGATION OF TEACHERS: UPDATE---------------------------------
exports.updateTeacher = (id, set) => {



  //updates on the courses the teachers who have been put
  return Course.updateMany({'teacher.id':id, 'status':1}, {$set: {'teacher.$':set}},{new:true});
};

//-----------------------------PROPAGATION OF TEACHERS: DELETE-------------------------------------
exports.deleteTeacher = (id) => {

  //deletes teachers in progress if they are deleted
  return Course.findOneAndUpdate({'status':1, 'teacher.id':id}, {$pull: {"teacher": {'id': id}}},{new:true});
};

//-----------------------------PROPAGATION FOR COURSE: FIND--------------------------------------------
exports.getCoursebyTeacher = () => {

  //// find the courses according to the ids passed by parameters
  return Course.find({"status":1});
};