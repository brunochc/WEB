
import { useEffect, useState } from "react"



function Clock() {

    const [time, setTime] = useState(new Date()) // estado inicial cuando se carga el componente

    useEffect(()=>{
        console.log("Saludos desde el useEffect")
        const intervaloActual = setInterval(()=>{
            setTime(new Date())
        },1000)
        
        return () => clearInterval(intervaloActual)

    },[])
     // Caso 1: Cuando no se indica las dependecias useEffect(()=>{}), el useEffect se ejecuta al cargar el componente y cada vez que este se vuelva a renderizar
     // Caso 2: [] --> le indica a react que el efecto se ejecute sólo 1 vez al cargar el componente!
     // Caso 3: [time] --> se le indica cuando debe ejecutar (al cambiar algún estado)

return(
    <div className="container my-5 text-center">
        <h2>Reloj en tiempo Real</h2>
        <p>{time.toLocaleTimeString()}</p>
    </div>
)


}


export default Clock