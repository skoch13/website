const captchaResult = () => {
    grecaptcha.execute('6Lc2nsAUAAAAAN1avEKzMfaZERaZp45NxSQieTUQ', {
        action: 'homepage'
    }).then((token) => {
        const login = document.querySelector('#login').value;
        const email = document.querySelector('#email').value;
        const captcha = token;
        sendData(login, email, captcha);
    });
}
const sendData = (login, email, captcha) => {

    const info = JSON.stringify({
        login: login,
        email: email,
        captcha: captcha,
    });
    fetch('/captcha', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: info
    }).then((res) => res.json()).then((data) => {

        if (!data.success) {
            alert('Вы - грязный робот');
            console.log(data.score);
        }
        result = data.success;
        console.log(`OK ${data.score}`);
    }).catch((e) => console.log(e));
    return result;
}