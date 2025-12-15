


function Formulario() {
  return (
      <section class="container my-5" id="form">
        <h2 class="text-center mb-4">Contáctame</h2>
        <form class="w-50 mx-auto">
            <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input type="text" class="form-control" placeholder="Escribe tu nombre" />
            </div>
            <div class="mb-3">
                <label class="form-label">Correo</label>
                <input type="email" class="form-control" placeholder="nombre@correo.com" />
            </div>
            <div class="mb-3">
                <label class="form-label">Mensaje</label>
                <textarea class="form-control" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-success w-100">Enviar</button>
        </form>
    </section>
  )
}

export default Formulario