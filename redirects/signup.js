const User = require('../db/db');

const register = async (req,res) => {
    const { email, username, password, usertype } = req.body;
    User.create({
        username: username,
        email: email,
        password: password,
        usertype: usertype
    })
    .then(() => {
        res.send('Data Registered in Database');
    })
    .catch(err => console.log(err));
}

module.exports = {
    register
}