const mongoClient = require('mongodb').MongoClient;
const mdbURL = 'mongodb+srv://lucaspauloop:Lucio3237*@cluster0-5y6gh.mongodb.net/test?retryWrites=true&w=majority';

let db;

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

exports.getCollection = function(name) {
  return (db.collection(name));
};