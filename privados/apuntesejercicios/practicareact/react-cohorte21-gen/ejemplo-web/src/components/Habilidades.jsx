import HabilidadesCard from "./HabilidadesCard"

function Habilidades() {

    // acá se escribe la lógica de javascript

    return (
         <section className="container my-5">
        <h2 className="text-center mb-4">Mis Habilidades</h2>
        <div className="row">
            <HabilidadesCard titulo={"HTML"} descripcion={"Creación de estructuras web semánticas."} />
            <HabilidadesCard titulo={"CSS"} descripcion={"Diseños atractivos y responsivos."}/>
            <HabilidadesCard titulo={"JavaScript"} descripcion={"Interactividad y dinamismo en la web."}/>
        </div>
    </section>
    )
}

export default Habilidades