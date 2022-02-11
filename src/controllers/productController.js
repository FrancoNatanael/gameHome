const jsonDb = require('../model/jsonDatabase')
const productModel = jsonDb('products')



const productController = {
    index: (req,res)=>{

        if(req.session.user){
            let products = productModel.all()
            res.render('products/index',{user:req.session.user,products})
        }
            let products = productModel.all()
        res.render('products/index',{products})
    },
    all: (req,res)=>{
    
        if(req.session.user){
            let products = productModel.all()
            res.render('products/products',{user:req.session.user,products})
        }

        let products = productModel.all()
        res.render('products/products',{products})
    
},
    edit: (req,res)=>{

        if(req.session.user){
            let id=req.params.id;
            let producto= productModel.find(id)
           
            res.render('products/editProduct',{user:req.session.user,producto})
        }
       let id=req.params.id;
       let producto= productModel.find(id)

        res.render('products/editProduct',{producto});
    },
    add: (req,res)=>{

        if(req.session.user){
            res.render('products/productAdd',{user:req.session.user})
        }
        res.render('products/productAdd');

    },
    store: (req, res) => {
        let row = req.body
        
        if(req.file){
            row.image = req.file.filename
        }else{
            row.image = 'default-image.png'
        }

        console.log(req.body);

        productModel.create(row) 

        res.redirect('products')
    },

    detail: function (req,res) {

        if(req.session.user){
            let id = req.params.id

            let producto = productModel.find(id)
            let products = productModel.all()
            res.render('products/productDetail',{user:req.session.user,producto,products})
        }
        let id = req.params.id

        let producto = productModel.find(id)
        let products = productModel.all()
        res.render('products/productDetail',{producto,products})
    },
    cart: (req,res)=>{

        if(req.session.user){
            res.render('products/productCart',{user:req.session.user})
        }
        res.render('products/productCart')
    },
    // Update - Method to update
	update: (req, res) => {
		// Do the magic

		let idReq = req.params.id

		let  row= req.body
		row.id = idReq

			if(req.file!=undefined){
				row.image = req.file.filename
			}
			else if(req.file==undefined){
				let objeto = productModel.find(idReq)
				row.image = objeto.image
			}
			

		
		productModel.update(row) 

		res.redirect('/products')
},
		
    // Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		productModel.delete(req.params.id)

		res.redirect('/products')
	}

}


module.exports=productController;