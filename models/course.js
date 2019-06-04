let courses = [
  { 
    "id": 1,
    "name": "Sistemas de Informação",
    "period": "Matutino",
    "city": "Ipatinga",
    "teachers": [
      { "id": 1, "name": "Teacher", "lastName": "01", "phd": false }
    ]
  },
  { 
    "id": 2,
    "name": "Ciências da Computação",
    "period": "Vespertino",
    "city": "Coronel Fabriciano",
    "teachers": [
      { "id": 2, "name": "Teacher", "lastName": "02", "phd": true }
    ]
  },
  { 
    "id": 3,
    "name": "Engenharia da Computação",
    "period": "Noturno",
    "city": "Timotéo",
    "teachers": [
      { "id": 3, "name": "Teacher", "lastName": "03", "phd": true }
    ]
  }
];

var idCounter = courses.length;

const getAll = function(callback) {
  callback(courses);
}

const _getNextId = function() {
  return ++idCounter;
}

const add = function(course, callback) {
  course.id = _getNextId();

  courses.push(course);

  callback();
}

const deleteAll = function(callback) {
  courses = [];

  callback();
}

const deleteById = function(id, callback) {
  var course = courses.find(c => c.id === id);
  var index = courses.indexOf(course);

  if (index >= 0) {
    courses.splice(index, 1);
    callback(null, null);
  } else {
    callback({ message: 'Course not Found' }, null);
  }

}

const findById = function(id, callback) {
  var course = courses.find(c => c.id === id);

  callback(course);
}

const findByIdSync = function(id) {
  var course = courses.find(c => c.id === id);

  return course;
}

const updateById = function(id, course, callback) {
  var course = courses.find(c => c.id === id);
  var index = courses.indexOf(course);

  if (index >= 0) {
    courses[index] = course;
    callback(null, null);
  } else {
    callback({ message: 'Course not Found' }, null);
  }

}

module.exports = { getAll, add, deleteAll, deleteById, findById, findByIdSync, updateById };