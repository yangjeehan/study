var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
var mysql = require('mysql')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

// DATABASE SETTING
var connection = mysql.createConnection ({
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : '',
    database: 'test'
})
 
connection.connect();

// Router!!
router.get('/', function(req,res) {
    // res.sendFile(path.join(__dirname , '../../public/join.html'))
    var msg;
    var errMsg = req.flash('error')
    if(errMsg) msg = errMsg;
    res.render('login.ejs', {'message' :msg}) 

})

// session을 저정하는처리
passport.serializeUser(function(user,done) {
    console.log('passport session save:  ', user.id)
    done(null, user.id);
});

// session에 있는 값들을 뽑아서 페이지들에게 전달 
passport.deserializeUser(function(id, done) {
    console.log('passport session get id:  ', id)
    done(null, id);
})

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    }, function(req, email, password, done) {
        var query = connection.query('select * from user where email=?', [email], function(err, rows) {
            if(err) return done(err);

            if(rows.length) {
                console.log('aa' + rows[0].UID)
                return done(null, {'email' : email , 'id' : rows[0].userId })
            } else {
                return done(null, false, {'message': 'your login info  is not found >.<'})
            }
        })
    } 
));

router.post('/', function(req,res,next) {
    passport.authenticate('local-login', function(err,user,info){
        if(err) res.status(500).json(err);
        if(!user) return res.status(401).json(info.message);
      
        req.login(user, function(err){
            if(err) { return next(err);}
            return res.json(user);
        }) ;
    })(req, res, next);
})


module.exports = router;