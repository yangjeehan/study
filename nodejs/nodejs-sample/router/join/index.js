var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
var mysql = require('mysql')

// DATABASE SETTING
var connection = mysql.createConnection ({
    host : 'localhost',
    prot : 3306,
    user : 'root',
    password : '',
    database: 'test'
})
 
connection.connect();

// Router!!
router.get('/', function(req,res) {
    console.log('get join url')
    res.sendFile(path.join(__dirname , '../../public/join.html'))
})


router.post('/', function(req,res){
    var body = req.body;
    var email = body.email;
    var name = body.name;
    var passwd = body.password;
    console.log(email);
/*
    var query = connection.query('insert into user(email, name, pw) values ("' + email +'", "' + name + '","' + passwd + '")', function (err, rows) {
        if(err) { throw err;}
        console.log("ok db insert");
    })
*/
// escaping-query-values ( sql injection 등 공격을 막기 위해 사용 )
// site : https://github.com/mysqljs/mysql#escaping-query-values
    var sql = {email: email , name : name, pw : passwd } ;
    var query = connection.query('insert into user set ?', sql ,function (err, rows) {
        if(err) throw err
        // console.log("ok db insert : ", rows.insertId,   name);
        else res.render('welcome.ejs',{'name' : name , 'id':rows.insertId})

    })

})

module.exports = router;