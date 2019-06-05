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
    //console.log('------>',newTeacher);
    return courseCollection.insertOne(newCourse);
};
/*
//-------------put----------------------
exports.put=(newTeacher,where)=>{
    // console.log('--------->',newTeacher);
    return teacherCollection.findOneAndUpdate(where,{$set:{...newTeacher}});
};

//---------------delete-------------------
exports.delete=(where)=>{
    return teacherCollection.findOneAndUpdate(where,{ $set: { 'status': 0 } });
};*/