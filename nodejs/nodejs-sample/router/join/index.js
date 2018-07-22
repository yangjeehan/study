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
    res.render('join.ejs', {'message' :msg}) 

})

// session을 저정하는처리
passport.serializeUser(function(user,done) {
    console.log('passport session save:  ', user.id)
    console.log('passport session save:  ', user.email)

    done(null, user.id);
});

// session에 있는 값들을 뽑아서 페이지들에게 전달 
passport.deserializeUser(function(id, done) {
    console.log('passport session get id:  ', id)
    done(null, id);
})

passport.use('local-join', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    }, function(req, email, password, done) {
        console.log('local-join callback called'); 
        console.log(email)
        var query = connection.query('select * from user where email=?', (email), function(err, rows) {
            console.log(rows.length)
            if(err) return done(err);

            if(rows.length) {
                console.log('existed user')
                return done(null, false, {message : 'your email is already used'} )
            } else {
                var sql = {email: email, pw: password};
                var query = connection.query('insert into user set ?', sql, function(err, rows){
                    if(err) throw err
                    return done(null, {'email': email, 'id': rows.insertId})
                })
            }

        })
    }
));

router.post('/', passport.authenticate('local-join', { 
    successRedirect: '/main',
    failureRedirect: '/join',
    failureFlash: true }) 
); 

// router.post('/', function(req,res){
//     var body = req.body;
//     var email = body.email;
//     var name = body.name;
//     var passwd = body.password;
//     console.log(email);
// /*
//     var query = connection.query('insert into user(email, name, pw) values ("' + email +'", "' + name + '","' + passwd + '")', function (err, rows) {
//         if(err) { throw err;}
//         console.log("ok db insert");
//     })
// */
// // escaping-query-values ( sql injection 등 공격을 막기 위해 사용 )
// // site : https://github.com/mysqljs/mysql#escaping-query-values
//     var sql = {email: email , name : name, pw : passwd } ;
//     var query = connection.query('insert into user set ?', sql ,function (err, rows) {
//         if(err) throw err
//         // console.log("ok db insert : ", rows.insertId,   name);
//         else res.render('welcome.ejs',{'name' : name , 'id':rows.insertId})

//     })

// })

module.exports = router;