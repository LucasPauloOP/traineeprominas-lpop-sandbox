const express = require('express');
const baseAPI = "/api/v1/router";
const app = express.Router();



const mongoClient = require('mongodb').MongoClient;

const mdbURL='mongodb+srv://lucaspauloop:Lucio3237*@cluster0-5y6gh.mongodb.net/test?retryWrites=true';

var db;//variavel global (pode ser vista nas rotas
var collection;

var id;

 mongoClient.connect(mdbURL,{native_parser:true},(err,database) =>{
    if(err){
        console.error("Ocorreu um erro ao conectar ao mongoDB", err);
        res.status(500);//internal server error
    }
    else {

        db =  database.db('trainee-prominas');
        collection = db.collection('course');
        collection.count().then((count) => {
            id = count;
        });

    }
});


async function aggregate (newCourse,res) {
    //console.log('body',newCourse);
    if(newCourse.teacher && newCourse.teacher.length    >   0) {
        // console.log('---->',newCourse.teacher.length);
        let variavel = newCourse.teacher.length;

        for (let aux = 0; aux < variavel; aux++) {

            console.log('seta',newCourse);
            var teachers;
            teachers = await _getoneTeacher(newCourse.teacher[aux]);


            newCourse.teacher[aux] = teachers;
        }
    }
    console.log('seta2',newCourse);
    collection.insertOne(newCourse, (err) => {
        if (err) {
            console.error("Erro ao criar um novo curso", err);
            console.log("err",err);
            res.status(500).send("Erro ao criar um novo curso");

        } else {
            if(newCourse.teacher && newCourse.teacher.length < 0){
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
                console.error("Erro ao acessar o documento teacher.");
                return reject(err);
            } else {
                return resolve(teacher);
            }
        });

    });
};

async function put_aggregate (id,newCourse,res) {
    //console.log("qq",course);
    for (let aux = 0; aux < newCourse.teacher.length; aux++) {
        let teacher;
        teacher = await _getoneTeacher(newCourse.teacher[aux]);

        newCourse.teacher[aux] = teacher;

    }



    collection.updateOne({'id':id},{$set:newCourse},(err) => {
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
    collection.find({'status': 1},{projection:{ _id: 0,status: 0}}).toArray((err, courses) => {
        if (err) {
            console.log(err);
            console.error("Ocorreu um erro ao conectar a collection course");
            res.status(500);
        }
        else {
            res.status(200).send(courses);
        }
    });
});

app.post('/', function(req, res) {
    var newCourse={

            name:   req.body.name,
            city:   req.body.city,
            period: req.body.period||8,
            teacher: req.body.teacher||null,
            id:parseInt(++id),
            status:1

    };

    if(newCourse.teacher == null)
    {
        delete newCourse.teacher;
    }

    if(newCourse.name && newCourse.city)
    {
        aggregate(newCourse,res);
    }

});


app.get('/:id',function(req,res){

    var id = parseInt(req.params.id);

    collection.find({'id': id,'status': 1},{projection:{ _id: 0,status:0}}).toArray((err, courses) => {
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

    var newCourse={

        name:   req.body.name,
        city:   req.body.city,
        period: req.body.period||8,
        teacher: req.body.teacher||null,
    };
        put_aggregate(id, newCourse, res);

});



module.exports = {app};