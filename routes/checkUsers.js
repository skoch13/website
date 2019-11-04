const checkUsers = function (requestedUser, existingUsers) {
    let result = {};
    for (usr in existingUsers) {
        if (existingUsers[usr].toLowerCase() !== requestedUser.toLowerCase()) {
            result = true;
        } else {
            result = false;
            break;
        }
    }
    return result;
};

module.exports = checkUsers;
