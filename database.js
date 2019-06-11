//constant to use mongoclient
const mongoClient = require('mongodb').MongoClient;

//constant to connect to bd through url
const mdbURL = 'mongodb+srv://lucaspauloop:Lucio3237*@cluster0-5y6gh.mongodb.net/test?retryWrites=true&w=majority';


//global variable to replace conection.db
var db;

//function to connect to bd
exports.connect = function() {
  return new Promise((resolve, reject) => {
    mongoClient.connect(mdbURL, { useNewUrlParser: true })
      .then(connection => {
        console.log("Conectado ao MongoDB!");
        db = connection.db("trainee-prominas");
        resolve();
      })
      .catch(err => {
        console.error("Erro ao conectar ao MongoDB!", err);
        reject(err);
      });
  });
};

//exports the database
exports.getCollection = function(name) {
  return (db.collection(name));
};