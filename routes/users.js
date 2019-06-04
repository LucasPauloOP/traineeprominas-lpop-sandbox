const express = require('express');
const router = express.Router();

const users = require('../controller/user');

console.log(users);

router.get('/',users.getAll);

router.get('/:id',users.getOne);

router.post('/',users.post);

router.put('/:id',users.put);

router.delete('/:id',users.delete);
module.exports = router;
