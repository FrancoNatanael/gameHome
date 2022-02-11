const { validationResult }=require('express-validator')
const jsonDb = require('../model/jsonDatabase');
const usersModel = jsonDb('users');
const bcryptjs = require('bcryptjs');

const usersController = {
    login:(req,res)=>{
        if(req.session.user){
            res.render('users/login',{user:req.session.user})
        }
        res.render('users/login')
    },
    register: (req,res)=>{

        if(req.session.user){
            res.render('users/register',{user:req.session.user})
        }

        res.render('users/register')
    },
    create: (req,res)=>{
        const errors = validationResult(req)

        if(errors.isEmpty()){
        let row = req.body
        

        row.password = bcryptjs.hashSync(req.body.password,10)

        console.log(req.file);

        if(req.file){
            row.image = req.file.filename
        }else{
            row.image = 'default-image.png'
        }

        console.log(req.body);

        usersModel.create(row) 

        res.redirect('login')
    }else{
            res.render('users/register',{errors:errors.mapped(),old:req.body});
        }
    },
    loginProcess:(req,res)=>{
        const errors = validationResult(req)

        
        if(errors.isEmpty()){
            let userAll = usersModel.readFile()

            let userEncontrado;

            for (let i = 0; i < userAll.length; i++) {
               if(userAll[i].email == req.body.email){
               userEncontrado =  userAll[i]
               }
                
            }

            console.log(userEncontrado);

            if(userEncontrado && bcryptjs.compareSync(req.body.password,userEncontrado.password)==true){

                   

                req.session.user=userEncontrado

                console.log(req.session.email)

                    if(req.body.recordar){
                        res.cookie('userEmail',req.body.email,{maxAge:(1000*60)*2})
                    }
                    
                    return res.redirect('/')
                
            }
            else{
                res.render('users/login');
            }

        }
        else{
            res.render('users/login',{errors:errors.mapped(),old:req.body});
        }
      
    },
    profile:function (req,res) {
        res.render('users/userProfile',{user:req.session.user})
    },
    //Borra lo que esté en session
	logout:(req,res) =>{
		req.session.destroy();
        res.clearCookie('userEmail')
		return res.redirect('/');
	}
	
}

module.exports=usersController;