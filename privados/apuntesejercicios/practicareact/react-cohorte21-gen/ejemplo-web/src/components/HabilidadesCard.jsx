

function HabilidadesCard({titulo, descripcion}) {

    return (
         <div class="col-md-4">
                <div class="card text-center p-3">
                    <h3>{titulo}</h3>
                    <p>{descripcion}</p>
                </div>
        </div>
    )
}

export default HabilidadesCard