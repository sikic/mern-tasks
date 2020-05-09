const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    //Leer el token del header
    const token = req.header('x-auth-token');
    
    //reviar si existe o no
    if(!token)
        return res.status(400).json({msg:"Tienes que iniciar sesión antes."})

    //validar el token

    try {
        const cifrado = jwt.verify(token,process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        res.status(401).json({msg:"Token no válido."})
    }

}