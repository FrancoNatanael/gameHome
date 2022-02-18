const db = require('../database/models')
const Users = db.User


function cookie(req,res,next)
{
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;

            let userFromCookie;

            if(emailInCookie){
                userFromCookie =  Users.findOne({where:{email:emailInCookie}}).then((result)=>{return result})
            }

    if(userFromCookie)
    {
        req.session.userLogged = userFromCookie;
    }
    if(req.session && req.session.userLogged)
    {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged; 
        //Cargo los datos del usuario en la variable global locals 
        //para poder compartirlo en mis vistas
    }

    
    

    next();

}



module.exports = cookie;