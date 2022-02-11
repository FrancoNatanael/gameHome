function userLogged(req,res,next) {
    if(req.session.user){
        res.redirect('/usuario/perfil')
    }
    next()
}

module.exports=userLogged