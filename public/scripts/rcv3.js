const captchaResult = () => {
    grecaptcha.execute('6Lc2nsAUAAAAAN1avEKzMfaZERaZp45NxSQieTUQ', {
        action: 'homepage'
    }).then((token) => {
        const login = document.querySelector('#login').value;
        const captcha = token;
        sendData(login, captcha);
    });
}
const sendData = (login, captcha) => {

    const info = JSON.stringify({
        login: login,
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

        if (!data.success || data.success === undefined) {
            alert('Вы - грязный робот');
            console.log(data.score);
            return false;
        }
        result = data.success;
        console.log(`Похоже, что Вы - не робот: ${data.score}`);
    }).catch((e) => console.log(e));
    return result;
}