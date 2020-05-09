import React, { useReducer } from 'react'
import AuthReducer from './authReducer'
import AuthContext from './authContext'
import clienteAxios from '../../config/axios'
import {
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    OBTENER_USUARIO,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    CERRAR_SESION
} from '../../types/index'
import tokenAuth from '../../config/tokenAuth'
const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);


    //funciones

    const registrarUsuario = async datos => {
        try {
            console.log("prueba")
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            console.log(respuesta.data.token)
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.token
            })
            //obtener el usuario
            usuarioAutenticado();
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    //retorna el usuario autenticcado 
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            //funcion para enviar el token por headers
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    //funcion para iniciar sesion
    const iniciarSesion = async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            console.log(respuesta);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            });

            //obtener el usuario
            usuarioAutenticado();
        } catch (error) {
            console.log(error.response)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;

