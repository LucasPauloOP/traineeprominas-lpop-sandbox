const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const mdbURL='mongodb+srv://lucaspauloop:Lucio3237*@cluster0-5y6gh.mongodb.net/test?retryWrites=true';
var id;
var db;
var studentCollection;

mongoClient.connect(mdbURL, { native_parser: true }, (err, database) => {

    if (err) {
        console.error('Ocorreu um erro ao conectar ao mongoDB', err);
        // send.status(500);
    }
    else {
        //console.log('Course CONECTOU!');

        db = database.db("trainee-prominas");
        studentCollection = db.collection('student');

        studentCollection.countDocuments().then((count) => {
            id = count;
        });
    }
});


//----------getalll----------------------
exports.getall=(status,project)=>{
    return studentCollection.find(status,project).toArray();
};

//-----------getone---------------------
exports.getone=(where,project)=>{
    return studentCollection.find(where, project).toArray();
};
/*
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
*/