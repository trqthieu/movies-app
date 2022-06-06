import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { tvRoutes } from 'src/routes/routes'

function TV() {
  return (
    <div>
      <h1>TV</h1>
      <Routes>
        {tvRoutes.map((route, index) => {
          return <Route key={index} path={route.path} element={route.element} />
        })}
      </Routes>
    </div>
  )
}

export default TV
