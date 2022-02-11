const express= require('express');
const router= express.Router();


const upload= require('../middleware/multerAvatar');
let validation = require('../middleware/errorsValidation');



/*Con esta variable llamo a mi archivo localizado en la carpeta CONTROLLER*/ 
let usersController= require('../controllers/usersController');


//Require middlewares de autentificacion
let ifUserLogged = require('../middleware/ifuserLogged')
let auth = require('../middleware/auth')


//Login
router.get('/login',ifUserLogged, usersController.login);

//Procesamiento de formulario de loggeo
router.post('/login', validation, usersController.loginProcess);
//Logout
router.get('/logout', usersController.logout)
//Register
router.get('/registro',ifUserLogged, usersController.register);

router.post('/registro',validation,upload.single('avatar'),usersController.create);

//Perfil de usuario
router.get('/perfil',auth,usersController.profile)

//Edición de perfil
//router.put('/editar/:id',upload.single('image'),usersController.edit)


module.exports= router;