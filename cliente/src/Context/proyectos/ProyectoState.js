import React, { useReducer } from 'react'

import ProyectoContext from './ProyectoContext'
import ProyectoReducer from './ProyectoReducer'
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTOS,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types'
import clienteAxios from '../../config/axios'


const ProyectoState = props => {

    const initialState = {
        Proyectos: [],
        formulario: false,
        errorFormulario: false,
        proyecto: null,
        mensaje: null
    }

    //dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(ProyectoReducer, initialState)

    //serie de funciones para CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //Obtener los proyectos
    const obtenerProyectos = async () => {

        try {
            const proyectos = await clienteAxios.get('/api/proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: proyectos.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg:'Hubo un error',
                categoria: 'error-proyecto'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    //Agregar los proyectos
    const agregarProyecto = async (p) => {

        try {
            const respuesta = await clienteAxios.post('/api/proyectos', p);
            dispatch({
                type: AGREGAR_PROYECTOS,
                payload: respuesta.data
            })
        } catch (error) {
            const alerta = {
                msg:'Hubo un error',
                categoria: 'error-proyecto'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    const mostrarError = () => {

        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }


    const proyectoActual = (p) => {

        dispatch({
            type: PROYECTO_ACTUAL,
            payload: p
        })
    }

    const eliminarProyecto = async (p) => {
        try {
            await clienteAxios.delete(`/api/proyectos/${p._id}`)
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: p
            })
        } catch (error) {
            const alerta = {
                msg:'Hubo un error',
                categoria: 'error-proyecto'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }
    return (
        <ProyectoContext.Provider
            value={{
                proyecto: state.proyecto,
                formulario: state.formulario,
                Proyectos: state.Proyectos,
                mensaje: state.mensaje,
                errorFormulario: state.errorFormulario,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoState;