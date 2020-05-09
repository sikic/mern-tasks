import React, { useContext, useEffect } from 'react'
import './Barra.css'
import AuthContext from '../../Context/authentication/authContext'

const Barra = () => {

    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        //eslint-disable-next-line
    }, []);

    return (
        <header className="app-header">
            {usuario
                ?
                <p className="nombre-usuario mover">Hola <span>{usuario.nombre}</span></p>
                : null}

            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion blanco"
                    onClick={() => cerrarSesion()}
                >
                    Cerrar Sesion
               </button>
            </nav>
        </header>
    )
}

export default Barra
