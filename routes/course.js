const express = require('express');
const router = express.Router();

const courseController = require('../controller/course');

router.get('/JSON/course', courseController.getAllCourses);
router.post('/course', courseController.postCourse);

router.get('/JSON/course/:id', courseController.getFilteredCourse);
router.put('/course/:id', courseController.putCourse);
router.delete('/course/:id', courseController.deleteCourse);

module.exports = router;