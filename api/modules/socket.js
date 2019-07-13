//JSON WEB TOKEN
const jwt = require('jsonwebtoken');

//MODELS
const User = require('../models/user');
const Posts = require('../models/posts')

const moment = require('moment')

module.exports = (io) => {

    io.on('connection', (socket) => {

        const updateUserList = (token, status) => {
            let payload = jwt.verify(token, 'privatekey')
            //console.log("payload", payload);
            
            if (payload) {
                User.findOne(
                    { _id: payload.subject }, (err, user) => {
                        if (err) {
                            console.log(err)
                        } else {
                            if (status !== user.online) {
                                User.findOneAndUpdate(
                                    { _id: payload.subject }, { $set: { "online": status } }, { new: true }, (err, userData) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            
                                            let userUpdated = {
                                                _id: userData._id,
                                                username: userData.profile.username,
                                                online: userData.online
                                            }
                                            io.emit('updateUserList', userUpdated)
                                        }
                                    })
                            }
                        }
                    }
                )
            }
        }

        socket.on('userConnected', (token) => {
            //console.log('connected')
            updateUserList(token, true)    
        })

        socket.on('userDisconnected', (token) => {
            //console.log('discconnected', token)
            updateUserList(token, false)
        })
        
        socket.on('newPostPublished', (post) => {
            //socket.broadcast.emit('updatePostsList', data)
            socket.broadcast.emit('updatePostsList', post)
        })

    })

} 