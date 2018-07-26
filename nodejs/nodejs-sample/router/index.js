var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
var main = require('./main/main')
var email = require('./email/email')
var login = require('./login/index')
var logout = require('./logout/index')
var join = require('./join/index')
var movie = require('./movie/index')
var test = require('./test/index')
// var conn = require('../../config/mysql/db')();

// url routing

router.get('/', function(req,res) {
    console.log('index js loaded')
    res.sendFile(path.join(__dirname , '../public/main.html'))
});
/*
router.get('/', function(req,res) {
	var id = req.user;
	if(!req.user) res.render('login.ejs');
	else res.render('main.ejs', {'id' : id});
});
*/
router.use('/main', main)
router.use('/email', email)
router.use('/join', join)
router.use('/login', login)
router.use('/logout', logout)
router.use('/movie', movie)
router.use('/test',test)

module.exports = router;