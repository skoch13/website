const exec = require('child_process').exec;
const fs = require('fs');

const getUsers = function () {
    exec("dscl . list /Users | grep -v '_'", (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        let users = stdout.split('\n');

        //cleaning an array of users
        if (users[users.length - 1] === '') {
            users.pop();
        }

        let usersToJson = {};

        for (var i = 0; i < users.length; i++) {
            usersToJson['user' + i] = users[i];
        }

        //compling a JSON file before writing in file
        usersToJson = JSON.stringify(usersToJson,null,2);

        //saving existing users to a text file
        fs.writeFile('./public/users.json', usersToJson, (err) => {
            if (err) {
                return console.log(err);

            }
        })
    });

}

module.exports = getUsers;
