const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

//api/proyectos
router.post('/',
    //comprobar si estamos logeados antes de dar acceso
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').notEmpty()
    ],
    proyectoController.crearProyecto
);

router.get('/',
    //comprobar si estamos logeados antes de dar acceso
    auth,
    proyectoController.obtenerProyectos
);

router.put('/:id',
    //comprobar si estamos logeados antes de dar acceso
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').notEmpty()
    ],
    proyectoController.actualizarProyecto
);

router.delete('/:id',
    //comprobar si estamos logeados antes de dar acceso
    auth,
    proyectoController.eliminarProyecto
);


module.exports = router;