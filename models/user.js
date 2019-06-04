const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const mdbURL="mongodb+srv://LucasPauloOP:Lucio3237*@cluster0-ofedr.mongodb.net/test?retryWrites=true";

let db;
let userCollection;
let counterCollection;

mongoClient.connect(mdbURL, { native_parser: true }, (err, database) => {

    if (err) {
        console.error('Ocorreu um erro ao conectar ao mongoDB', err);
        // send.status(500);
    }
    else {
        console.log('User CONECTOU!');

        db = database.db("trainee-prominas");
        userCollection = db.collection('user');
        counterCollection = db.collection('counter');
    }
});

//---------------id----------------------


//----------getalll----------------------
exports.getall=(status,project)=>{
    return userCollection.find({status,project}).toArray();

};

//-----------getone---------------------
exports.getOne=(status,project,id)=>{
  return userCollection.find({status,project,id}).toArray();
};

