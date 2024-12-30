/*Using JWT */

const User = require('../models/user')
const { setUser } = require('../service/auth')

async function handleSignUpUser(req, res) {
    const body = req.body;
    await User.create({
        name: body.name,
        email: body.email,
        password: body.password,
    })
    return res.redirect("/")
}

async function handleLoginUser(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user)
        return res.render('login', { error: "Invalid email or password" });
    const token = setUser(user);
    res.cookie('uid', token);
    return res.redirect("/")
}

module.exports = { handleSignUpUser, handleLoginUser };









