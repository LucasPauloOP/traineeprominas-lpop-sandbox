let teachers = [
  { "id": 1, "name": "Teacher", "lastName": "01", "phd": false },
  { "id": 2, "name": "Teacher", "lastName": "02", "phd": true },
  { "id": 3, "name": "Teacher", "lastName": "03", "phd": true }
];

var idCounter = teachers.length;

const getAll = function(callback) {
  callback(teachers);
}

const _getNextId = function() {
  return ++idCounter;
}

const add = function(teacher, callback) {
  teacher.id = _getNextId();

  teachers.push(teacher);

  callback();
}

const deleteAll = function(callback) {
  teachers = [];

  callback();
}

const deleteById = function(id, callback) {
  var teacher = teachers.find(t => t.id === id);
  var index = teachers.indexOf(teacher);

  if (index >= 0) {
    teachers.splice(index, 1);
    callback(null, null);
  } else {
    callback({ message: 'Teacher not Found' }, null);
  }

}

const findById = function(id, callback) {
  var teacher = teachers.find(t => t.id === id);

  callback(teacher);
}

const findByIdSync = function(id) {
  var teacher = teachers.find(t => t.id === id);

  return teacher;
}

const updateById = function(id, teacher, callback) {
  var teacher = teachers.find(t => t.id === id);
  var index = teachers.indexOf(teacher);

  if (index >= 0) {
    teachers[index] = teacher;
    callback(null, null);
  } else {
    callback({ message: 'Teacher not Found' }, null);
  }

}

module.exports = { getAll, add, deleteAll, deleteById, findById, findByIdSync, updateById };
