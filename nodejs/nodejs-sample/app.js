// express 모듈을 만들고 관련 함수를 app에 넣어버림 
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = require('./router/index')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
// msg을 쉽게 전달해주기위해사용
var flash = require('connect-flash')

// npm install cors --save
var cors = require('cors');

app.listen(3000, function(){
    console.log("start test");
});

// No 'Access-Control-Allow-Origin'
app.use(cors({origin: '*'}))

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

// express-session
app.use(session({
	secret : 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// 미리 html을 만들어두고 응답 ( ex) ejs 을 통해 ) 
// npm install ejs --save
app.use(router)


// session에 데이터를 저장하는 모듀을 설치하기 위해선 해당 모듈들을 설치해줘야함 
// npm install passport passport-local express-session connect-flash --save-dev

