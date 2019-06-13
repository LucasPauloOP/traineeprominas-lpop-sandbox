//constant to use mongoclient
const mongoClient = require('mongodb').MongoClient;

//constant to connect to bd through url
const mdbURL = 'mongodb+srv://lucaspauloop:Lucio3237*@cluster0-5y6gh.mongodb.net/trainee-prominas?retryWrites=true&w=majority';

//global variable to replace conection.db
var db;

const mongoose = require('mongoose');


//function to connect to bd
mongoose.connect(mdbURL, {useNewUrlParser: true});

module.exports =function(){

    mongoose.connect(mdbURL, { useNewUrlParser: true });

    mongoose.connection.on('connected', function(){
        mongoose.set('useFindAndModify', false);
        console.log("Mongoose default connection is open to ", mdbURL);
    });

    mongoose.connection.on('error', function(err){
        console.log("Mongoose default connection has occured "+err+" error");
    });

    mongoose.connection.on('disconnected', function(){
        console.log("Mongoose default connection is disconnected");
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            //   console.log(termination("Mongoose default connection is disconnected due to application termination"));
            console.log('batata');
            process.exit(0)
        });
    });
};


// //exports the database
// exports.getCollection = function(name) {
//   return (db.collection(name));
// };



