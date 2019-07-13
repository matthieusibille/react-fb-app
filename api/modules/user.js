//MODELS
const User = require('../models/user');

//ENCRYPTION
const bcrypt = require('bcrypt');

module.exports = {

    getUser: (req, res) => {
        const id = req.userId;
        User.findOne(
            {
                _id: id
            }, { "_id": 0, "password": 0, "friends": 0 },
            (err, userData) => {
                if (err) {
                    console.log(err)
                } else {
                    res.status(200).send(userData)
                }
            })

    },

    getUserList: (req, res) => {
        User.find({},
            (err, users) => {
                if (err) {
                    console.log(err)
                } else {
                    let userList = [];
                    for (let i = 0; i < users.length; i++) {
                        let user = {
                            _id: users[i]._id,
                            username: users[i].profile.username,
                            online: users[i].online
                        }
                        userList.push(user)
                    }
                    res.status(200).send(userList)
                }
            })

    },


    updateUserProfile: (req, res) => {
        const id = req.userId;
        const user = req.body

        const saltRounds = 10;
        const password = user.password;

        const updateUser = (updatedPassword) => {

            User.findOne(
                { _id: id }, (err, userData) => {
                    if (err) {
                        console.log(err)
                    } else {

                        userData.email = user.email !== userData.email ? user.email : userData.email;
                        userData.password = password !== "" ? updatedPassword : userData.password;
                        userData.profile.username = user.username !== userData.profile.username ? user.username : userData.profile.username;
                        userData.profile.firstname = user.firstname !== userData.profile.firstname ? user.firstname : userData.profile.firstname;
                        userData.profile.name = user.name !== userData.profile.name ? user.name : userData.profile.name;
                        userData.profile.gender = user.gender !== userData.profile.gender ? user.gender : userData.profile.gender;

                        User.findOneAndUpdate({ _id: id }, {
                            $set: {
                                "email": userData.email,
                                "password": userData.password,
                                "profile.username": userData.profile.username,
                                "profile.firstname": userData.profile.firstname,
                                "profile.name": userData.profile.name,
                                "profile.gender": userData.profile.gender
                            }
                        },
                            {
                                new: true,
                                projection: { "_id": 0, "password": 0, "friends": 0 }
                            },
                            (err, updatedUser) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.status(200).send(updatedUser)
                                }
                            })
                    }
                })

        }

        if (password) {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    updateUser(hash)
                }
            })
        } else {
            updateUser(password)
        }

    }

}