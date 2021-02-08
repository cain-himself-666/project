const User = require('../db/db');

async function login(req,res,username,password){
    User.findOne({
        where: {
            username: username
        }
    })
    .then(user => {
        if(!user){
            // res.send('User does not exist');
            res.render('login', {msg: 'User does not exist, Please try again !!!'})
        }
        else if(!user.validPassword(password)){
            res.render('login', {msg: 'Password Incorrect, Please try again !!!'})
        }
        else{
            if(user.usertype === 2){
                req.session.userId = Math.floor(Math.random() * 100000);
                req.session.role = 'teacher';
                res.redirect('/tdash');
            }
            else if(user.usertype === 1){
                req.session.userId = Math.floor(Math.random() * 100000);
                req.session.role = 'student';
                res.redirect('/sdash');
            }
        }
    })
    .catch(err => console.log(err));
}

module.exports = {
    login
}