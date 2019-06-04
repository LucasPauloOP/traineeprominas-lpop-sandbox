const express = require('express');
const router = express.Router();

const users =('./controler/user.js');

router.get(users.getAll);

router.getOne(users.getOne);

router.post(users.post);

router.put(users.put);
