import { useState } from "react"
import Avatar from "./Avartar"


function Hero({nombre}) {
    // acá escribimos código de js o hooks de react

   //    estado, F -> C el Est 
    const [titulo, setTitulo] = useState(nombre) // un estado local

    

    return (
    <section class="container my-5 text-center">
        <div class="row align-items-center">
          <Avatar />
            <div class="col-md-8">
                <h1>{titulo}</h1>
                <p class="lead">Desarrollador Web</p>
                <button
                class="btn btn-primary"
                onClick={() => setTitulo("Luis")}
                >Cambiar Título</button>
            </div>
        </div>
    </section>
    )
}

export default Hero