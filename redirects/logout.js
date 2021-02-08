const logout = async (req,res) => {
    try{
        await req.session.destroy()
        res.clearCookie('user_sid');
        res.redirect('/');
    }
    catch(err){
        console.log(err);
    }
}
module.exports = {
    logout
}