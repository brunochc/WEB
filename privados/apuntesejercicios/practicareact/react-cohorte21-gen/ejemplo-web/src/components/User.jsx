
import {useState, useEffect} from 'react'

function User() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    // user = { "id": 1, "name": "Leanne Graham" }

    useEffect(()=>{
        //petición al recurso externo
         // http --> comunicación vía internet
         setLoading(true)
        fetch('https://jsonplaceholder.typicode.com/users/2')
        .then(response => response.json())
        .then(data => setUser(data))
        .catch((err)=> console.log("Hubo un error ", err))
        .finally(()=> setLoading(false))
         //{ }
    },[])

    if (loading) return <div className='container my-5 text-center'><p>Cargando el perfil...</p></div>
    if (!user) return <div className='container my-5 text-center'><p>Usuario no existe!</p></div>
  return (
     <div className='container my-5 text-center'>
       
        <h1>Datos del usuario</h1>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Web: {user.website}</p>
       
    </div>
  )
}

export default User