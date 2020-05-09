import React,{useContext} from 'react'
import ProyectoContext from '../../Context/proyectos/ProyectoContext'
import TareaContext from '../../Context/Tareas/TareaContex'

const Proyecto = ({proyecto}) => {

    const proyectoContext = useContext(ProyectoContext);
    const { proyectoActual} = proyectoContext;

    const tareaContext = useContext(TareaContext);
    const { obtenerTareas} = tareaContext;

    //Funcion para cuando le das click a un proyecto
    const agregar =(p)=>{
        proyectoActual(p);
        obtenerTareas(p);
            
    }

    return (
       <li>
           <button
                type="button"
                className="btn btn-blank"
                onClick={() => agregar(proyecto) }
            >
                {proyecto.nombre}
           </button>
       </li>
    )
}

export default Proyecto
