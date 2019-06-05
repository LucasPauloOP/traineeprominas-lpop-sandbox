const express = require('express');
const router = express.Router();

const students = require('../controller/student');

//console.log(courses);

router.get('/',students.getAll);

router.get('/:id',students.getOne);

router.post('/',students.post);
/*
router.put('/:id',students.put);
*/
router.delete('/:id',students.delete);



module.exports = router;
