var mongoose = require('mongoose');
const schema = mongoose.schema;


exports.userSchema=()=>{
    return users = new mongoose.schema ({

        id:{
            type:Number,
            require:true,
            unique:1
        },

       name: {
           type: String,
           require: true
       },

        lastName:{
           type:String,
            require:true
        },

        profile:{
           type:String,
            require:true
        },

        status:{
            type:Number,
            require:true,
            enum:[0,1]
        }
    });
};

exports.teacherSchema=(req,res)=>{
    req=new schema({

        name:{
            Type: String,
            Require:true
        },

        lastName:{
            Type:String,
            Require:true
        },

        phd:{
            Type:Boolean,
            Require:true,
        }

    });
};

exports.courseSchema=(req,res)=>{
  var course=new schema({
      name:{
          type: String,
          require:true
      },

      period:{
          type:String,

      },

      city:{
          type:String,
          require:true
      },

      teacher:{
          type:Array,
          require:true
      }


  })
};

exports.studentSchema=(req,res)=>{
  var Student =new schema({

      name:{
          type:String,
          require:true
      },

      lastName:{
          type:String,
          require:true
      },

      age:{
        type:Number,
          min:18
      },

      course:{
          type:Array,
          require:true,
      }

  })
};