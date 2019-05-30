const express = require('express');
const baseAPI = "/api/v1/router";
const app = express.Router();
const arqteacher=require('./teacher');


const mongoClient = require('mongodb').MongoClient;

const mdbURL='mongodb+srv://lucaspauloop:Lucio3237*@cluster0-5y6gh.mongodb.net/test?retryWrites=true';

var db;//variavel global (pode ser vista nas rotas
var collection;



mongoClient.connect(mdbURL,{native_parser:true},(err,database) =>{
    if(err){
        console.error("Ocorreu um erro ao conectar ao mongoDB", err);
        res.status(500);//internal server error
    }
    else {

        db = database.db('trainee-prominas');
        collection = db.collection('course');
    }
});


/*

juntar.course.aggregate([
    {
        $lookup:
        {
            from:"teacher",
            localField:"teachers",
            foreignkey:"id",
            ass:"professor"
        }
}
])*/


var idcourses = 1;

var course = []

/*(async function join (){
    for(let aux=0;aux<course.teacher.length;aux++)
    {
        let teachers = await _getoneTeacher(course.teacher[aux]);
        course.teacher[aux] = teacher;
    }

    collection(insertone(course),(err,result)=>{
        if(err){
            console.error("Erro ao criar um novo curso",err);
            res.status(500).send("Erro ao criar um novo curso");

        }
        else
        {
            res.status(201).send("Curso deletado com sucesso");
        }
    });
})();

const _getoneTeacher = function (id) {
    return new Promisse((resolve, reject) => {
        collection.findone({"id": id}, (err, teacher) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(teacher);
            }
        });

    });
};




//async function ()*/






app.get('/',function (req,res) {
    collection['find']({}).toArray((err,courses) =>{
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

    collection.insert(courses);

    res.send('Curso cadastrado com sucesso.');
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
    var courses = findid(id);

    for(var aux=0;aux<course.length;aux++)
    {
        if(course[aux].idcourse=== courses.idcourse)
        {

            course.splice(aux,1);
            res.send('Curso deletado com sucesso.');
        }
        else
        if(aux===course.length)
        {
            res.status(404).send('Curso não encontrado.');

        }

    }
});

app.delete('/',function(req,res){
    collection['remove']({},false,function(err, info) {
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
    var courses = findid(id);
    var bodycourse= req.body;

    if(courses)
    {
        courses.name = bodycourse.name||courses.name;
        courses.period = bodycourse.period||courses.period;
        courses.city = bodycourse.city||courses.city;
        courses.teachers= bodycourse.teachers||courses.teachers;
        if(bodycourse.teachers)
        {
            for(var aux=0;aux< courses.teachers.length;aux++)
            {
                courses.teachers[aux] = arqteacher.findteacher(bodycourse.teachers[aux])
            }
        }

        res.send('Curso atualizado');
    }
    else
    {
        res.send('Curso não encontrado');
    }
});

function findcourse(id){
    return course.find((l)=>{return l.id === id});
}

module.exports = {app,findcourse};