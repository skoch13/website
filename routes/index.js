const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const getUsers = require('./getUsers')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req,res) => {
    res.render('index');
});

router.get('/playlists', (req,res) => {
    res.render('playlists');
});

router.get('/socks',(req,res) => {
     getUsers();
    res.render('socks');
});

router.post('/socks', urlencodedParser, (req,res) => {
   res.render('success', {data: req.body.name});
});

router.get('*', (req,res) => {
    res.status(404);
    res.render('404');
});

module.exports = router;