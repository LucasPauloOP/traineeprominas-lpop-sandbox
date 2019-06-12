// constants to use the database and its respective collection
// const database = require('../database');
// const collection = database.getCollection('student');


//constant to use moongose
const mongoose = require('mongoose');

//constants to call the moongose ​​scheme
const studentSchema = require('../moongose_schema').schemaStudent;
const Student = mongoose.model('Student', studentSchema);

//---------------------GET ALL----------------------------------
exports.getAll = (query, projection) => {
    //search in the bd according to the parameters received in the variable query
    // and projects according to the variable projection
    return Student.find(query, projection);
};

//----------------------GET ID-------------------------------------
exports.getFiltered = (query, projection) => {
    //search in the bd according to the parameters received in the variable query
    // and projects according to the variable projection
    return Student.find(query, projection);
};

//-----------------------POST--------------------------------------
exports.post = (student) => {
    //insert in the bd the data passed by parameter
    return collection.create(student);
};

//-----------------------PUT-----------------------------------------
exports.put = (query, set) => {
    // edits according to the parameters in the query variable
    return Student.findOneAndUpdate(query, {$set:set},{returnOriginal:false});
};

//-----------------------DELETE-----------------------------------------
exports.delete = (query, set) => {
    //change the status according to what was passed in the query variable
  return Student.findOneAndUpdate(query, set);
};

//-----------------------PROPAGATION OF COURSE: UPDATE-------------------
exports.updateCourse = (id, set) => {
    //updates on the student the course who have been put
  return Student.findOneAndUpdate({'course.id':id, 'status':1}, {$set: {"course.$": set}});
};

//-----------------------PROPAGATION OF COURSE: DELETE----------------------
exports.deleteCourse = (id, set) => {

    //deletes courses in progress if they are deleted
  return Student.findOneAndUpdate({'course.id':id, 'status':1}, {$set: {status:0}});
};

//-------------------------PROPAGATION OF COURSE: UPDATE TEACHER------------------------------
exports.updateTeacher = (course) => {
    //updates teachers within students
  return Student.findOneAndUpdate({'status':1, 'course.id':course.id}, {$set: {'course.$':course}});
};