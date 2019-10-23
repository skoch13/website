    let userField = document.querySelector('#login');
    let textSpan = document.querySelector('.submit-check');
    let doneTypingInterval = 500;
    let sumbitButton = document.querySelector('.btn-submit');
    let typingTimer;

    userField.addEventListener('keyup', () => {
        clearTimeout(typingTimer);

        //emptying span
        textSpan.classList.remove('submit-check-red');
        textSpan.classList.remove('submit-check-green');
        textSpan.textContent = '';
        sumbitButton.disabled = true;

        if (userField.value) {
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
        .then(responce => responce.json())
        .catch(e => {
            console.error(e);
        });

        if (exists) {
            textSpan.classList.add('submit-check-green');
            textSpan.textContent = 'Username is free'
            sumbitButton.disabled = false;
        } else {
            textSpan.classList.add('submit-check-red');
            textSpan.classList.remove('submit-check-green');
            textSpan.textContent = 'User exists';
            sumbitButton.disabled = true;
        }

    }