import { useEffect, useState } from "react";

function Clock() {
    const [time, setTime] = useState(new Date());
    // useEffect usa dos parametros, el primero es una funcion y el segundo es un array, el array es opcional, en el ejemplo, setTime es la funcion que se ejecuta cada vez que el estado cambia, y setInterval es la funcion que se ejecuta cada vez que el estado cambia, y [] es el array de dependencias, que en este caso es un array vacio, lo que significa que la funcion se ejecuta solo una vez, cuando el componente se monta
    useEffect(() => {
        console.log("useEffect");
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, [time]); // 1. el array vacio significa que la funcion se ejecuta solo una vez, cuando el componente se monta, si no se pone el array, la funcion se ejecuta cada vez que el estado cambia provocando un bucle infinito ,usando memoria innecesaria causando problemas de rendimiento.

    // 2. el array con time [time] significa que la funcion se ejecuta cada vez que el valor de time cambia, es decir, cada vez que el reloj se actualiza.
    
    return (
        <div>
            <h1>Reloj</h1>
            <p>{time.toLocaleTimeString()}</p>

        </div>
    )
}

export default Clock
