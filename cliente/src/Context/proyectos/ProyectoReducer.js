import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTOS,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR

} from '../../types'


export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            };
        case OBTENER_PROYECTOS:
            return {
                ...state,
                Proyectos: action.payload
            };
        case AGREGAR_PROYECTOS:
            return {
                ...state,
                Proyectos: [...state.Proyectos, action.payload],
                formulario: false,
                errorFormulario: false
            };

        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorFormulario: true
            }


        case PROYECTO_ACTUAL:

            return {
                ...state,
                proyecto: state.Proyectos.filter(p => p._id === action.payload._id)
            }

        case ELIMINAR_PROYECTO:
            return {
                ...state,
                Proyectos: state.Proyectos.filter(p => p._id !== action.payload._id),
                proyecto: null
            }

        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        default:
            return state;
    }
}