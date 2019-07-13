//MODELS
const User = require('../models/user');

// JWT 
const jwt = require('jsonwebtoken');
const privateKey = "privatekey"

//ENCRYPTION
const bcrypt = require('bcrypt');


module.exports= {
    
    login: (req, res) => {
        
        
        const email = req.body.email
        const password = req.body.password
        //console.log('req.body', email, password)
        User.findOne({ email: email }, {}, (err, userData) => {

            if (err) {
                res.status(401)
            } else if (!userData) {
                //console.log('No userData', userData)
                res.status(200).send( { noUser: true } )
            } else {
                
                const hash = userData.password
                bcrypt.compare(password, hash, function (err, isValid) {
                    if (isValid) {
                        
                        User.findOneAndUpdate( {"_id": userData._id}, { new: true }, (err, user) => {
                            if(err){
                                console.log(err)
                            }else{
                                /* console.log('User found', userData) */
                                let payload = { subject: user._id };
                                let tokenSigned = jwt.sign(payload, privateKey); 
                                res.status(200).send( { token: tokenSigned, userData:user } )
                            }
                        } )

                    } else {
                        res.status(200).send({wrongPassword:true})
                    }
                });
            }

        })
    },

    register: (req, res) =>{

        const saltRounds = 10;
        const password = req.body.password;
        let user;

        bcrypt.hash(password, saltRounds, function(err, hash) {
            if(err){
                console.log(err)
            }else{
                user = new User({
                    email: req.body.email,
                    password: hash,
                    profile: {
                        username:req.body.username,
                        firstname:req.body.firstname,
                        name:req.body.name,
                        gender:req.body.gender
                    },
                    online: false,
                })
            }
             
            if(user){

                user.save((err, userSaved) => {
                    if (err) {
                        console.log(err)
                    } else {
                        let payload = { subject: user._id };
                        let tokenSigned = jwt.sign(payload, privateKey); 
                        res.status(200).send({token:tokenSigned, userData: user})
                    }
                })

            }

          });

    }
}