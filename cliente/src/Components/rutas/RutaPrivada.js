import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../Context/authentication/authContext'

const RutaPrivada = ({ component: Component, ...props }) => {

    const authContext = useContext(AuthContext);
    const { autenticado,usuarioAutenticado } = authContext;
    
    useEffect(() => {
        usuarioAutenticado();
        //eslint-disable-next-line
    }, []);

    
    return (
        <Route {...props} render={props => !autenticado 
            ? (<Redirect to="/" />)
            : ( <Component {...props} />)}

        />
    );
}

export default RutaPrivada;