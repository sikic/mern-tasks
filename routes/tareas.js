const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

//obtiene las tareas
router.get('/', auth, tareasController.obtenertareas);

//crea las tareas
router.post('/',
    [
        check('nombre', 'El nombre de la tarea es obligatorio').notEmpty(),
        check('proyecto', 'El nombre del proyecto es obligatorio').notEmpty()
    ]
    , auth, tareasController.crearTarea);

//modifica las tareas
router.put('/:id',
    [
        check('nombre', 'El nombre de la tarea es obligatorio').notEmpty(),
        check('proyecto', 'El nombre del proyecto es obligatorio').notEmpty()
    ]
    , auth, tareasController.actualizarTarea);

router.delete('/:id'
    , auth, tareasController.eliminarTarea);

module.exports = router;