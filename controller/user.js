var express = require('express');
var router = express.Router();

exports.getAll = (req,res) => {
    const projection = { _id: 0, id: 1, name: 1, lastName: 1, profile: 1 };
userCollection.find({ status: 1 }, { projection })
    .toArray((err, users) => {
        if (err) {
            console.error("Erro ao conectar a collection 'user'", err);
            res.status(500).send("Erro ao conectar a collection 'user'");
        } else {
            res.send(users);
        }
    });
};

/*exports.getOne=(res,req)=>{
    let id = parseInt(req.params.id);

    const projection = { _id: 0, id: 1, name: 1, lastName: 1, profile: 1 };

    userCollection.findOne({ id: id, status: 1 }, { projection }, (err, user) => {

        if (err) {
            console.error("Erro ao conectar a collection 'user'", err);
            res.status(500).send("Erro ao conectar a collection 'user'");
        } else {

            if (user)
                res.send(user);
            else
                res.status(404).send("Usuário não Encontrado.");
        }
    });
};

exports.post=(res,req)=>{

    // validation
    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('lastName') || !req.body.hasOwnProperty('profile'))
        return res.status(401).send('Os campos name, lastName e profile são obrigatórios.');

    // if valid creates the user object
    let user = {
        name: req.body.name,
        lastName: req.body.lastName,
        profile: req.body.profile,
        status: 1
    };

    (async () => {

        // sets user's unique id
        user.id = await _getNextIdValue();

        // persists the new user on database
        userCollection.insertOne(user, (err, result) => {

            if (err) {
                console.error("Erro ao Criar Um Novo Usuário", err);
                res.status(500).send("Erro ao Criar Um Novo Usuário");
            } else {
                res.status(201).send("Usuário Cadastrado com Sucesso.");
            }
        });

    })();
};

exports.put=(res,req)=>{

    // validation
    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('lastName') || !req.body.hasOwnProperty('profile'))
        return res.status(401).send('Os campos name, lastName e profile são obrigatórios.');

    // if valid creates the user object
    let user = {
        name: req.body.name,
        lastName: req.body.lastName,
        profile: req.body.profile,
    };

    // collects the user's id
    let id = parseInt(req.params.id);

    // updates the user if it exists and it is active
    userCollection.findOneAndUpdate({ id: id, status: 1 }, { $set: { ...user } }, (err, result) => {

        if (err) {
            console.error("Erro ao conectar a collection 'user'", err);
            res.status(500).send("Erro ao conectar a collection 'user'");
        } else {

            if (result.value) {
                console.log(`INF: Usuário Atualizado`);
                res.status(200).send(`Usuário Atualizado`);
            } else {
                console.log('Usuário não Encontrado.');
                res.status(404).send('Usuário não Encontrado.');
            }
        }

    });

};

exports.delete=(req,res)=>{
    let id = parseInt(req.params.id);

    // Don't actually remove just change user status
    userCollection.findOneAndUpdate({ id: id, status: 1 }, { $set: { status: 0 } }, (err, result) => {

        if (err) {
            console.error("Erro ao remover o usuário", err);
            res.status(500).send("Erro ao remover o usuário");
        } else {

            if (result.value) {
                console.log(`INF: Usuário Removido`);
                res.status(200).send(`Usuário Removido`);
            } else {
                console.log('Nenhum Usuário Removido');
                res.status(204).send('Nenhum Usuário Removido');
            }
        }

    });

};*/
