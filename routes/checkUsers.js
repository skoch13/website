const existingUsers = require('../data/users.json');
let result;

const checkUsers = function (requestedUser) {
    for (usr in existingUsers) {
        if (existingUsers[usr].toLowerCase() !== requestedUser.toLowerCase()) {
            result = true;
        }
        else {
             result = false;
        }
    }
    return result;
};

module.exports = checkUsers;

