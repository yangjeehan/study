var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
router.get('/', function(req,res) {
    console.log('called api  /test/sample ')
    res.res
});


module.exports = router;
