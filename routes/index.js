const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const getUsers = require('./getUsers');
const checkUsers = require('./checkUsers');
const userCreator = require('./userCreator');
const request = require('request');
const secketKey = ***REMOVED***;

const urlencodedParser = bodyParser.urlencoded({
    extended: false
});
const textParser = bodyParser.text();
const jsonParser = bodyParser.json();

const catchReCaptcha = (req, res, next) => {
    let reqBody = jsonParser(req);
    console.log(reqBody);
    if (!req.body.captcha) {
        res.json({
            'msg': 'captcha token is undefined'
        });
        console.log(req.body.captcha);
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secketKey}&response=${req.body.captcha}`;

    request(verifyUrl, (err, response, body) => {
        if (err) {
            console.log(err);
        }

        body = JSON.parse(body);

        if (!body.success || body.score < 0.4) {
            return res.json({
                'msg': 'You might be a robot',
                'score': body.score
            })
        }
        return res.json({
            'msg': 'OK',
            'score': body.score
        });
    });
    next();
}

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
});

router.post('/socks', catchReCaptcha, urlencodedParser, (req, res) => {
    let socks5string = userCreator(req.body.name);

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