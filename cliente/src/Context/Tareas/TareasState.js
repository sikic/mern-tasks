import React, { useReducer } from 'react'
import TareasReducer from './TareasReducer'
import TareaContext from './TareaContex'
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREAS,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    EDITAR_TAREA

} from '../../types/index'
import clienteAxios from '../../config/axios'

const TareaState = props => {
    const initialState = {
        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null
    }

    const [state, dispatch] = useReducer(TareasReducer, initialState);

    const obtenerTareas = async (proyecto) => {

        try {
            const {_id} = proyecto;
            const resultado = await clienteAxios.get('/api/tareas',{ params : { proyecto:_id}});
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error)
        }
    }


    const agregarTarea = async (t) => {
        try {
            await clienteAxios.post('/api/tareas',t);
            dispatch({
                type: AGREGAR_TAREAS,
                payload: t
            })
        } catch (error) {
            console.log(error)
        }
    }

    const validarTarea = (t) => {
        dispatch({
            type: VALIDAR_TAREA,
        })
    }

    const eliminarTarea = async (t,p) => {
        
        try {
             await clienteAxios.delete(`/api/tareas/${t._id}`,{ params : { proyecto: p[0]._id}})
            dispatch({
                type: ELIMINAR_TAREA,
                payload: t
            })
        } catch (error) {
            console.log(error)

        }
    }

    const tareaActual = (t) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: t
        })
    }

    const editarTarea = async (t) => {

        try {
            const resultado = await clienteAxios.put(`/api/tareas/${t._id}`,t);            dispatch({
                type: EDITAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <TareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                tareaActual,
                editarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;