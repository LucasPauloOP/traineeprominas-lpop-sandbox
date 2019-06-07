var mongoose = require('mongoose');
const schema = mongoose.schema;


var users = new mongoose.schema ({

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
            Enum:['admin','guess'],
            require:true
        },

        status:{
            type:Number,
            require:true,
            enum:[0,1],
            unique:1
        }
});



var teacher = new schema({

        id:{
            type:Number,
            require:true,
            unique:1
        },

        name:{
            type: String,
            require:true
        },

        lastName:{
            Type:String,
            require:true
        },

        phd:{
            type:Boolean,
            require:true,
            validate:{
            validator:function (value) {
                return value == true ? true : false;
                }
            },
            message:props => "O campo phd deve ter o valor true"
        },

        status:{
            type:Number,
            require:true,
            enum:[0,1],
            unique:1
        }

    });



var course  =  new schema({

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

});



  var student =new schema({

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
  });

  module.exports({user,course,teacher,student});
