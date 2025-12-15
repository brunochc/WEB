import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PostsList from './PostsList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header className="bg-primary text-white py-3">
        <div className="container">
          <h1 className="h3 m-0">Lista de Publicaciones</h1>
        </div>
      </header>
      <main className="container my-4">
        <PostsList />
      </main>
    </>
  )
}

export default App
