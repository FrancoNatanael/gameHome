const { body } = require ( 'express-validator' );

let validaciones = [
    body('email').notEmpty().withMessage('Tienes que poner un mail').bail().isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password').notEmpty().withMessage('Tienes que poner una password'),
    body('firstName').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('lastName').notEmpty().withMessage('Tienes que escribir un apellido'),
    body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
		
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]

module.exports = validaciones;






