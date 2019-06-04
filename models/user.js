const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const mdbURL='mongodb+srv://lucaspauloop:Lucio3237*@cluster0-5y6gh.mongodb.net/test?retryWrites=true';
let id;
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

         userCollection.countDocuments().then((count) => {
           id = count;
         console.log(count);
        });
    }
});

//---------------id----------------------
exports.id=()=>{
    return userCollection.count().then((count) => {
        id = count;
        console.log(count);
    });
};

//----------getalll----------------------
exports.getall=(status,project)=>{
    console.log('------>model',status);
    //console.log(userCollection.count())
    return userCollection.find(status,project).toArray();

};

//-----------getone---------------------
exports.getone=(where,project)=>{
  return userCollection.find(where, project).toArray();
};

//------------post----------------------
exports.post=(newUser)=>{
    newUser.id=++id;
    console.log('------>',newUser);
    return userCollection.insertOne(newUser);
};
