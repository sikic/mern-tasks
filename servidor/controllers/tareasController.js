const modeloTareas = require('../models/Tareas');
const modeloProyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator')

module.exports = {
    obtenertareas: async (req, res) => {

        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errores: error.array() })
        }

        const { proyecto } = req.query;

        try {
            //hay que buscar el proyecto de ese tarea
            const p = await modeloProyecto.findById(proyecto);

            if (!p)
                return res.status(404).json({ mg: 'Proyecto no encontrado' });

            //Revisar si el usuario actual es duelo de ese proyecto 
            if (p.creador.toString() !== req.usuario.id)
                return res.status(401).json({ msg: 'No autorizado' })

            let tareas = await modeloTareas.find({ proyecto });

            res.json({ tareas });
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "hubo un error" });
        }

    },
    crearTarea: async (req, res) => {

        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errores: error.array() })
        }

        const { nombre, proyecto } = req.body;

        try {

            //hay que buscar el proyecto de ese tarea
            const p = await modeloProyecto.findById(proyecto);

            if (!p)
                return res.status(404).json({ mg: 'Proyecto no encontrado' });

            //Revisar si el usuario actual es duelo de ese proyecto 
            if (p.creador.toString() !== req.usuario.id)
                return res.status(401).json({ msg: 'No autorizado' })

            //creamos la tarea
            const tarea = new modeloTareas(req.body);
            await tarea.save();
            res.json({ tarea });
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "hubo un error" });
        }
    },
    actualizarTarea: async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errores: error.array() })
        }

        try {
            //miramos si el id de la paramterica corresponde a alguna tarea
            let tarea = await modeloTareas.findById({ _id: req.params.id });
            if (!tarea)
                return res.status(401).json({ msg: 'tarea inexistente' });

            const { nombre, estado, proyecto } = req.body
            //hay que buscar el proyecto de ese tarea
            const p = await modeloProyecto.findById(proyecto);

            //Revisar si el usuario actual es duelo de ese proyecto 
            if (p.creador.toString() !== req.usuario.id) return res.status(401).json({ msg: 'No autorizado' })

            const TareaNueva = {};
            TareaNueva.nombre = nombre;
            TareaNueva.estado = estado;

            //guardar la tarea
            tarea = await modeloTareas.findOneAndUpdate({ _id: req.params.id }, TareaNueva, { new: true })
            res.json({ tarea })
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "hubo un error" });
        }
    },
    eliminarTarea: async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errores: error.array() })
        }

        try {
            //miramos si el id de la paramterica corresponde a alguna tarea
            let tarea = await modeloTareas.findById({ _id: req.params.id });
            if (!tarea)
                return res.status(401).json({ msg: 'tarea inexistente' });

            const { proyecto } = req.query;
            //hay que buscar el proyecto de ese tarea
            const p = await modeloProyecto.findById(proyecto);

            //Revisar si el usuario actual es duelo de ese proyecto 
            if (p.creador.toString() !== req.usuario.id) return res.status(401).json({ msg: 'No autorizado' })

            //guardar la tarea
            tarea = await modeloTareas.findByIdAndRemove({ _id: req.params.id })
            res.json({ msg:"tarea eliminada" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "hubo un error" });
        }
    }
}