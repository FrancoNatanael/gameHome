function auth(req,res,next) {
    if(!req.session.user){
        res.redirect('/usuario/login')
    }
    next()
}

module.exports=auth