const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req, res) => {
    //revisar si hay errores
    
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errores: error.array() })
    }
    //extraer email y paswword
    const { email, password } = req.body;
    try {
        //revisar que el usuario existe
        let usuario = await Usuario.findOne({ email });
        if (!usuario)
            return res.status(400).json({ msg: "usuario no existe" });
        //Revisar paswword 
        const passok = await bcryptjs.compare(password, usuario.password);

        if (!passok)
            return res.status(400).json({ msg: "Contraseña incorrecta" });

        //si todo es correcto crear el jason web tocken 

        //crear y firmar jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //firmar el token
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if (error)
                throw error;

            //mensaje de confirmacion
            res.json({ token });
        });
    } catch (error) {
        console.log(error)
    }
}

//obtiene al usuario autenticado
exports.usuarioAtenticado = async (req,res)=>{
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Hubo un error"})
    }
}