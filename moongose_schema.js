//constant to use moongose
var mongoose = require('mongoose');

// constant to facilitate the calling of the schema function
const Schema = mongoose.Schema;


//------------------schema user-----------------------------------
schemaUser = new Schema ({

    id:{
        type:Number
        // required:true
    },

    name: {
        type: String
        /*required: true*/
    },

    lastName:{
        type: String
        // required:true
    },

    profile:{
        type:String,
        enum:['admin','guess']
        // required:true
    },

    status:{
        // required:true,
        // enum:[0,1],
        type:Number
    }
},{versionKey:false});


//---------------------------------schema teacher----------------------------
schemaTeacher = new Schema({

    id:{
        type:Number,
        // required:true
    },

    name:{
        type: String,
        // required:true
    },

    lastName:{
        type:String,
        // required:true
    },

    phd:{
        type:Boolean,
        // required:true,
        validate:[val =>{return val == true},
            'PHD de professor deve ser verdadeiro para ser cadastrado'
        ]},

    status:{
        type:Number,
        // required:true
    }

},{versionKey:false});


//-----------------------------------schema course----------------------------------------------
schemaCourse  =  new Schema({

    id:{
        type:Number,
        // required:true
    },

    name:{
        type: String,
        // required:true
    },

    period:{
        type:Number
    },

    city:{
        type:String,
        // required:true
    },

    teacher: {
        // required: true,
        type:[schemaTeacher],validate:[schemaTeacher =>{return schemaTeacher.length>=2}
            ,'Para cadastrar um curso é necessário no mínimo 2 professores.']
    },

    status:{
        type:Number,
        // required:true
    }

},{versionKey:false});


//------------------------------------schema student-----------------------------------------
schemaStudent =new Schema({
    id:{
        type:Number,
        // required:true
    },
    name:{
        type:String,
        // required:true
    },

    lastName:{
        type:String,
        // required:true
    },

    age:{
        type:Number,
        min:17
        // required:true,
    },

    course:{
        type:[schemaCourse],
        validate:[val=>{return val.length == 1},
            'Para cadastrar um estudante é necessário que ele tenha 1 curso'],
        // required:true,
    },

    status:{
        type:Number,
        // required:true
    }

},{versionKey:false});


//---------------------module that exports the schemas---------------------------------------------------
module.exports={schemaUser,schemaTeacher,schemaCourse,schemaStudent};

