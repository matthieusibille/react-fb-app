const mongoose = require('mongoose');

const Schema = mongoose.Schema

const postsSchema  = new Schema({
    username: String,
    author:String,
    message: String,
    timeStamp:String
})


// arguments : model name, schema used, database collection name
module.exports = mongoose.model('posts', postsSchema, 'posts-test')