import React from "react";
import {useState, useEffect} from "react";


function UserList() {
    const [users, setUsers] = useState([]); // estado para guardar el usuario
    const [loading, setLoading] = useState(false); // estado para guardar el loading
    useEffect(() => {
        // peticion a la api
        setLoading(true);
        fetch("https://jsonplaceholder.typicode.com/users/")
            .then(response => response.json()) // convertir la respuesta a json
            .then(data =>  setUsers(data)) // guardar la data en el estado, el objeto que viene de la api
            .catch(error => console.log(error)) // capturar el error
            .finally(() => setLoading(false)); // finalmente, setea el loading en false
    }, []);

    if (loading) return <p>Loading...</p>;
    if (users == null ) return <p>No user</p>;
    
    return (
        <div>

            <h1>User List</h1>
            {
                users.map(user => (
                    <div key={user.id}>
                        <h2>{user.name}</h2>
                        <p>Id: {user.id}</p>
                        <p>Phone: {user.phone}</p>
                        <p>Website: {user.website}</p>
                        <p>Email: {user.email}</p>
                    </div>
                ))// fin del map, el map es un bucle que recorre el array de users
            }
        </div>
    );
}

export default UserList;
