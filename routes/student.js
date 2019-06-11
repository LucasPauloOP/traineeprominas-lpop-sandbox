const express = require('express');
const router = express.Router();

const studentController = require('../controller/student');

router.get('/JSON/student', studentController.getAllStudents);
router.post('/student', studentController.postStudent);

router.get('/JSON/student/:id', studentController.getFilteredStudent);
router.put('/student/:id', studentController.putStudent);
router.delete('/student/:id', studentController.deleteStudent);

module.exports = router;