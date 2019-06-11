// constants to use the database and its respective collection
const database = require('../database');
const collection = database.getCollection('course');


// ------------------------GET ALL----------------------------------------------
exports.getAll = (query, projection) => {

  //search in the bd according to the parameters received in the variable query
  // and projects according to the variable projection
  return collection.find(query, projection).toArray();
};

//------------------------GET ID---------------------------------------------------
exports.getFiltered = (query, projection) => {

  //search in the bd according to the parameters received in the variable query
  // and projects according to the variable projection
  return collection.find(query, projection).toArray();
};

//------------------------POST----------------------------------------------------
exports.post = (course) => {

  //insert in the bd the data passed by parameter
    return collection.insertOne(course);
};

//---------------------------PUT------------------------------------------------------
exports.put = (query, set) => {

  // edits according to the parameters in the query variable
    return collection.findOneAndUpdate(query, {$set: set}, {returnOriginal:false} );
};

//------------------------------DELETE------------------------------------------------
exports.delete = (query, set) => {

  //change the status according to what was passed in the query variable
  return collection.findOneAndUpdate(query, {$set: set});
};

//-----------------------------COUNT COURSE---------------------------------------------
exports.getCourse = (id) => {

  // find the courses according to the ids passed by parameters
  return collection.find({'id':id, 'status':1}).toArray();
};

//------------------------------PROPAGATION OF TEACHERS: UPDATE---------------------------------
exports.updateTeacher = (id, set) => {

  //updates on the courses the teachers who have been put
  return collection.updateMany({'teacher.id':id, 'status':1}, {$set: {'teacher.$':set}});
};

//-----------------------------PROPAGATION OF TEACHERS: DELETE-------------------------------------
exports.deleteTeacher = (id) => {

  //deletes teachers in progress if they are deleted
  return collection.findOneAndUpdate({'status':1, 'teacher.id':id}, {$pull: {"teacher": {'id': id}}});
};

//-----------------------------PROPAGATION FOR COURSE: FIND--------------------------------------------
exports.getCoursebyTeacher = () => {

  //// find the courses according to the ids passed by parameters
  return collection.find({"status":1}).toArray();
};