// //authentication
// require("dotenv-safe").load();
// var jwt = require('jsonwebtoken');
// const express = require('express');
// const router = express.Router();

// console.log("entrou");
// router.post('/login', (req, res, next) => {
//     console.log(">>>>>",req.body);
//     if(req.body.user == 'admin' && req.body.pwd == '123'){
        
//       //auth ok
//       const id = 1; //esse id viria do banco de dados
//       var token = jwt.sign({ id }, process.env.SECRET, {
//         expiresIn: 300 // expires in 5min
//       });
//       res.status(200).send({ auth: true, token: token });
//     }
    
//     res.status(500).send('Login inválido!');
//   })

// // router.get('/logout', function(req, res) {
// //   res.status(200).send({ auth: false, token: null });
// // });
 
//   module.exports = router;