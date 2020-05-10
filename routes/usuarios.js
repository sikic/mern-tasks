//ruta para los usuarios
const express = require('express');
const router = express.Router();
//importamos el controlador
const usuarioController = require('../controllers/usuarioController')

//express validator
const {check} = require('express-validator');
//crea un usuario
//api/usuarios
router.post('/',
[
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('email','Agrega un email valido').isEmail(),
    check('password','El password tiene que ser minimo de 6 carácteres').isLength({min:6})
],usuarioController.crearUsuario);

module.exports = router;