import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from 'src/components/Header/Header.jsx'
import routesPath from 'src/routes/routes'

import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from './components/Footer/Footer'
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {routesPath.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
