import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ProyectoContext from '../../Context/proyectos/ProyectoContext'
import AlertaContext from '../../Context/alertas/AlertaContext'


const Listado = () => {

    //proyecto
    const proyectoContext = useContext(ProyectoContext);
    const { mensaje, Proyectos, obtenerProyectos } = proyectoContext;

    //alerta
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    useEffect(() => {
        //si hay un error
        if (mensaje)
            mostrarAlerta(mensaje.msg, mensaje.categoria)

        obtenerProyectos();
        //limpiar advertencia
        //eslint-disable-next-line
    }, [mensaje]);

    if (Proyectos.length === 0)
        return (<p>Actualmente no tienes proyectos, crea alguno para empezar</p>);

    return (
        <ul className="listado-proyectos">
            { alerta
                ?
                (<div className = {`alerta-${alerta.categoria}`}>
                    {alerta.msg}
                </div>)
                : null   
        }
            <TransitionGroup>
                {Proyectos.map((p) => {
                    return (
                        <CSSTransition
                            key={p._id}
                            timeout={200}
                            classNames="proyecto"
                        >
                            <Proyecto

                                proyecto={p}
                            />
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        </ul>
    )
}

export default Listado
