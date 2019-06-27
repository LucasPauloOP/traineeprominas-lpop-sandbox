
const express = require('express');
const router = express.Router();

const userController = require('../controller/user');

// function verifyJWT(req, res, next){
//     var token = req.headers['x-access-token'];
//     console.log(">>>>>>>>",req.headers)
//     if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
//     jwt.verify(token, process.env.SECRET, function(err, decoded) {
//       if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
//       // se tudo estiver ok, salva no request para uso posterior
//       req.userId = decoded.id;
//       next();
//     });
//   }
console.log("conectou");
router.get('/JSON/user',userController.getAllUsers);
router.post('/user', userController.postUser);

router.get('/JSON/user/:id',userController.getFilteredUser);
router.put('/user/:id',userController.putUser);
router.delete('/user/:id',userController.deleteUser);

module.exports = router;