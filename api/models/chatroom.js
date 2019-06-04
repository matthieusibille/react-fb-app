const mongoose = require('mongoose');

const Schema = mongoose.Schema

const chatSchema  = new Schema({
    host:String,
    hostName:String,
    hosted:String,
    hostedName:String, 
    conversation: [{
        _id : false,
        author:String,
        message:String,
        created:{type:Date, default:Date.now}
    }]
})

// arguments : model name, schema used, database collection name
module.exports = mongoose.model('chat', chatSchema, 'chat-rooms');