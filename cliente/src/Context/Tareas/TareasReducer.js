
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREAS,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    EDITAR_TAREA
} from '../../types/index'


export default (state, action) => {
    switch (action.type) {
        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasProyecto: action.payload
            }

        case AGREGAR_TAREAS:
            return {
                ...state,
                tareasProyecto: [...state.tareasProyecto, action.payload],
                errorTarea: false

            }

        case VALIDAR_TAREA:
            return {
                ...state,
                errorTarea: true
            }

        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.filter(t => t._id !== action.payload._id),
            }

        case TAREA_ACTUAL:
            return {
                ...state,
                tareaSeleccionada: action.payload
            }
        case EDITAR_TAREA:
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.map(t => t._id === action.payload._id ? action.payload :t),
                tareaSeleccionada:null
            }
        default:
            return state;
    }
}