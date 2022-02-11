const express= require('express');
const router= express.Router();
const path = require('path');


/*Con esta variable llamo a mi archivo localizado en la carpeta CONTROLLER*/ 
let productController= require('../controllers/productController');


//Require de Multer
let upload = require('../middleware/multerMiddleware');



router.get('/', productController.index);

//Editar producto
router.get('/products/:id/edit', productController.edit);
router.put('/products/:id',upload.single('image'),productController.update)


router.get('/carrito', productController.cart);


/**Crear Producto **/
router.get('/products/create', productController.add);
router.post('/products', upload.single('image'), productController.store)


/*Detalle de producto**/ 
router.get('/products/:id', productController.detail);


//Ruta para todos los productos (GET)
router.get('/products', productController.all);

/*** DELETE ONE PRODUCT***/ 
router.delete('/products/delete/:id', productController.destroy); 

module.exports= router;