import { useEffect, useState } from "react"
import React from "react"


export default function PostsList() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        setLoading(true)
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])



    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center py-5">
                <div className="spinner-border text-primary me-2" role="status" aria-hidden="true"></div>
                <span className="fw-medium">Cargando publicaciones...</span>
            </div>
        )
    }
    if (posts.length === 0) {
        return (
            <div className="alert alert-warning" role="alert">
                No se encontraron publicaciones.
            </div>
        )
    }
    
    return (
        <div className="row g-4">
            {posts.slice(0, 10).map((post) => (
                <div className="col-12 col-md-6 col-lg-4" key={post.id}>
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title text-capitalize">{post.title}</h5>
                            <p className="card-text">{post.body}</p>
                        </div>
                        <div className="card-footer bg-transparent border-0 pt-0">
                            <a href="#" className="btn btn-sm btn-outline-primary">Leer más</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}