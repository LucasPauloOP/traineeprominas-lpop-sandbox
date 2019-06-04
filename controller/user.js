var express = require('express');
var router = express.Router();

modelUser = require('../models/user');


//-----------get all-----------------------------------
exports.getAll = (req,res) => {
    let status={status:1};

    let project = { projection:{ _id: 0, status: 0 } };

    modelUser.getall(status, project)
        .then(users => {
            console.log('----->controlller',users);
            res.status(201).send(users);
        }).catch(err=>{
            console.error("Erro ao conectar a collection 'user'", err);
            res.status(500).send("Erro ao conectar a collection 'user'");
        });
};

//-----------get one-------------------------------
exports.getOne = (req,res)=>{
    let id = parseInt(req.params.id);
    let where = {status:1,'id':id};

    let project = { projection: {  _id: 0, status: 0 } };

    modelUser.getone(where,project)
        .then(users => {
            res.status(201).send(users);
        }).catch(err => {
            console.error("Erro ao conectar a collection 'user'", err);
            res.status(500).send("Erro ao conectar a collection 'user'");
        });
};

//---------------post------------------------------
exports.post=function(req,res){

    let status = {status:1};

        var newUser = {
            name: req.body.name,
            lastName: req.body.lastName,
            profile: req.body.profile,
            status : 1
        };
        if(!newUser.name || !newUser.lastName || !newUser['profile'] )
        {
            res.status(401).send("Campos obrigatorios não prenchidos.");
        }
        else {
            if(newUser.name && newUser.lastName && newUser['profile'])
            {
                modelUser.post(newUser).then(user=>{
                    res.status(200).send('Usuário cadastrado com sucesso.');

                }).catch(err=>{
                    console.error('Erro ao conectar a collection user',err);
                    res.status(500).send("Erro ao conectar a collection 'user'");
            });

            }
        }

    };

//---------------------put--------------------------------
exports.put=function (req,res) {
    let id = parseInt(req.params.id);

    let where = {status:1,'id':id};

    let project = { projection: {_id: 0, status: 0 } };

    var newUser = {
        name: req.body.name,
        lastName: req.body.lastName,
        profile: req.body.profile,
    };

    if(newUser.name && newUser.lastName && newUser['profile'])
    {
        modelUser.post(newUser,where,project).then(user=>{
            res.status(201).send('Usuário atualizado com sucesso.');
        }).catch(err=>{
            console.error('Erro ao conectar a collection user',err);
            res.status(500).send("Erro ao conectar a collection 'user'");
        });
    }

    else{
        res.status(401).send("Campos obrigatorios não prenchidos.");
    }

};


//----------------------delete----------------------------------
exports.delete=function(req,res,err){
    let id = parseInt(req.params.id);

    let where = {status:1,'id':id};
    modelUser.delete(where).then(result=>{
            if (result)
            {
                console.log(`INF: Usuário Removido`);
                res.status(200).send(`Usuário Removido`);
            }
            else
                {
                console.log('Nenhum Usuário Removido');
                res.status(204).send('Nenhum Usuário Removido');
            }
    }).catch(err=>{
            console.error("Erro ao remover o usuário", err);
            res.status(500).send("Erro ao remover o usuário");

    });
};




