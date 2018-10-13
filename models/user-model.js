const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let todoSchema=new Schema({
    taskname:{type: String,required:true},
    done:{ type: Boolean ,default:false},
});


let userSchema=new Schema({
     username:String,
     googleId: String,
     profileImgLink:String,
     tasks:[todoSchema]

});



const User=mongoose.model('user',userSchema);
module.exports=User;
