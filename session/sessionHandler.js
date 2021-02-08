function sessionValidator(req,res,next) {
    if(req.session.userId){
        if(req.session.role === 'teacher'){
            return res.redirect('/tdash');
        }
        else{
            return res.redirect('/sdash');
        }
    }
    else{
        next();
    }
}

function sessionInvalidator(req,res,next) {
    if(!req.session.userId){
        return res.redirect('/login');
    }
    else{
        next();
    }
}

module.exports = {
    sessionValidator,
    sessionInvalidator
}