


import {useState, useEffect} from 'react'

function Users() {
    const [users, setUsers] = useState(null) // []
    const [loading, setLoading] = useState(false)

    // user = { "id": 1, "name": "Leanne Graham" }

    useEffect(()=>{
        //petición al recurso externo
         // http --> comunicación vía internet
         setLoading(true)
        fetch('https://jsonplaceholder.typicode.com/users/')
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch((err)=> console.log("Hubo un error ", err))
        .finally(()=> setLoading(false))
         
    },[])

    if (loading) return <div className='container my-5 text-center'><p>Cargando usuarios...</p></div>
    
  return (
     <div className='container my-5 text-center'>
        <h1>Lista de usuarios</h1>
        {
            users && users.map((user) =>(
        <>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Web: {user.website}</p>
        </>
            ))
        }
    </div>
  )
}

export default Users