const express = require('express');
const router = express.Router();

const teachers = require('../controller/teacher');

console.log(teachers);

router.get('/',teachers.getAll);

router.get('/:id',teachers.getOne);

router.post('/',teachers.post);

router.put('/:id',teachers.put);

router.delete('/:id',teachers.delete);


module.exports = router;
