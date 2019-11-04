const exec = require('child_process').exec;
const fs = require('fs');


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

        for (var i = 0; i < users.length; i++) {
            usersToJSON['user' + i] = users[i];
        }

        //compling a JSON file before writing in file
        //usersToJSON = JSON.stringify(usersToJSON);

        //saving existing users to a text file
/*         fs.writeFile('./data/users.json', usersToJSON, (err) => {
            if (err) {
                return console.log(err);

            }
        }) */
    }); 

    return usersToJSON;
}

module.exports = getUsers;
