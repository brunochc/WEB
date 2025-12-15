

function NavBar(){

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Perfil</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="menu">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item"><a className="nav-link" href="#">Inicio</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Sobre mí</a></li>
                    <li className="nav-item"><a className="nav-link" href="#form">Contacto</a></li>
                </ul>
            </div>
        </div>
    </nav>
    )
}

export default NavBar