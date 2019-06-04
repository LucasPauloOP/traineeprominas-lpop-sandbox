const express = require('express');
const router = express.Router();

const teachers = require('../controller/teacher');

console.log(teachers);

router.get('/',teachers.getAll);

router.get('/:id',teachers.getOne);
/*
router.post('/',tachers.post);

router.put('/:id',tachers.put);

router.delete('/:id',teachers.delete);
*/

module.exports = router;
