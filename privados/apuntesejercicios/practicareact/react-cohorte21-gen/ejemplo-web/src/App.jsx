import Clock from './components/Clock'
import Footer from './components/Footer'
import Formulario from './components/Formulario'
import Habilidades from './components/Habilidades'
import Hero from './components/Hero'
import NavBar from './components/NavBar'
import Users from './components/UsersList'

function App() {
  return (
    <>
    <NavBar />
    <Users />
    <Clock />
    <Hero nombre={"Alberto"}/>
    <Habilidades />
    <Formulario />
    <Footer />
    </>
  )
}

export default App
