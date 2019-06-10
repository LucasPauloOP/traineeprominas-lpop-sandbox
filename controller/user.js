const userModel = require('../model/user');
//const moongoseSchema=require('../moongose_schema');
const mongoose = require('mongoose');
const userSchema = require('../moongose_schema').schemaUser;
const User = mongoose.model('User', userSchema);

//define id of user
const database = require('../database');
const collection = database.getCollection('user');

var id;

(async () => {
    id = await collection.countDocuments({});
})();

//joi schema of validation
const Joi = require('joi');

const joiSchemaUser = Joi.object().keys({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    profile:Joi.string().required()
});
//---------------------------------------------------

//-----------------GET--ID---------------------------
exports.getAllUsers = (req, res) => {
    //  define query and projection for search
    let query = {status:1};
    let projection = {projection: {_id:0, id: 1, name: 1, lastName: 1, profile:1}};

    // send to model
    userModel.getAll(query, projection)
    .then(users => {
        if(users.length > 0){ 
            res.status(200).send(users);
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
    let projection = {projection: {_id:0, id: 1, name: 1, lastName: 1, profile:1}};

    // send to model
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
    // check required attributes
    joiSchemaUser.validate(req.body,{abortEarly:false})
        .then(result=>{
            let users= new User({
                id:parseInt(++id),
                name:req.body.name,
                lastName:req.body.lastName,
                profile:req.body.profile,
                status:1
            });
            users.validate(error => {
                if(!error){
                    userModel.post(users).then(result => {
                        res.status(201).send('Usuário cadastrado com sucesso!');
                    }).catch(err => {
                        console.error("Erro ao conectar a collection user ->>>>>>>>>> ", err);
                        res.status(500);
                    });
                }else{
                    users.id=parseInt(--id);
                    res.status(401).send('Não foi possível cadastrar o usuário');

                }

            })

        }).catch(err=>{
            // console.log(err);
            res.status(401).send('Campos obrigatórios não preenchidos.');
    });


};


//--------------------PUT--------------------------------------------
exports.putUser = (req, res) => {
    // check required attributes
    let query = {'id': parseInt(req.params.id), 'status': 1};

    joiSchemaUser.validate(req.body,{abortEarly:false})
        .then(validatedjoiUser=>{
            let user=({
                id:parseInt(req.params.id),
                name:req.body.name,
                lastName:req.body.lastName,
                profile:req.body.profile,
                status:1

            });

            let validate = new User(user);

            validate.validate(err=>{
                if(!err){
                    userModel.put(query,user).then(result=>{
                        //console.log('>>>>>>',user);
                        if(result.value){
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
                    res.status(401).send('Não é possível editar usuário');
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
        if(result.value){ // if user exists
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