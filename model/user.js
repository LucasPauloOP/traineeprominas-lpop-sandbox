// constants to use the database and its respective collection
const database = require('../database');
// const collection = database.getCollection('user');
const mongoose = require('mongoose');
const userSchema = require('../moongose_schema').schemaUser;
const User = mongoose.model('User', userSchema,'user');

//--------------GET ALL------------------------------------
exports.getAll = (query, projection) => {
    //search in the bd according to the parameters received in the variable query
    // and projects according to the variable projection

    return User.find(query, projection);
};

//---------------GET FOR ID-------------------------------
exports.getFiltered = (query, projection) => {
    //search in the bd according to the parameters received in the variable query
    // and projects according to the variable projection
    return User.find(query, projection);
};

//-----------------POST---------------------------------
exports.post = (user) => {
    //insert in the bd the data passed by parameter
        return User.create(user);
};

//-----------------PUT------------------------------------
exports.put = (query, set) => {
    // edits according to the parameters in the query variable
        return User.findOneAndUpdate(query, {$set: set});
};

//------------------DELETE-------------------------------------
exports.delete = (query) => {

    //change the status according to what was passed in the query variable
    return User.findOneAndUpdate(query, {$set: {status:0}});
};