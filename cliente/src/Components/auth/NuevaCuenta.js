import React, { useState, useContext,useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertaContext from '../../Context/alertas/AlertaContext'
import AuthContext from '../../Context/authentication/authContext'

const NuevaCuenta = (props) => {

    const alertaContext = useContext(AlertaContext);
    const { mostrarAlerta, alerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { registrarUsuario, mensaje,autenticado } = authContext;
    
    //en caso de que el usaurio se ha autenticado o registado o sea un registro duplicado
    
    useEffect(() => {
        //si se logea le redirigimos a proyectos
        if(autenticado)
            props.history.push('/proyectos')  

        //si hay algun error deberia saltar el mensaje
        if(mensaje)
            mostrarAlerta(mensaje.msg,mensaje.categoria)

    }, [autenticado,mensaje, props.history,mostrarAlerta])

    //state incio sesion

    const [credenciales, setcredenciales] = useState({
        email: '',
        password: '',
        nombre: '',
        passwordconfirm: ''
    });

    //extraer valores

    const { email, password, nombre, passwordconfirm } = credenciales;

    const iniciar = (e) => {
        setcredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
    }

    const crear = (e) => {
        e.preventDefault();

        //validar que no hay acampos vacios
        if (nombre.trim() === '' || email.trim() === '' || password.trim() === '' || passwordconfirm.trim() === '')
           return  mostrarAlerta("Todos los campos son obligatorios",'error')
        //password min de 6 digitos
        if(password.length < 6)
            return mostrarAlerta("El password debe de ser al menos 6 carácteres","error")
        //mirar que las contraseñas coincidan
        if(password !== passwordconfirm)
        return mostrarAlerta("Las paswords deben conicidir","error")

        registrarUsuario({
            nombre,
            email,
            password
        })
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
                <h1>Formulario</h1>

                <form
                    onSubmit={crear}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="nombre"
                            id="nombre"
                            value={nombre}
                            name="nombre"
                            placeholder="tu nombre"
                            onChange={iniciar}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">email</label>
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

                    <div className="campo-form">
                        <label htmlFor="passwordconfirm">Repita</label>
                        <input
                            type="password"
                            id="passwordconfirm"
                            name="passwordconfirm"
                            value={passwordconfirm}
                            placeholder="confirma tu password"
                            onChange={iniciar}
                        />
                    </div>

                    <div className="form-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarse"
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">Volver a iniciar sesión</Link>
            </div>
        </div>
    )
}

export default NuevaCuenta
