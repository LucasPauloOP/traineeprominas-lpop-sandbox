const express = require('express');
const router = express.Router();

const courses = require('../controller/courses');

//console.log(courses);

router.get('/',courses.getAll);
/*
router.get('/:id',courses.getOne);

router.post('/',courses.post);

router.put('/:id',courses.put);

router.delete('/:id',courses.delete);
 */


module.exports = router;
