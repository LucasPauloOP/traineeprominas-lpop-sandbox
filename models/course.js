const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const mdbURL='mongodb+srv://lucaspauloop:Lucio3237*@cluster0-5y6gh.mongodb.net/test?retryWrites=true';
var id;
let db;
let courseCollection;

mongoClient.connect(mdbURL, { native_parser: true }, (err, database) => {

    if (err) {
        console.error('Ocorreu um erro ao conectar ao mongoDB', err);
        // send.status(500);
    }
    else {
        //console.log('Course CONECTOU!');

        db = database.db("trainee-prominas");
        courseCollection = db.collection('course');

        courseCollection.countDocuments().then((count) => {
            id = count;
        });
    }
});


exports.findteacher=function(where){
  return courseCollection.find({where});
};

//----------update all courses if teacher change--------------
exports.updateMany=function(where,newCourse){
    //console.log('------->where: ',where);
    //console.log('------->newCourse:',newCourse);
    return  courseCollection.findOneAndUpdate(where,{$set:newCourse});
};

//----------update course---------------
exports.updateOne=  function (newCourse,where) {
    console.log('where------>',where);
    return courseCollection.updateMany(where, {$set:{...newCourse }},{returnOriginal:false});
    
};


//----------getalll----------------------
exports.getall=(status,project)=>{
    //console.log('------>model',status);
    //console.log(userCollection.count())
    return courseCollection.find(status,project).toArray();

};

//-----------getone---------------------
exports.getone=(where,project)=>{
    return courseCollection.find(where, project).toArray();
};

//------------post----------------------
exports.post=(newCourse)=>{
    newCourse.id=++id;

    return courseCollection.insertOne(newCourse);
};

//-------------put----------------------
exports.put=(newCourse,where)=>{

    return courseCollection.findOneAndUpdate(where,{$set:{...newCourse}});
};

//---------------delete-------------------
exports.delete=(where)=>{
    return courseCollection.findOneAndUpdate(where,{ $set: { 'status': 0 } });
};