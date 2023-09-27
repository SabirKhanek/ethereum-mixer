import { } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'

import RoutesConfig from './app.routes'

function App() {
  const routes = useRoutes(RoutesConfig)
  return (
    <>
      {routes}
    </>
  )
}

export default App
