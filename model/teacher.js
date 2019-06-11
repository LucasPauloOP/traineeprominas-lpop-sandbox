// constants to use the database and its respective collection
const database = require('../database');
const collection = database.getCollection('teacher');

//--------------------GET ALL---------------------------------
exports.getAll = (query, projection) => {

    //search in the bd according to the parameters received in the variable query
    // and projects according to the variable projection
  return collection.find(query, projection).toArray();
};

//-------------------GET ID-----------------------------------
exports.getFiltered = (query, projection) => {

    //search in the bd according to the parameters received in the variable query
    // and projects according to the variable projection
  return collection.find(query, projection).toArray();
};

//--------------------POST---------------------------------------
exports.post = (teacher) => {

    //insert in the bd the data passed by parameter
    return collection.insertOne(teacher);
};

//--------------------PUT----------------------------------------
exports.put = (query, set) => {

    // edits according to the parameters in the query variable
    return collection.findOneAndUpdate(query, {$set: set}, {returnOriginal:false});
};

//-------------------DELETE--------------------------------------
exports.delete = (query, set) => {

    //change the status according to what was passed in the query variable
  return collection.findOneAndUpdate(query, {$set: set});
};

//--------------------COUNT TEACHER-------------------------------
exports.getTeacher = (id) => {

    /*find the teachers according to the ids passed by parameters*/
  return collection.find({'id':id, 'status':1}).toArray();
};