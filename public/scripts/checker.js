    let userField = document.querySelector('#login');
    let textSpan = document.querySelector('.submit-check');
    let doneTypingInterval = 500;
    let submitButton = document.querySelector('.btn-submit');
    let typingTimer;

    let result;
    
    //loading captcha results
    window.addEventListener('load', () => {
        captchaResult();
    });
    

    userField.addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        
        //emptying span
        textSpan.classList.remove('submit-check-red');
        textSpan.classList.remove('submit-check-green');
        textSpan.textContent = '';
        submitButton.disabled = true;

        if (userField.value) {
            if (!userField.checkValidity()) {
                textSpan.classList.add('submit-check-orange');
                textSpan.textContent = 'Латиницей, от 3 до 25 символов';
                return;
            }
            textSpan.classList.remove('submit-check-orange');
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
        }
    });

    const doneTyping = async () => {
        
        // checking existing users
        const exists = await fetch(
                '/checkUsers', {
                    method: 'POST',
                    headers: {
                        'Accept': 'text/plain',
                        'Content-Type': 'text/plain'
                    },
                    body: userField.value,
                }
            )
            .then(response => response.json())
            .catch(e => {
                console.error(e);
            });

        if (exists && result) {
            textSpan.classList.add('submit-check-green');
            textSpan.textContent = 'Имя свободно';
            submitButton.disabled = false;
        } else {
            textSpan.classList.add('submit-check-red');
            textSpan.classList.remove('submit-check-green');
            textSpan.textContent = 'Занято';
            submitButton.disabled = true;
        }

    };