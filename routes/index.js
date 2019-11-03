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

const textParser = bodyParser.text();
const jsonParser = bodyParser.json();

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


router.post('/checkUsers',[check('name').trim().not().isEmpty().isString().isAlpha().isLength({
    min: 3
})], textParser, (req, res) => {
    let result = checkUsers(req.body);
    res.send(result);
});

router.post('/captcha', jsonParser, (req, res) => {
    captchaChecker(req, res);
});

router.post('/socks', [check('name').trim().not().isEmpty().isString().isAlpha().isLength({
    min: 3
})], (req, res) => {

    getUsers();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    let result = checkUsers(req.body.name);

    if (!result) {
        
        res.status(409);
    } else {
        let socks5string = userCreator(req.body.name);

        res.render('success', {
            data: {
                name: req.body.name,
                socks5: socks5string
            },
        });
        res.status(200);
    }


});


router.all('*', (req, res) => {
    res.status(404);
    res.render('404');
});

module.exports = router;