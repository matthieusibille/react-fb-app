const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userProfileSchema  = new Schema({
    _id : false,
    username:String,
    firstname:String,
    name:String,
    gender:String,
    age:Number,
    address:String,
    zipCode:Number,
    city:String,
    description:String,
    
})

const userAvatar  = new Schema({
    _id : false,
    path: String,
})


const userSchema  = new Schema({
    email: String,
    password: String,
    profile: userProfileSchema,
    avatar:userAvatar,
    online:Boolean,
    friends:[{
        _id:false,
        id: String,
        status:String,
        username:String
    }],
    role:String
})

// arguments : model name, schema used, database collection name
module.exports = mongoose.model('user', userSchema, 'users')