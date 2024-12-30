/* Using JWT */

const jwt = require('jsonwebtoken')
const secret = "Swaraj@123"

function setUser(user) {
    const payload = {
        id: user.id,
        email: user.email
    }
    return jwt.sign(payload, secret)   //returns a token to a user
}

function getUser(token) {
    if (!token)
        return null;
    return jwt.verify(token, secret) //verifies the token with the secret key
}

module.exports = { setUser, getUser };











