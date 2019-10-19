const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('index');
});

router.get('/playlists', (req,res) => {
    res.render('playlists');
});

router.get('/socks', (req,res) => {
    res.render('socks', {
        page: 'socks'
    });
});

router.post('/socks', (req,res) => {
    res.send(req.body.name)
})

module.exports = router;