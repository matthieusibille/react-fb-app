const moment = require('moment')

//MODELS
const Posts = require('../models/posts');
const User = require('../models/user')


module.exports = {
    getPosts: (req, res) => {
        Posts.find(null, null, {sort:{'_id':-1}},
            (err, filteredPosts) => {
                if(!err){
                    res.status(200).send({ filteredPosts })
                }
            })
    },

    insertNewPost: (req, res) => {

        let post = new Posts();
        let userID = req.userId;

        User.findOne({'_id':userID}, {},
            (err, userData) => {
                if(err){
                    console.log(err)
                }else{
                    let timeStamp = moment().format() ;
                    post.username = userData.profile.username;
                    post.author = userID;
                    post.message = req.body.message;
                    post.timeStamp = timeStamp;

                    post.save((err, postSaved) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('insertNewPost')
                            res.status(200).send({ post })
                        }
                    })

                }
            })

        

    }

}