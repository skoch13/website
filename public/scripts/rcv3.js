document.getElementById('submitForm').addEventListener('submit', runVerify);

function runVerify(e) {
    e.preventDefault();
    runCaptca();
}

function runCaptca() {

    grecaptcha.execute('6Lc2nsAUAAAAAN1avEKzMfaZERaZp45NxSQieTUQ', {
        action: 'homepage'
    }).then(function (token) {
        const login = document.querySelector('#login').value;
        const email = document.querySelector('#email').value;
        const captcha = token;

        sendData(login, email, captcha);
    });
}
function sendData(login, email, captcha) {
    const info = JSON.stringify({
        login: login,
        email: email,
        captcha: captcha,
    });
console.log(info);
    fetch('/socks', {
        method:'POST',
        headers: {
            'Accept':'application/json, text/plain, */*',
            'Content-type': 'applicaiton/json'

        },
        body: info
    }).then((res) => res.json()).then((data) => {
        alert('msg: '+ data.msg + ' score: ' + data.score)
    }).catch((e) => console.log(e));
}