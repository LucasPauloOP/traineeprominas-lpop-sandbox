let students = [
  { 
    "id": 1,
    "name": "Marcos",
    "lastName": "Paulo",
    "age": 20,
    "course": { 
      "id": 1,
      "name": "Sistemas de Informação",
      "period": "Matutino",
      "city": "Ipatinga",
      "teachers": [
        { "id": 1, "name": "Teacher", "lastName": "01", "phd": false }
      ]
    }
  },
  { 
    "id": 2,
    "name": "Pedro",
    "lastName": "Henrique",
    "age": 21,
    "course": { 
      "id": 1,
      "name": "Sistemas de Informação",
      "period": "Matutino",
      "city": "Ipatinga",
      "teachers": [
        { "id": 1, "name": "Teacher", "lastName": "01", "phd": false }
      ]
    }
  },
  { 
    "id": 3,
    "name": "Lucas",
    "lastName": "Rodrigues",
    "age": 22,
    "course": { 
      "id": 1,
      "name": "Sistemas de Informação",
      "period": "Matutino",
      "city": "Ipatinga",
      "teachers": [
        { "id": 1, "name": "Teacher", "lastName": "01", "phd": false }
      ]
    } 
  }
];

var idCounter = students.length;

const getAll = function(callback) {
  callback(students);
}

const _getNextId = function() {
  return ++idCounter;
}

const add = function(student, callback) {
  student.id = _getNextId();

  students.push(student);

  callback();
}

const deleteAll = function(callback) {
  students = [];

  callback();
}

const deleteById = function(id, callback) {
  var student = students.find(s => s.id === id);
  var index = students.indexOf(student);

  if (index >= 0) {
    students.splice(index, 1);
    callback(null, null);
  } else {
    callback({ message: 'Student not Found' }, null);
  }

}

const findById = function(id, callback) {
  var student = students.find(s => s.id === id);

  callback(student);
}

const updateById = function(id, student, callback) {
  var student = students.find(s => s.id === id);
  var index = students.indexOf(student);

  if (index >= 0) {
    students[index] = student;
    callback(null, null);
  } else {
    callback({ message: 'Student not Found' }, null);
  }

}

module.exports = { getAll, add, deleteAll, deleteById, findById, updateById };
