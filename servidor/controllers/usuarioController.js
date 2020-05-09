const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
exports.crearUsuario = async (req,res)=>{
    
    //revisar si hay errores
    const error = validationResult(req);
   
    if(!error.isEmpty()){
        return res.status(400).json({errores:error.array()})
    }
    //extraer email y paswword
    const {email,password}=req.body;

    try {
        let usuario = await Usuario.findOne({email});

        //validar que el usuario sea unico
        if(usuario)
            return res.status(400).json({ msg: 'El usuario ya existe' });

        //crea el nuevo usuario
        usuario = new Usuario(req.body);

        //hasehamos el psswd
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password,salt);

        //guarda el usuario
        await usuario.save();

        //crear y firmar jwt
        const payload = {
            usuario:{
                id: usuario.id
            }
        };

        //firmar el token
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn:3600
        },(error,token) =>{
            if(error)
                throw error;
                
          
            //mensaje de confirmacion
            res.status(200).json({token});
        });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}