const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose=require("passport-local-mongoose");


const passport=require("passport-local-mongoose");

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true,

    },

});



userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', userSchema);