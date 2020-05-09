import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertaContext from '../../Context/alertas/AlertaContext'
import AuthContext from '../../Context/authentication/authContext'


const Login = (props) => {

    const alertaContext = useContext(AlertaContext);
    const { mostrarAlerta, alerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { iniciarSesion, mensaje, autenticado } = authContext;

    useEffect(() => {
        //si se logea le redirigimos a proyectos
        if (autenticado)
            props.history.push('/proyectos')

        //si hay algun error deberia saltar el mensaje
        if (mensaje)
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        //eslint-disable-next-line
    }, [autenticado, mensaje, props.history])

    //state incio sesion
    const [credenciales, setcredenciales] = useState({
        email: '',
        password: ''
    });

    //extraer valores

    const { email, password } = credenciales;

    const iniciar = (e) => {
        setcredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
    }

    const logearse = (e) => {
        e.preventDefault();

        //validar que no hay acampos vacios
        if (email.trim() === '' || password.trim() === '')
            mostrarAlerta('Todos los campos son obligatorios', 'error')

        iniciarSesion({ email, password });
    }

    return (
        <div className="form-usuario">
            {alerta ?
                (
                    <div className={`alerta-${alerta.categoria}`}>
                        {alerta.msg}
                    </div>
                )
                : null
            }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar sesión</h1>

                <form
                    onSubmit={logearse}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            name="email"
                            placeholder="tu email"
                            onChange={iniciar}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="tu password"
                            onChange={iniciar}
                        />
                    </div>

                    <div className="form-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesion"
                        />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">Registrarse</Link>
            </div>
        </div>
    )
}

export default Login
