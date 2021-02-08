const { register } = require('../redirects/signup');
const { login } = require('../redirects/login');
const { logout } = require('../redirects/logout');

exports.hpage = (req,res) => {
    res.render('hpage');
}

exports.registration = (req,res) => {
    res.render('signup');
}

exports.login = (req,res) => {
    res.render('login', {msg: ''});
}

exports.sdash = (req,res) => {
    res.render('sdash');
}

exports.tdash = (req,res) => { 
    res.render('tdash');
}

exports.roomCreation = (req,res) => {
    res.redirect('/'+req.body.code);
}

exports.room = (req,res) => {
    res.render('room');
}

exports.signup = (req,res) => {
    register(req,res);
}

exports.loginAuth = (req,res) => {
    const {username, password} = req.body;
    login(req,res,username,password);
}

exports.logout = (req,res) => {
    logout(req,res);   
}