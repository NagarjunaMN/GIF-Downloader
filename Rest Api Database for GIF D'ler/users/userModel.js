const mongoose = require('mongoose')
const schema = mongoose.Schema;

let userSchema = new schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:[true,"Mobile number is already present"]
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:[true,"Email is already present"],

    },
    password:{
        type:String,
        required:true,
    },
    createdOn:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('users',userSchema)