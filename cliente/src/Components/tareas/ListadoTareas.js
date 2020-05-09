import React,{Fragment,useContext} from 'react'
import Tarea from './Tarea'
import ProyectoContext from '../../Context/proyectos/ProyectoContext'
import TareaContext from '../../Context/Tareas/TareaContex'
import {CSSTransition,TransitionGroup} from 'react-transition-group'


const ListadoTareas = () => {


    const proyectoContext = useContext(ProyectoContext);
    const { proyecto,eliminarProyecto } = proyectoContext;

    const tareasContext = useContext(TareaContext);
    const { tareasProyecto } = tareasContext ;
    
    
    //si no hay proyecto seleccionado
    if(!proyecto) return( <h1>Selecciona un proyecto</h1>)
    
   
    const [proyectoActual] = proyecto;
    
    return (
    <Fragment>
        <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {tareasProyecto.length === 0
                    ?(<li className="tarea"><p>No hay tareas</p></li>)
                    :<TransitionGroup>
                        {tareasProyecto.map((t)=>(
                            <CSSTransition
                                key = {t.id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea
                                key = {t.id}
                                tarea={t}
                            />
                            </CSSTransition>
                ))}
                </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => eliminarProyecto(proyectoActual)}
            >
                Eliminar Proyecto &times;
            </button>
        
    </Fragment>    
    )
}

export default ListadoTareas
