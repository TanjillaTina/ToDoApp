const mongoose=require('mongoose');
const Schema=mongoose.Schema;



let userSchema=new Schema({
    username:String,
     googleId: String,
     profileImgLink:String
});

const User=mongoose.model('user',userSchema);
module.exports=User;
