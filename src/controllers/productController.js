const jsonDb = require('../model/jsonDatabase')
const productModel = jsonDb('products')
const db = require('../database/models')
const { Op } = require("sequelize");
const { promiseImpl } = require('ejs');

/*Modelos base de datos*/

const Products = db.Product
const Colors = db.Color
const Brands = db.Brand
const Categories = db.Category


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
            Products.findAll({include:['brand','color','category']})
            .then(products =>
                {
                    console.log(products)
                    res.render('products/products',{products})
                
                })
                
        }



        Products.findAll({include:['brand','color','category']})
        .then(products =>
            {
                console.log(products)
                res.render('products/products',{products})
            
            })
            
        /*
        res.render('products/products',{products})
        */
            
},
    edit: (req,res)=>{

    
        if(req.session.user){

            let id=req.params.id;
            let producto=Products.findByPk(id);
            let colors = Colors.findAll();
            let categories = Categories.findAll();
            let brands = Brands.findAll();

            Promise
           .all([producto,colors,categories,brands])
           .then(([producto,colors,categories,brands])=>
            {
                res.render('products/editProduct',{user:req.session.user,producto,colors,categories,brands})
            })


           
        }
        let id=req.params.id;
        let producto=Products.findByPk(id);
        let colors = Colors.findAll();
        let categories = Categories.findAll();
        let brands = Brands.findAll();

        Promise
       .all([producto,colors,categories,brands])
       .then(([producto,colors,categories,brands])=>
        {
            res.render('products/editProduct',{user:req.session.user,producto,colors,categories,brands})
        })
    },
    add: (req,res)=>{

        if(req.session.user){

            let brands = Brands.findAll();
            let colors= Colors.findAll();
            let categories = Categories.findAll();

            Promise
            .all([brands,colors,categories])
            .then(
                ([brands,colors,categories]) => {
                    res.render('products/productAdd',{user:req.session.user , brands,colors,categories})
                }
            )


           
        }
        let brands = Brands.findAll();
        let colors= Colors.findAll();
        let categories = Categories.findAll();

        Promise
        .all([brands,colors,categories])
        .then(
            ([brands,colors,categories]) => {
                res.render('products/productAdd',{ brands,colors,categories})
            }
        );

    },
    store: (req, res) => {
        let product = {
            name:req.body.name,
            price:req.body.price,
            stock_min:req.body.stock_min,
            stock_max:req.body.stock_max,
            stock:req.body.stock,
            categoryId:req.body.categoryId,
            colorId:req.body.colorId,
            brandId:req.body.brandId,
            description:req.body.description,
            extended_description:req.body.extended_description
        
        }
        
        if(req.file){
            product.image = req.file.filename
        }else{
            product.image = 'default-image.png'
        }

        Products.create(product)
        .then(() => {
            return  res.redirect('products')
        })

        
    },
    

    detail: function (req,res) {

        if(req.session.user){

            /*Products.findAll({
                where:{
                    section='Ofertas'
                }
            })*/
            
            Products.findByPk(req.params.id)
                .then(producto =>{
                    res.render('products/productDetail',{user:req.session.user,producto,products})
                })

            
        }


        //PONER VARIABLE CON OFERTAS

        Products.findByPk(req.params.id)
                .then(producto =>{
                    res.render('products/productDetail',{producto})
                })
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
				let  product =Products.findByPk(idReq).then(result=>{
                    return result
                })
                
                    row.image = product.image
			}
			

		
		Products.update(row,{
            where:{
                id:idReq
            }
        })
        .then(()=>{

            res.redirect('/products')
        })

		
},
		
    // Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	let productId = req.params.id;

    Products
    .destroy({where: {id:productId}, force : true})
    .then(()=>{
        res.redirect('/products')
    })

}
}


module.exports=productController;