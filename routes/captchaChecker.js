const request = require('request');

const secretKey = process.env.SECRET_KEY;

const captchaChecker = (req, res) => {
    if (!req.body.captcha) {
        return res.status(400).json({
            'msg': 'captcha token is undefined'
        });
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`;

    request(verifyUrl, (err, response, body) => {
        if (err) {
            console.log(err);
            return res.status(400).json(err.message);
        }

        body = JSON.parse(body);

        if (!body.success || body.score < 0.4) {
            return res.json({"success": false,"msg":"No", "score":body.score});
        }

        return res.json({"success": true,"msg":"YEAS","score":body.score});

})
};

module.exports = captchaChecker;