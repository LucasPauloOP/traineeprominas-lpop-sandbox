const express = require('express');
const baseAPI = "/api/v1/router";
const app = express.Router();
//const arqteacher=require('./teacher');


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

        db =  database.db('trainee-prominas');
        collection = db.collection('course');

    }
});

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
    console.log('body',course);
    for (let aux = 0; aux < course.teachers.length; aux++) {
        var teacher;
        teacher = await _getoneTeacher(course.teachers[aux]);
            course.teacher.push(teacher);
    }
    console.log("qq",course);
    collection.insertOne(course, (err) => {
        if (err) {
            console.error("Erro ao criar um novo curso", err);
            console.log("err",err);
            res.status(500).send("Erro ao criar um novo curso");

        } else {
            if(course.teachers.length   > course.teacher){
                res.status(201).send("Curso cadastrado com sucesso. Porém ainda não há professor nele.");
            }
            else{
                res.status(201).send("Curso cadastrado com sucesso.");
            }
        }
    });
}

const _getoneTeacher = function (id) {
    return new Promise((resolve, reject) => {
        db.collection('teacher').findOne({'id': parseInt(id),'status':1}, (err, teacher) => {
            if (err) {
                console.error("Problemas no documento teacher.");
                return reject(err);
            } else {
                return resolve(teacher);
            }
        });

    });
};

async function put_aggregate (id,course,res) {
    //console.log("qq",course);
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
    collection.find({'id': id,'status': 1},{projection:{ _id: 0,status: 0,'teacher_id':  0,'teacher.status':   0}}).toArray((err, courses) => {
        if (err) {
            console.log(err);
            console.error("Ocorreu um erro ao conectar a collection course");
            res.status(500);
        }
        else {
            res.status(201).send(courses);
        }
    });
});

app.post('/', function(req, res) {
    var courses = [];
    var body = req.body;

    courses.name=body.name;
    courses.city = body.city;
    courses.period = parseInt(body.period)||8;

    courses.teachers = body.teachers;
    if(body.name && body.city)
    {
        courses.id =idcourses++;
        courses.status = 1;
        aggregate(courses,res);

    }
    else
    {

    }

});


app.get('/:id',function(req,res){

    var id = parseInt(req.params.id);

    collection.find({'id': id,'status': 1},{projection:{ _id: 0,status:0,'teacher_id':0,'teacher.status':0}}).toArray((err, courses) => {
        if (err) {
            console.log (err);
            console.error("Ocorreu um erro ao conectar a collection course");
            res.status(500);
        } else {
            if (courses === []) {
                res.status(404).send("Curso não encontrado.");
            } else {
                res.status(201).send(courses);
            }
        }
    });
});

app.delete('/:id',function(req,res){
    var id = parseInt(req.params.id);

    collection.find({"id": id,'status':1},function (err,coursers) {
        if (err) {
            console.error("Ocorreu um erro ao deletar o documento da coleção.");
            res.status(500);
        } else {
            if (coursers != null) {
                collection.update({"status": 1}, {$set: {'status': 0}}, {upset: true});
                res.status(204);//No content
                res.send("O curso foi removido.");
            }
            else{
                console.log("Nenhum documento foi removido.");
                res.status(401).send("curso não foi removido ou por não existir ou por ja ter sido deletado");

            }
        }

    });
});

//delete all
/*app.delete('/',function(req,res){
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
});*/

app.put('/:id', function(req,res){
    var id = parseInt(req.params.id);
    var bodycourse  = req.body;

    put_aggregate(id,bodycourse,res);


});



module.exports = {app};