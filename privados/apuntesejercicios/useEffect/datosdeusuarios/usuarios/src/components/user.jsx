import React from "react";
import {useState, useEffect} from "react";


function User() {
    const [user, setUser] = useState({}); // estado para guardar el usuario
    const [loading, setLoading] = useState(false); // estado para guardar el loading
    useEffect(() => {
        // peticion a la api
        setLoading(true);
        fetch("https://jsonplaceholder.typicode.com/users/1")
            .then(response => response.json()) // convertir la respuesta a json
            .then(data => setUser(data)) // guardar la data en el estado, el objeto que viene de la api
            .catch(error => console.log(error)) // capturar el error
            .finally(() => setLoading(false)); // finalmente, setea el loading en false
    }, []);

    if (loading) return <p>Loading...</p>;
    if (user == null ) return <p>No user</p>;
    
    return (
        <div>

            <h1>User</h1>
            <h2>{user.name}</h2>
            <p>Id: {user.id}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>
            <p>Email: {user.email}</p>
            
            {/* <p>Address: {user.address}</p> */}
            <p>Username: {user.username}</p>
        </div>
    );
}

export default User;
