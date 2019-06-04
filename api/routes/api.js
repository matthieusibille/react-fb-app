const express = require('express');
const router = express.Router();

//JSON WEB TOKEN
const jsonWebToken = require('../modules/jwt');

//AUTH
const authModule = require('../modules/auth')
router.post('/login/', (req, res) =>{
    authModule.login(req, res)
})
router.post('/register/', (req, res) =>{
    authModule.register(req, res)
})

//USER
const userModule = require('../modules/user')
router.get('/user/', jsonWebToken.verifyToken, (req, res) =>{
    userModule.getUser(req, res)
})
router.get('/users/', (req, res) =>{
    userModule.getUserList(req, res)
})

//POSTS
const postsModule = require('../modules/posts')
router.get('/posts/', (req, res) =>{
    postsModule.getPosts(req, res)
})

router.post('/insert-post/', jsonWebToken.verifyToken, (req, res) =>{
    postsModule.insertNewPost(req, res)
})

module.exports = router;