const modeloProyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator')

exports.crearProyecto = async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errores: error.array() })
    }

    try {
        const proyecto = await new modeloProyecto(req.body);

        //Guardar el creador con jwt
        proyecto.creador = req.usuario.id;
        //guardamos en la bd
        proyecto.save();
        res.json(proyecto);

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "hubo un error" });
    }
}

exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await modeloProyecto.find({ creador: req.usuario.id }).sort({ creacion: -1 });
        res.json({ proyectos });
    } catch (error) {
        console.log(error);
        res.status(500), json({ msg: 'hubo un error controller obtener proyectos' })
    }

}

exports.actualizarProyecto = async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errores: error.array() })
    }

    const { nombre } = req.body;
    const nuevo = {};

    if (nombre) {
        nuevo.nombre = nombre;
    }

    try {
        //buscar el ID
        let proyecto =  await modeloProyecto.findById(req.params.id);
        //revisar proyecto
        if(!proyecto)
            return res.status(404).json({ msg: 'Proyecto no encontrado' })

            //revisar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id)
            return res.status(401).json({ msg: 'No autorizado' })

        //actualizar
        proyecto = await modeloProyecto.findByIdAndUpdate({_id:req.params.id},{$set:nuevo},{new:true});

        res.json({proyecto});

    } catch (error) {
      //  console.log(error)
        res.status(500).json({ msg: 'hubo un error controller obtener proyectos' })

    }
}

exports.eliminarProyecto = async(req,res) =>{

    try {
         //buscar el ID
         let proyecto =  await modeloProyecto.findById(req.params.id);
         //revisar proyecto
         if(!proyecto)
             return res.status(404).json({ msg: 'Proyecto no encontrado' })
 
             //revisar el creador del proyecto
         if(proyecto.creador.toString() !== req.usuario.id)
             return res.status(401).json({ msg: 'No autorizado' })

        proyecto = await modeloProyecto.findByIdAndDelete({_id:req.params.id})

        res.json({ msg: 'proyecto eliminado' })
        
    } catch (error) {
        res.status(500).json({ msg: 'hubo un error controller elminar proyectos' })
    }
}