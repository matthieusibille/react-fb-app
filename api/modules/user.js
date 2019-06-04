//MODELS
const User = require('../models/user');

module.exports = {
    
    getUser: (req, res) => {
        const id = req.userId;
        User.findOne(
            {
                _id: id
            }, { "_id": 0, "password": 0, "friends":0 },
            (err, userData) => {
                if (err) {
                    console.log(err)
                } else {
                    res.status(200).send(userData)
                }
            })

    },

    getUserList: (req, res) => {
        User.find( {},
            (err, users) => {
                if (err) {
                    console.log(err)
                } else {
                    let userList = [];
                    for( let i = 0; i < users.length; i++){
                        let user = {
                            _id: users[i]._id,
                            username: users[i].profile.username,
                            online:users[i].online
                        }
                        userList.push(user)
                    }
                    res.status(200).send(userList)
                }
            })

    }



}