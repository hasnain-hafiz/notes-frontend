import { useContext, useState } from 'react'
import Authentication from '../pages/Authentication'
import { AuthContext, AuthProvider } from '../context/AuthContext'
import Notes from '../pages/Notes';
import "./App.css"




function App() { 
  const { token } = useContext(AuthContext);


  return (
    <div className="app-container">
      {token ? <Notes /> : <Authentication />}
    </div>
  )
}

export default App
