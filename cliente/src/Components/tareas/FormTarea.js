import React,{useContext,useState,useEffect} from 'react'
import ProyectoContext from '../../Context/proyectos/ProyectoContext'
import TareasContext from '../../Context/Tareas/TareaContex'


const FormTarea = () => {

    const proyectoContext = useContext(ProyectoContext);
    const { proyecto } = proyectoContext;


    const tareasContext = useContext(TareasContext);
    const { 
        tareaSeleccionada,
        errorTarea,
        agregarTarea,
        validarTarea,
        obtenerTareas,
        editarTarea
     } = tareasContext;

    //state del formulario
    const [tarea, settarea] = useState({
        nombre:''
    })
    
    const { nombre } = tarea;
    
    //Cuando alguien de click en editar una tarea queremos que  el formulario se rellene con los
    //datos de dicha tarea
    useEffect(() => {
       if(tareaSeleccionada != null){
           settarea(tareaSeleccionada)
       }else
            settarea({
                nombre:''
            })
    }, [tareaSeleccionada])

    if(!proyecto) return null;

    //Leer los valores del formulario
    const hadleChange = (e) =>{
        settarea({
            ...tarea,
            [e.target.name]:e.target.value
        })
    }


    const onsubmit=e=>{
        e.preventDefault();

        //validar
        if(!nombre || nombre.trim() === '')
            return validarTarea();

        //revia si se esta editando o creando tarea
        if(tareaSeleccionada){
            //actualizamos la tarea correspondiente
            editarTarea(tarea);
        }else{
            //agregar la nueva tarea 
            tarea.proyecto = proyecto[0]._id;
            agregarTarea(tarea);
        }    
        //reiniciar form;
        settarea({
            nombre:''
        });
        obtenerTareas(proyecto[0]);
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onsubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea"
                        name="nombre"
                        onChange={hadleChange}
                        value={nombre}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? "Editar tarea" : "Agregar tarea"}
                    />
                </div>
            </form>
            {errorTarea 
            ?<p className="mensaje error">Falta el nombre de la tarea</p>
             : null}
        </div>
    )
}

export default FormTarea
