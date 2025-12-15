import { useState } from 'react'
import './App.css'
import UserList from './components/userList'
import User from './components/user'

function App() {

  return (
    <>
      <User /> 
      <UserList />
    </>
  )
}

export default App
