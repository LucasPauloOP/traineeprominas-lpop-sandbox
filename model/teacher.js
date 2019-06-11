// constants to use the database and its respective collection
const database = require('../database');
const collection = database.getCollection('teacher');

//--------------------GET ALL---------------------------------
exports.getAll = (query, projection) => {
  return collection.find(query, projection).toArray();
};

exports.getFiltered = (query, projection) => {
  return collection.find(query, projection).toArray();
};

exports.post = (teacher) => {
    return collection.insertOne(teacher);
};

exports.put = (query, set) => {
    return collection.findOneAndUpdate(query, {$set: set}, {returnOriginal:false});
};

exports.delete = (query, set) => {
  return collection.findOneAndUpdate(query, {$set: set});
};

exports.getTeacher = (id) => {
  return collection.find({'id':id, 'status':1}).toArray();
};