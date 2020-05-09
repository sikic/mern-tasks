import React,{useContext} from 'react'
import ProyectoContext from '../../Context/proyectos/ProyectoContext'
import TareasContext from '../../Context/Tareas/TareaContex'

const Tarea = ({tarea}) => {

    
    const proyectoContext = useContext(ProyectoContext);
    const { proyecto } = proyectoContext;

    const tareasContext = useContext(TareasContext);
    const { eliminarTarea,obtenerTareas,editarTarea,tareaActual } = tareasContext;

    return (

        <li className="tarea sombra">
            <p>
                {tarea.nombre}
            </p>

            <div className="estado">
                {tarea.estado 
                ?
                (
                    <button
                        type="button"
                        className="completo"
                        onClick={()=>{
                            if(tarea.estado)
                                tarea.estado=false;
                            else
                                tarea.estado = true;

                                editarTarea(tarea)}}
                    >
                        Completo
                    </button>
                )
                :  ( 
                    <button
                    type="button"
                    className="incompleto"
                    onClick={()=>{
                        if(tarea.estado)
                            tarea.estado=false;
                        else
                            tarea.estado = true;
                        editarTarea(tarea)}}
                >
                    Incompleto
                </button>
                )
            }
            </div>

            <div className="acciones">
                <button
                  type="button"
                  className="btn btn-primario"  
                  onClick={() =>{
                      tareaActual(tarea)
                  }}          
                >
                    Editar
                </button>

                <button
                     type="button"
                     className="btn btn-secundario"
                     onClick={()=> {
                         eliminarTarea(tarea,proyecto)
                         obtenerTareas(proyecto[0])
                        }}            
                   >
                >
                    Eliminar
                </button>
            </div>
        </li>
    )
}

export default Tarea
