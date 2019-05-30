const express = require('express');
const baseAPI = "/api/v1/router";
const app = express.Router();
//const arqteacher=require('./teacher');


const mongoClient = require('mongodb').MongoClient;

const mdbURL='mongodb+srv://lucaspauloop:Lucio3237*@cluster0-5y6gh.mongodb.net/test?retryWrites=true';

var db;//variavel global (pode ser vista nas rotas
var collection;



/*await*/ mongoClient.connect(mdbURL,{native_parser:true},(err,database) =>{
    if(err){
        console.error("Ocorreu um erro ao conectar ao mongoDB", err);
        res.status(500);//internal server error
    }
    else {

        db =  database.db('trainee-prominas');
        collection = db.collection('course');

    }
});
/*if(await mongodb.MongoClient.connect(mdbURL)){
    let thing = await collection.findone({"id":id});
    await  mongodb.MongoClient.connect(mdbURL).close();
    return
}*/


/*db.course.aggregate([
    {
        $lookup:
        {
            from:"teacher",
            localField:"teachers",
            foreignkey:"id",
            ass:"professor"
        }
}
]).map(function (cli) {
    return[cli.name,cli.lastname,cli.phd]
});*/


var idcourses = 1;

var course = []

async function aggregate (course,res) {
    for (let aux = 0; aux < course.teachers.length; aux++) {
        let teacher;
        teacher = await _getoneTeacher(course.teachers[aux]);

        course.teachers[aux] = teacher;

    }

    console.log("qq",course);
    collection.insertOne(course, (err, result) => {
        if (err) {
            console.error("Erro ao criar um novo curso", err);
            res.status(500).send("Erro ao criar um novo curso");

        } else {
            res.status(201).send("Curso deletado com sucesso");
        }
    });
}

const _getoneTeacher = function (id) {
    return new Promise((resolve, reject) => {
        db.collection('teacher').findOne({"id": parseInt(id)}, (err, teacher) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(teacher);
            }
        });

    });
};

async function put_aggregate (id,course,res) {
    console.log("qq",course);

    for (let aux = 0; aux < course.teachers.length; aux++) {
        let teacher;
        teacher = await _getoneTeacher(course.teachers[aux]);

        course.teachers[aux] = teacher;

    }



    collection.updateOne({'id':id},{$set:course},(err,result) => {
       if(err){
           console.error("Erro ao conectar a collection course");
           res.status(500).send("Erro ao conectar a collection course");
       } else{
           res.send("Curso atualizado com sucesso.");
       }
    })
}


//async function ()*/






app.get('/',function (req,res) {
    collection.find({}).toArray((err,courses) =>{
        if(err){
            console.error("Ocorreu um erro ao conectar a collection teacher");
            res.status(500);
        }
        else{
            res.send(courses);
        }
    });
});

app.post('/', function(req, res) {
    var courses = req.body;

    courses.id =idcourses++;

    aggregate(courses,res);


});


app.get('/:id',function(req,res){
    var id = parseInt(req.params.id);

    collection.find({"id":id}).toArray((err,coursers)=>{
        if(err){
            console.error("Ocorreu um erro ao conectar a collection Curso");
            res.status(500);
        }
        else{
            if(coursers === []){
                res.status(404);
                res.send("Curso não encontrado.");
            }
            else{
                res.send(coursers);
            }

        }
    });
});

app.delete('/:id',function(req,res){
    var id = parseInt(req.params.id);

    collection.remove({"id": id}, true, function (err, info) {
        if (err) {
            console.error("Ocorreu um erro ao deletar os documentos da coleção.");
            res.status(500);
        } else {
            var numRemoved = info.result.n;
            if (numRemoved > 0) {
                console.log("INF: Todos os documentos (" + numRemoved + ") foram removidos");
                res.send("Curso foi removido.");
                res.status(204);//No content

            }
            else {
                console.log("Nenhum documento foi removido");
                res.status(404);
                res.send("Nenhum curso foi removido.");
            }

        }

    });
});

app.delete('/',function(req,res){
    collection.remove({},false,function(err, info) {
        if (err) {
            console.error("Ocorreu um erro ao deletar os documentos da coleção.");
            res.status(500);
        } else {
            var numRemoved = info.result.n;
            if (numRemoved > 0) {
                console.log("INF: Todos os documentos (" + numRemoved + ") foram removidos");
                res.status(204);//No content
                res.send("Todos os professores foram removidos.");
            } else {
                console.log("Nenhum documento foi removido");
                res.status(404);
                res.send("Nenhum professor foi removido.");
            }

        }

    });
});

app.put('/:id', function(req,res){
    var id = parseInt(req.params.id);
    var bodycourse  = req.body;

    put_aggregate(id,bodycourse,res);


});



module.exports = {app};