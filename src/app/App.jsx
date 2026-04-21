import { useContext, useState } from 'react'
import Authentication from '../pages/Authentication'
import { AuthContext, AuthProvider } from '../context/AuthContext'
import Notes from '../pages/Notes';
import "./App.css"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() { 
  const { token } = useContext(AuthContext);


  return (
    <div className="app-container">
      <ToastContainer />
      {token ? <Notes /> : <Authentication />}
    </div>
  )
}

export default App
