const jsonDb = require('../model/jsonDatabase');
const usersModel = jsonDb('users');

function cookie(req,res,next)
{
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    let userAll = usersModel.readFile()

            let userFromCookie;

            for (let i = 0; i < userAll.length; i++) {
               if(userAll[i].email == emailInCookie){
               userFromCookie =  userAll[i]
               }
                
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