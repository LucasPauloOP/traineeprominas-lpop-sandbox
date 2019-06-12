// constants to use the database and its respective collection
const database = require('../database');

const mongoose = require('mongoose');
const teacherSchema = require('../moongose_schema').schemaTeacher;
const Teacher = mongoose.model('Teacher', teacherSchema,'teacher');

// const collection = database.getCollection('teacher');


//--------------------GET ALL---------------------------------
exports.getAll = (query, projection) => {

    //search in the bd according to the parameters received in the variable query
    // and projects according to the variable projection
  return Teacher.find(query, projection);
};

//-------------------GET ID-----------------------------------
exports.getFiltered = (query, projection) => {

    //search in the bd according to the parameters received in the variable query
    // and projects according to the variable projection
  return Teacher.find(query, projection);
};

//--------------------POST---------------------------------------
exports.post = (teacher) => {

    //insert in the bd the data passed by parameter
    return Teacher.create(teacher);
};

//--------------------PUT----------------------------------------
exports.put = (query, set) => {

    // edits according to the parameters in the query variable
    return Teacher.findOneAndUpdate(query, {$set: set}, {new:true});
};

//-------------------DELETE--------------------------------------
exports.delete = (query, set) => {

    //change the status according to what was passed in the query variable
  return Teacher.findOneAndUpdate(query, {$set: set},{new:true});
};

//--------------------COUNT TEACHER-------------------------------
exports.getTeacher = (id) => {

    /*find the teachers according to the ids passed by parameters*/
  return Teacher.find({'id':id, 'status':1});
};