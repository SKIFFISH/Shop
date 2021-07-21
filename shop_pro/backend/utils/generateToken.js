const jwt = require('jsonwebtoken');
const secretKey = 'HelloKUGOU'

const generateToken = (id) => {
    return jwt.sign({ id },secretKey,{
        expiresIn:'30d'
    })
}

module.exports = {secretKey ,generateToken}