const express = require('express');
const router = express.Router();

const teacherController = require('../controller/teacher');

router.get('/JSON/teacher', teacherController.getAllTeachers);
router.post('/teacher', teacherController.postTeacher);

router.get('/JSON/teacher/:id', teacherController.getFilteredTeacher);
router.put('/teacher/:id', teacherController.putTeacher);
router.delete('/teacher/:id', teacherController.deleteTeacher);

module.exports = router;