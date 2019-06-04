const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const mdbURL='mongodb+srv://lucaspauloop:Lucio3237*@cluster0-5y6gh.mongodb.net/test?retryWrites=true';
var id;
let db;
let teacherCollection;

mongoClient.connect(mdbURL, { native_parser: true }, (err, database) => {

    if (err) {
        console.error('Ocorreu um erro ao conectar ao mongoDB', err);
        // send.status(500);
    }
    else {
        console.log('User CONECTOU!');

        db = database.db("trainee-prominas");
        teacherCollection = db.collection('teacher');

        teacherCollection.countDocuments().then((count) => {
            id = count;
            console.log(count);
        });
    }
});


//----------getalll----------------------
exports.getall=(status,project)=>{
    console.log('------>model',status);
    //console.log(userCollection.count())
    return teacherCollection.find(status,project).toArray();

};

//-----------getone---------------------
exports.getone=(where,project)=>{
    return teacherCollection.find(where, project).toArray();
};

//------------post----------------------
exports.post=(newTeacher)=>{
    newTeacher.id=++id;
    console.log('------>',newTeacher);
    return teacherCollection.insertOne(newTeacher);
};
/*
//-------------put----------------------
exports.put=(newUser,where,project)=>{
    console.log('--------->',newUser);
    return userCollection.findOneAndUpdate(where,{$set:{...newUser}});
};

//---------------delete-------------------
exports.delete=(where)=>{
    return userCollection.findOneAndUpdate(where,{ $set: { status: 0 } });
};*/