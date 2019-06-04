const express = require('express');
const router = express.Router();

const users = require('../controller/user');

router.get('/',users.getAll);

router.get('/:id',users.getOne);


/*router.post(users.post);

router.put(users.put);*/
module.exports = router;
