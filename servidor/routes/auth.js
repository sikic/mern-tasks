const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')
//express validator
const {check} = require('express-validator');

//inicia sesion
//api/auth
router.post('/',authController.autenticarUsuario);


router.get('/',
auth,
authController.usuarioAtenticado);
module.exports = router;