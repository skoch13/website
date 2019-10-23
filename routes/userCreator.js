const passGen = require('password-generator');
const URL = 'tg://socks?server=skoch13.cloud&port=443&user='

const userCreator = (username) => {
 let password = passGen(13,false);
 return `${URL}${username}&pass=${password}` 

}

module.exports = userCreator;
