    let userField = document.querySelector('#login');
    let textSpan = document.querySelector('.submit-check');
    let doneTypingInterval = 200;
    let sumbitButton = document.querySelector('.btn-submit');
    var typingTimer;

    fetch(
        'users.json', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    ).then(responce => {
        return responce.json();
    }).then(resp => {
        localStorage.setItem('users', JSON.stringify(resp));
    });

    let usersJson = JSON.parse(localStorage.users);

    //checking if a user exists on keyup

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

    const doneTyping = () => {

        for (user in usersJson) {
            if (usersJson[user].toLowerCase() !== userField.value.toLowerCase()) {
                textSpan.classList.add('submit-check-green');
                textSpan.textContent = 'Username is free'
                sumbitButton.disabled = false;
        } else {
            textSpan.classList.add('submit-check-red');
            textSpan.classList.remove('submit-check-green');
            textSpan.textContent = 'User exists';
            sumbitButton.disabled = true;
            break;
        }
        
    }
    }