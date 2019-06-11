// constants to use the database and its respective collection
const database = require('../database');
const collection = database.getCollection('student');

var id;

(async () => {
  id = await collection.countDocuments({});
})();

exports.getAll = (query, projection) => {
    return collection.find(query, projection).toArray();
};

exports.getFiltered = (query, projection) => {
    return collection.find(query, projection).toArray();
};

exports.post = (student) => {
    return collection.insertOne(student);
};

exports.put = (query, set) => {
    return collection.findOneAndUpdate(query, {$set:set},{returnOriginal:false});
};

exports.delete = (query, set) => {
  return collection.findOneAndUpdate(query, set);
};

exports.updateCourse = (id, set) => {
  return collection.findOneAndUpdate({'course.id':id, 'status':1}, {$set: {"course.$": set}});
};

exports.deleteCourse = (id, set) => {
  return collection.findOneAndUpdate({'course.id':id, 'status':1}, {$set: {status:0}});
};

exports.updateTeacher = (course) => {
  return collection.findOneAndUpdate({'status':1, 'course.id':course.id}, {$set: {'course.$':course}});
};