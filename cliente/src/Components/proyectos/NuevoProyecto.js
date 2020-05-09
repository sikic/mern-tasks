import React,{Fragment,useState,useContext} from 'react'
import ProyectoContext from '../../Context/proyectos/ProyectoContext'
const NuevoProyecto = () => {

    //state para proyecto
    const [proyectos, setproyecto] = useState({
        nombre:''
    });
    
    

    //obtener state del formulario
    const proyectosContext = useContext(ProyectoContext);
    const { errorFormulario ,formulario ,mostrarFormulario,agregarProyecto,mostrarError} = proyectosContext;

    const onchange=(e)=>{
        setproyecto({
            ...proyectos,
            [e.target.name]:e.target.value
        }) 
    }
    
    const {nombre} = proyectos;
    

    const hadleonsubmit=(e)=>{
        e.preventDefault();

        //validar el nombre
        if(nombre.trim() === '')
           return mostrarError();

        //agregar al state 
        setproyecto(nombre);
        agregarProyecto(proyectos);
        //reiniciar el form
        setproyecto({
            nombre:''
        })
        
    }

    const mostrar=(f)=>{
        if(f)
            return( 
            <form
                className="formulario-nuevo-proyecto"
                onSubmit={hadleonsubmit}
                >
                <input
                    type="text"
                    className="input-text"
                    placeholder="Nombre Proyecto"
                    name="nombre"
                    value={nombre}
                    onChange={onchange}
                />

                <input
                    type="submit"
                    className="btn btn-primario btn-block"
                    value="Agregar proyecto"
                />
                
            </form>);
            else
                return null;
    }
    return (
        <Fragment>
            <button 
            type="button"
            className="btn btn-block btn-primario"
            onClick={()=> mostrarFormulario()}
            >
                Nuevo Proyecto
            </button>
    
            {
                mostrar(formulario)
            }
            
            {errorFormulario 
            ?
                <p className="mensaje error"> El nombre es obligatorio</p>
            :
            null 
            }
        </Fragment>
    )
}

export default NuevoProyecto
