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

//---------count students and return your size--------------
exports.countStudents =async function(where){

return studentCollection.countDocuments(where);

};

//----------update all students if change course------------
exports.updateStudent= function(where,newCourse){
    // console.log('------>',where);
    return studentCollection.findOneAndUpdate(where,{$set:newCourse});
};

//-----------update all student if change teacher-----------
exports.replace=function(where,newTeacher){
    //console.log('where_student_model->',where);
    //console.log('newTeacher->',newTeacher);
    return studentCollection.updateMany(where,{$set:newTeacher});
};
//----------getalll----------------------
exports.getall=(status,project)=>{
    return studentCollection.find(status,project).toArray();
};

//-----------getone---------------------
exports.getone=(where,project)=>{
    return studentCollection.find(where, project).toArray();
};

//------------post----------------------
exports.post=(newStudent)=>{
    newStudent.id=  ++id;

    return studentCollection.insertOne(newStudent);
};

//-------------put----------------------
exports.put=(newStudent,where)=>{

    // console.log('------>',newStudent);

    return studentCollection.findOneAndUpdate(where,{$set:{...newStudent}});
};

//---------------delete-------------------
exports.delete=(where)=>{
    return studentCollection.findOneAndUpdate(where,{ $set: { 'status': 0 } });
};

//--------------RemoveInactiveteachers------------
exports.removeTeachers=function(where,reference){
    return studentCollection.updateMany(where, { $pull: reference });
};
