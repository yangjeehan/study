var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
var sample = require('./sample/index')

router.get('/', function(req,res) {
    console.log('called api  /test ')
});

router.use('/sample', sample)

module.exports = router;
