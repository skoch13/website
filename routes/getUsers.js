const exec = require('child_process').exec;

const getUsers = function () {
    let usersToJSON = {};
    exec("cut -d: -f1 /etc/passwd", (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        let users = stdout.split('\n');

        //cleaning an array of users
        if (users[users.length - 1] === '') {
            users.pop();
        }

        for (let i = 0; i < users.length; i++) {
            usersToJSON[i] = users[i];
        }
    }); 

    return usersToJSON;
};

module.exports = getUsers;