function userAuth(role){
    return (req,res,next) => {
        if(req.session.role !== role){
            res.status(401);
            return res.send('Not Allowed');
        }
        else{
            next();
        }
    }
}
module.exports = {
    userAuth
}