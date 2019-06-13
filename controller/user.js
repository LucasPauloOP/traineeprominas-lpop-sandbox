//constant to use the user model
const userModel = require('../model/user');

//constant to use moongose
const mongoose = require('mongoose');

//constant to call the moongose ​​scheme
const userSchema = require('../moongose_schema').schemaUser;
const User = mongoose.model('User', userSchema,'user');

//define id of user
// const database = require('../database');
// const collection = database.getCollection('user');

var id;

//async function to count documents and send their size
var id;
User.countDocuments({}, (err, count) => {
    id = count;
});


//joi schema of validation
const Joi = require('joi');

//which will be used to validate the required fields
const joiSchemaUser = Joi.object().keys({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    profile:Joi.string().required()
});


//-----------------GET ALL---------------------------

exports.getAllUsers = (req, res) => {
    //  define query and projection for search
    let query = {status:1};
    let projection = {_id:0, id: 1, name: 1, lastName: 1, profile:1};

    // send to model
    //if the return is greater than 0 it shows on the screen
    // if it does not show an error message
    userModel.getAll(query, projection)
    .then(users => {
        if(users.length > 0){ 
            res.send(users);
        }else{
            res.status(204).send('Nenhum usuário cadastrado');
        }
    })
    .catch(err => {
        console.error("Erro ao conectar a collection user: ", err);
        res.status(500);
    });
};


//--------------------GET--ID----------------------------------------------------
exports.getFilteredUser = (req,res) => {
    //  define query and projection for search
    let query = {'id':parseInt(req.params.id), 'status':1};
    let projection = {_id:0, id: 1, name: 1, lastName: 1, profile:1};

    // send to model
    ////if the return is greater than 0 it shows on the screen
    // if it does not show an error message
    userModel.getFiltered(query, projection)
    .then(user => {
        if(user.length > 0){
            res.status(200).send(user);
        }else{
            res.status(204).send('O usuário não foi encontrado');
        }
    })
    .catch(err => {
        console.error("Erro ao conectar a collection user: ", err);
        res.status(500);
    });
};


//------------------------------POST-------------------------------
exports.postUser = (req, res) => {

    // check required attributes by joi schema
    //receives the data by the body and validates them,
    // abortEarly false avoids sending messages
    // if passed, the validations continue if you do not send an error message
    joiSchemaUser.validate(req.body,{abortEarly:false})
        .then(result=>{

            //variable that validates by mongoose the data of the body
            let users= new User({
                id:parseInt(++id),
                name:req.body.name,
                lastName:req.body.lastName,
                profile:req.body.profile,
                status:1
            });

            //validation if no error returns and proceeds with data
            // if error return sends error message
            users.validate(error => {
                if(!error){
                    //send for model
                    userModel.post(users).then(result => {
                        res.status(201).send('Usuário cadastrado com sucesso!');
                    }).catch(err => {
                        console.error("Erro ao conectar a collection user ->>>>>>>>>> ", err);
                        res.status(500);
                    });
                }else{
                    //decrements the id to prevent id
                    // from leaving the expected count
                    users.id=parseInt(--id);

                    //sends a custom error message accordingly if
                    // client try to register a profile other than admin or guess
                        if(user.profile != 'admin'||user.profile != "guess") {
                            res.status(401).send('Profile deve ser guess ou admin para cadastrar usuário.');
                        }
                }

            })

        }).catch(err=>{
            // console.log(err);
            res.status(401).send('Campos obrigatórios não preenchidos.');
    });


};


//--------------------PUT--------------------------------------------
exports.putUser = (req, res) => {

    //  define query and set for search and update
    let query = {'id': parseInt(req.params.id), 'status': 1};

    //check required attributes by joi schema
    // receives the data by the body and validates them,
    // abortEarly false avoids sending messages
    //if passed, the validations continue if you do not send an error message
    joiSchemaUser.validate(req.body,{abortEarly:false})
        .then(validatedjoiUser=>{
            let user=({
                id:parseInt(req.params.id),
                name:req.body.name,
                lastName:req.body.lastName,
                profile:req.body.profile,
                status:1

            });

             //variable that validates by mongoose the data of the body
            let validate = new User(user);

            //validation if no error returns and proceeds with data
            // if error return sends error message
            validate.validate(err=>{
                if(!err){
                    // send to model
                    userModel.put(query,user).then(result=>{
                        //console.log('>>>>>>',user);
                        if(result){
                            res.status(200).send('Usuário editado com sucesso!');
                        }
                        else{
                            res.status(401).send('Não é possível editar usuário');
                        }
                    }).catch(err=>{
                        console.error('Erro ao conectar a collection user',err);
                        res.status(500).send('Erro ao conectar a collection user');
                    })
                }
                else{

                    //sends a custom error message accordingly if
                    // client try to register a profile other than admin or guess
                        if(user.profile != 'admin'||user.profile != "guess"){
                            res.status(401).send('Profile deve ser guess ou admin para cadastrar usuário.');
                        }

                }
            });

    }).catch(err=>{
       // console.log(err);
        res.status(401).send('Campos obrigatórios não preenchidos.');
    });

};

//----------------------DELETE-------------------------------------------
exports.deleteUser = (req, res) => {
    //  define query and set for search and delete    
    let query = {'id': parseInt(req.params.id), 'status':1};

    // send to model
    userModel.delete(query)
    .then(result => {
        if(result){ // if user exists
            console.log('O usuário foi removido');
            res.status(200).send('O usuário foi removido com sucesso');
          }else{
            console.log('Nenhum usuário foi removido');
            res.status(204).send();
          }
    })
    .catch(err => {
        console.error("Erro ao conectar a collection user: ", err);
        res.status(500);
    });
};