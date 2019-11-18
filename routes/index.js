const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const getUsers = require('./getUsers');
const checkUsers = require('./checkUsers');
const userCreator = require('./userCreator');
const captchaChecker = require('./captchaChecker');
const {
    check,
    validationResult
} = require('express-validator');

let usersInJSON = getUsers();

const textParser = bodyParser.text();
const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/playlists', (req, res) => {
    res.render('playlists');
});

router.get('/socks', (req, res) => {
    res.render('socks');
});


router.post('/checkUsers', [check('name').trim().not().isEmpty().isString().isAlpha().isLength({
    min: 3,
    max: 25
})], textParser, (req, res) => {
    let result = checkUsers(req.body, usersInJSON);
    res.send(result);
});

router.post('/captcha', jsonParser, (req, res) => {
    captchaChecker(req, res);
});

router.post('/socks', [check('name').trim().not().isEmpty().isString().isAlpha().isLength({
    min: 3,
    max: 25
})], textParser, (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
         res.status(422).json({
            errors: errors.array()
        });
    }
    
    const postUsers = checkUsers(req.body.name, usersInJSON);
    if (!postUsers) {
        res.status(409);
        res.render('exists');
    } else {
        let newLogin = Number(Object.keys(usersInJSON).sort((a,b) => a - b)[Object.keys(usersInJSON).length - 1].slice(-1));
        usersInJSON[Number(newLogin + 1)] = req.body.name;
        let socks5string = userCreator(req.body.name);
        res.render('success', {
            data: {
                name: req.body.name,
                socks5: socks5string
            },
        });
    }
});


router.all('*', (req, res) => {
    res.status(404);
    res.render('404');
});

module.exports = router;