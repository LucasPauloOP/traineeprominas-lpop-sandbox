var mongoose = require('mongoose');
const Schema = mongoose.Schema;


schemaUser = new Schema ({

    id:{
        type:Number,
        required:true,
        unique:true
    },

    name: {
        type: String,
        required: true
    },

    lastName:{
        type: String,
        required:true
    },

    profile:{
        type:String,
        enum:['admin','guess'],
        required:true
    },

    status:{
        type:Number,
        required:true,
        enum:[0,1],
        unique:1
    }
});



schemaTeacher = new Schema({

    id:{
        type:Number,
        required:true,
        unique:true
    },

    name:{
        type: String,
        required:true
    },

    lastName:{
        type:String,
        required:true
    },

    phd:{
        type:Boolean,
        required:true,
        validate:[val =>{return val == true},
            'PHD de professor deve ser verdadeiro para ser cadastrado'
        ]},

    status:{
        type:Number,
        required:true,
        enum:[0,1],
        unique:true
    }

});



schemaCourse  =  new Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type: String,
        required:true
    },

    period:{
        type:Number,
        required:true

    },

    city:{
        type:String,
        required:true
    },

    teacher: {
        type:[schemaTeacher],validate:[val =>{return val.length>=2}
            ,'Para cadastrar um curso é necessário no mínimo 2 professores.'],
        required: true
    },
    status:{
        type:Number,
        required:true
    }

});



schemaStudent =new Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },

    lastName:{
        type:String,
        required:true
    },

    age:{
        type:Number,
        min:18,
        required:true
    },

    course:{
        type:[schemaCourse],
        validate:[val=>{return val.length>=1},
            'Para cadastrr um estudante é necessário que ele tenha 1 curso'],
        required:true,
    },
    status:{
        type:Number,
        required:true,
        enum:[0,1]
    }
});

module.exports={schemaUser,schemaTeacher,schemaCourse,schemaStudent};

