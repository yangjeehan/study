// express 모듈을 만들고 관련 함수를 app에 넣어버림 
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
// No 'Access-Control-Allow-Origin'
// npm install cors --save
var cors = require('cors');

app.listen(3000, function(){
    console.log("start test");
});

// static data접근에 public폴더를 통해 하겠다고 선언
app.use(express.static('public'))

// 꿀팁 npm install -g nodemon
// nodemon 을 통해 실행 시, 변경부분이 바로바로 반영

// post방식의 데이터를 이용할려면 필요 ( npm install body-parser )
// bodyParser의 json과 urlencoded 부분의 사용명시
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// view engine은 ejs야 라고 알려줌 
app.set('view engine', 'ejs')

// No 'Access-Control-Allow-Origin'
app.use(cors({origin: '*'}))


app.get('/', function(req,res) {
    //res.send("<h1>test</h1>")
    res.sendFile(__dirname + "/public/main.html")
})
app.get('/main', function(req,res) {
    res.sendFile(__dirname + "/public/main.html")
})

app.post('/email_post', function(req,res) {
    console.log(req.body.email)
//    res.send("<h1>welcome" + req.body.email + "</h1>")
    res.render('email.ejs',{'email' : req.body.email})
})

app.post('/ajax_send_email', function(req, res){
    console.log(req.body.email);
    var responseData = {'result': 'ok', 'email' : req.body.email}
    res.json(responseData);
});

// 미리 html을 만들어두고 응답 ( ex) ejs 을 통해 ) 
// npm install ejs --save

//for(var i=0; i < 1000 ;i++) {
//    console.log('ggg');
//}
