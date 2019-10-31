const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const getUsers = require('./getUsers');
const checkUsers = require('./checkUsers');
const userCreator = require('./userCreator');

const urlencodedParser = bodyParser.urlencoded({
    extended: false
})
const textParser = bodyParser.text();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/playlists', (req, res) => {
    res.render('playlists');
});

router.get('/socks', (req, res) => {
    getUsers();
    res.render('socks');
});

router.post('/checkUsers', textParser, (req, res) => {
    let result = checkUsers(req.body);
    res.send(result);
})

router.post('/socks', urlencodedParser, (req, res) => {
        let socks5string =  userCreator(req.body.name);

        //error checker
        if (socks5string.includes('exec')) {
            res.status(404);
            res.render('404');
        }

        res.render('success', {
            data: {
                name: req.body.name,
                socks5: socks5string
            },
        });
});

router.all('*', (req, res) => {
    res.status(404);
    res.render('404');
});

module.exports = router;