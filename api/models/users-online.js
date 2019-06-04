const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userOnlineSchema  = new Schema({
    id:String,
    username:String,
    socket:String, 
})

// arguments : model name, schema used, database collection name
module.exports = mongoose.model('userOnline', userOnlineSchema, 'user-online')