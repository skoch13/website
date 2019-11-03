const passGen = require('password-generator');
const URL = 'tg://socks?server=skoch13.cloud&port=443&user='
const exec = require('child_process').exec;

const userCreator = (username) => {
    let password = passGen(13, false);
    exec(`sudo useradd -s /usr/sbin/nologin -p $(openssl passwd -1 ${password}) ${username}`, (error, stdout, stderr) => {
        if (error) {
            return `exec error: ${error}`;
        }

    })

    return `${URL}${username}&pass=${password}`

}

module.exports = userCreator;
