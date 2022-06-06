import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { movieRoutes } from 'src/routes/routes'
import './Movie.scss'
function Movie() {
  return (
    <div>
      <Routes>
        {movieRoutes.map((route, index) => {
          return <Route key={index} path={route.path} element={route.element} />
        })}
      </Routes>
    </div>
  )
}

export default Movie
