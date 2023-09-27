import { } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'

import RoutesConfig from './app.routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const routes = useRoutes(RoutesConfig)
  return (
    <>
      {routes}
      <ToastContainer />
    </>
  )
}

export default App
